import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    const currentUser = this.auth.getCurrentUser();

    // Debugging info to help trace 403/401 issues
    console.log('JWT Interceptor - request url:', request.url);
    console.log('JWT Interceptor - token present:', !!token, 'currentUser:', currentUser);

    if (token) {
      // ensure token doesn't already include the Bearer prefix
      let raw = token;
      if (raw.startsWith('Bearer ')) raw = raw.substring(7);
      // always attach header using Bearer scheme (backend expects 'Bearer ')
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${raw}`,
        },
      });
      console.log('Authorization header set on request (token length):', raw.length);

      // decode token for debugging to inspect roles/claims
      try {
        const parts = raw.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          console.log('JWT payload:', payload);
        }
      } catch (e) {
        console.warn('Failed to decode JWT payload', e);
      }
    }

    return next.handle(request).pipe(
      catchError((err) => {
        // More verbose logging for debugging
        console.error('HTTP error intercepted:', err?.status, err?.statusText, err?.url, err?.error);
        if (err.status === 401) {
          // try to refresh token and retry the request once
          console.warn('Unauthorized (401): attempting token refresh');
          return this.auth.refreshToken().pipe(
            switchMap((resp) => {
              const newToken = localStorage.getItem('token');
              if (!newToken) {
                this.auth.logout();
                this.router.navigate(['/login']);
                return throwError(() => err);
              }
              const raw = newToken.startsWith('Bearer ') ? newToken.substring(7) : newToken;
              const cloned = request.clone({ setHeaders: { Authorization: `Bearer ${raw}` } });
              return next.handle(cloned);
            })
          );
        } else if (err.status === 403) {
          // Forbidden: token is valid but user lacks permission
          console.warn('Forbidden (403): the token is valid but the user lacks required roles/permissions');
          // Do not logout automatically on 403; let user stay logged in and inspect roles
        }
        return throwError(() => err);
      })
    );
  }
}

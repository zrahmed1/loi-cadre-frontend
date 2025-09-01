import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      // redirect to login with return url
      this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const requiredRoles = route.data && route.data['roles'] as string[] | undefined;
    if (requiredRoles && requiredRoles.length > 0) {
      const ok = this.authService.hasAnyRole(requiredRoles);
      if (!ok) {
        this.snackBar.open('Access denied: insufficient permissions', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}
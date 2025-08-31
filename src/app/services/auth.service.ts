import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Utilisateur } from "../models/utilisateur";
import { environment } from "../../environments/environment";

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  type?: string;
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  etablissementId?: number;
  etablissementNom?: string;
  departementId?: number;
  departementNom?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem("currentUser");
    if (saved) this.currentUserSubject.next(JSON.parse(saved));
  }

  // Login using backend /api/auth/login (see BACKEND doc). Stores token and current user info.
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((resp) => {
        if (resp && resp.token) {
          localStorage.setItem("token", resp.token);
          if (resp.refreshToken) {
            localStorage.setItem('refreshToken', resp.refreshToken);
          }
          // store current user info (may include refreshToken)
          localStorage.setItem("currentUser", JSON.stringify(resp));
          this.currentUserSubject.next(resp);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  getRefreshToken(): string | null {
    const saved = this.getCurrentUser();
    if (saved && saved.refreshToken) return saved.refreshToken;
    return localStorage.getItem('refreshToken');
  }

  // Refresh access token using refresh token endpoint
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token available'));
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((resp) => {
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          if (resp.refreshToken) {
            localStorage.setItem('refreshToken', resp.refreshToken);
          }
          // merge existing currentUser with new response fields
          const existing = this.getCurrentUser() || ({} as any);
          const merged = { ...existing, ...resp } as AuthResponse;
          localStorage.setItem('currentUser', JSON.stringify(merged));
          this.currentUserSubject.next(merged);
        }
      })
    );
  }

  // helper: get JWT payload by decoding token (no external dependency)
  private decodeToken(): any | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(payload)));
    } catch (e) {
      return null;
    }
  }

  // returns role string from token or current user
  getRole(): string | null {
    const user = this.getCurrentUser();
    if (user && user.role) return user.role;
    const payload = this.decodeToken();
    if (!payload) return null;
    // common claim names: role, roles, authorities
    if (payload.role) return payload.role;
    if (payload.roles && Array.isArray(payload.roles)) return payload.roles[0];
    if (payload.authorities && Array.isArray(payload.authorities)) return payload.authorities[0];
    return null;
  }

  // return list of roles from token or current user
  getRoles(): string[] {
    const user = this.getCurrentUser();
    if (user && user.role) return [user.role];
    const payload = this.decodeToken();
    if (!payload) return [];
    if (payload.roles && Array.isArray(payload.roles)) return payload.roles;
    if (payload.authorities && Array.isArray(payload.authorities)) return payload.authorities;
    if (payload.role && typeof payload.role === 'string') return [payload.role];
    return [];
  }

  hasRole(roles: string[] | string): boolean {
    const rolesList = this.getRoles();
    if (!rolesList || rolesList.length === 0) return false;
    if (Array.isArray(roles)) return roles.some(r => rolesList.includes(r));
    return rolesList.includes(roles as string);
  }

  hasAnyRole(roles: string[]): boolean {
    return this.hasRole(roles);
  }
}

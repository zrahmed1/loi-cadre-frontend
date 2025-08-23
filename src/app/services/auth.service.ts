import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Utilisateur } from "../models/utilisateur";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(
    email: string,
    motDePasse: string
  ): Observable<{ token: string; user: Utilisateur }> {
    return this.http
      .post<{ token: string; user: Utilisateur }>(`${this.apiUrl}/login`, {
        email,
        motDePasse,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem("token", response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getCurrentUser(): Utilisateur | null {
    return this.currentUserSubject.value;
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Utilisateur, Role } from "../models/utilisateur";

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  getById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  getByEtablissement(etablissementId: number): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(
      `${this.apiUrl}/etablissement/${etablissementId}`
    );
  }

  getByDepartement(departementId: number): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(
      `${this.apiUrl}/departement/${departementId}`
    );
  }

  getByRole(role: Role): Observable<Utilisateur[]> {
    const params = new HttpParams().set("role", role);
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/role`, { params });
  }

  getByEmail(email: string): Observable<Utilisateur> {
    const params = new HttpParams().set("email", email);
    return this.http.get<Utilisateur>(`${this.apiUrl}/email`, { params });
  }

  create(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, utilisateur);
  }

  update(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, utilisateur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateLastLogin(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/login`, {});
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }
}

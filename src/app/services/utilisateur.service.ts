import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Utilisateur, UtilisateurDto, Role, SaveUserRequest, UtilisateurRequest } from "../models/utilisateur";

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>(`${this.apiUrl}/${id}`);
  }

  getByEtablissement(etablissementId: number): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(
      `${this.apiUrl}/etablissement/${etablissementId}`
    );
  }

  getByDepartement(departementId: number): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(
      `${this.apiUrl}/departement/${departementId}`
    );
  }

  getByRole(role: Role): Observable<UtilisateurDto[]> {
    const params = new HttpParams().set("role", role);
    return this.http.get<UtilisateurDto[]>(`${this.apiUrl}/role`, { params });
  }

  getByEmail(email: string): Observable<Utilisateur> {
    const params = new HttpParams().set("email", email);
    return this.http.get<Utilisateur>(`${this.apiUrl}/email`, { params });
  }

  create(request: SaveUserRequest): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(this.apiUrl, request);
  }

  update(id: number, request: UtilisateurRequest): Observable<UtilisateurDto> {
    return this.http.put<UtilisateurDto>(`${this.apiUrl}/${id}`, request);
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

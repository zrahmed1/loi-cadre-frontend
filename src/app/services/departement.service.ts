import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Departement, DepartementDto, SaveDepartementRequest, DepartementRequest } from "../models/departement";

@Injectable({
  providedIn: "root",
})
export class DepartementService {
  private apiUrl = `${environment.apiUrl}/departements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DepartementDto[]> {
    return this.http.get<DepartementDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<DepartementDto> {
    return this.http.get<DepartementDto>(`${this.apiUrl}/${id}`);
  }

  getByResponsable(responsableId: number): Observable<DepartementDto[]> {
    return this.http.get<DepartementDto[]>(
      `${this.apiUrl}/responsable/${responsableId}`
    );
  }

  getByEtablissement(etablissementId: number): Observable<DepartementDto[]> {
    return this.http.get<DepartementDto[]>(
      `${this.apiUrl}/etablissement/${etablissementId}`
    );
  }

  create(request: SaveDepartementRequest): Observable<DepartementDto> {
    return this.http.post<DepartementDto>(this.apiUrl, request);
  }

  update(id: number, request: DepartementRequest): Observable<DepartementDto> {
    return this.http.put<DepartementDto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

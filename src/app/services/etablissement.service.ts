import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Etablissement, EtablissementDto, SaveEtablissementRequest, EtablissementRequest } from "../models/etablissement";

@Injectable({
  providedIn: "root",
})
export class EtablissementService {
  private apiUrl = `${environment.apiUrl}/etablissements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EtablissementDto[]> {
    return this.http.get<EtablissementDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<EtablissementDto> {
    return this.http.get<EtablissementDto>(`${this.apiUrl}/${id}`);
  }

  getByCode(code: string): Observable<EtablissementDto> {
    return this.http.get<EtablissementDto>(`${this.apiUrl}/code/${code}`);
  }

  getByResponsable(responsableId: number): Observable<EtablissementDto[]> {
    return this.http.get<EtablissementDto[]>(
      `${this.apiUrl}/responsable/${responsableId}`
    );
  }

  create(request: SaveEtablissementRequest): Observable<EtablissementDto> {
    return this.http.post<EtablissementDto>(this.apiUrl, request);
  }

  update(id: number, request: EtablissementRequest): Observable<EtablissementDto> {
    return this.http.put<EtablissementDto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

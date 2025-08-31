import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { LoiCadre, LoiCadreDto, StatutLoiCadre, LoiCadreRequest } from "../models/loi-cadre";
import { MouvementRequest } from "../models/mouvement";
import { PosteRequest } from "../models/poste-budgetaire";

@Injectable({
  providedIn: "root",
})
export class LoiCadreService {
  private apiUrl = `${environment.apiUrl}/lois-cadres`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LoiCadreDto[]> {
    return this.http.get<LoiCadreDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<LoiCadreDto> {
    return this.http.get<LoiCadreDto>(`${this.apiUrl}/${id}`);
  }

  getByAnnee(annee: number): Observable<LoiCadreDto[]> {
    return this.http.get<LoiCadreDto[]>(`${this.apiUrl}/annee/${annee}`);
  }

  getByStatut(statut: StatutLoiCadre): Observable<LoiCadreDto[]> {
    const params = new HttpParams().set("statut", statut);
    return this.http.get<LoiCadreDto[]>(`${this.apiUrl}/statut`, { params });
  }

  create(request: LoiCadreRequest): Observable<LoiCadreDto> {
    return this.http.post<LoiCadreDto>(this.apiUrl, request);
  }

  update(id: number, request: LoiCadreRequest): Observable<LoiCadreDto> {
    return this.http.put<LoiCadreDto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  valider(id: number): Observable<LoiCadreDto> {
    return this.http.put<LoiCadreDto>(`${this.apiUrl}/${id}/valider`, {});
  }

  changerStatut(id: number, statut: StatutLoiCadre): Observable<LoiCadreDto> {
    const params = new HttpParams().set("statut", statut);
    return this.http.put<LoiCadreDto>(
      `${this.apiUrl}/${id}/statut`,
      {},
      { params }
    );
  }

  addMouvement(id: number, request: MouvementRequest): Observable<LoiCadreDto> {
    return this.http.post<LoiCadreDto>(
      `${this.apiUrl}/${id}/mouvements`,
      request
    );
  }

  addPoste(id: number, request: PosteRequest): Observable<LoiCadreDto> {
    return this.http.post<LoiCadreDto>(`${this.apiUrl}/${id}/postes`, request);
  }

  exportExcel(loiCadreId: number): Observable<Blob> {
    return this.http.get<Blob>(
      `${environment.apiUrl}/loi-cadre/export/excel/${loiCadreId}`,
      { responseType: "blob" as "json" }
    );
  }
}

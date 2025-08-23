import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { LoiCadre } from "../models/loi-cadre";
import { Mouvement } from "../models/mouvement";
import { PosteBudgetaire } from "../models/poste-budgetaire";
import { StatutLoiCadre } from "../models/loi-cadre";

@Injectable({
  providedIn: "root",
})
export class LoiCadreService {
  private apiUrl = `${environment.apiUrl}/lois-cadres`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LoiCadre[]> {
    return this.http.get<LoiCadre[]>(this.apiUrl);
  }

  getById(id: number): Observable<LoiCadre> {
    return this.http.get<LoiCadre>(`${this.apiUrl}/${id}`);
  }

  getByAnnee(annee: number): Observable<LoiCadre[]> {
    return this.http.get<LoiCadre[]>(`${this.apiUrl}/annee/${annee}`);
  }

  getByStatut(statut: StatutLoiCadre): Observable<LoiCadre[]> {
    const params = new HttpParams().set("statut", statut);
    return this.http.get<LoiCadre[]>(`${this.apiUrl}/statut`, { params });
  }

  create(loi: LoiCadre): Observable<LoiCadre> {
    return this.http.post<LoiCadre>(this.apiUrl, loi);
  }

  update(id: number, loi: LoiCadre): Observable<LoiCadre> {
    return this.http.put<LoiCadre>(`${this.apiUrl}/${id}`, loi);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  valider(id: number): Observable<LoiCadre> {
    return this.http.put<LoiCadre>(`${this.apiUrl}/${id}/valider`, {});
  }

  changerStatut(id: number, statut: StatutLoiCadre): Observable<LoiCadre> {
    const params = new HttpParams().set("statut", statut);
    return this.http.put<LoiCadre>(
      `${this.apiUrl}/${id}/statut`,
      {},
      { params }
    );
  }

  addMouvement(id: number, mouvement: Mouvement): Observable<LoiCadre> {
    return this.http.post<LoiCadre>(
      `${this.apiUrl}/${id}/mouvements`,
      mouvement
    );
  }

  addPoste(id: number, poste: PosteBudgetaire): Observable<LoiCadre> {
    return this.http.post<LoiCadre>(`${this.apiUrl}/${id}/postes`, poste);
  }

  exportExcel(loiCadreId: number): Observable<Blob> {
    return this.http.get<Blob>(
      `${environment.apiUrl}/loi-cadre/export/excel/${loiCadreId}`,
      { responseType: "blob" as "json" }
    );
  }
}

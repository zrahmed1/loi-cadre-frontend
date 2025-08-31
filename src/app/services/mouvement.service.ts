import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Mouvement, MouvementDto, StatutMouvement, TypeMouvement, MouvementRequest } from "../models/mouvement";

@Injectable({
  providedIn: "root",
})
export class MouvementService {
  private apiUrl = `${environment.apiUrl}/mouvements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MouvementDto[]> {
    return this.http.get<MouvementDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<MouvementDto> {
    return this.http.get<MouvementDto>(`${this.apiUrl}/${id}`);
  }

  getByLoiCadre(loiCadreId: number): Observable<MouvementDto[]> {
    return this.http.get<MouvementDto[]>(`${this.apiUrl}/loi/${loiCadreId}`);
  }

  getByType(type: TypeMouvement): Observable<MouvementDto[]> {
    const params = new HttpParams().set("type", type);
    return this.http.get<MouvementDto[]>(`${this.apiUrl}/type`, { params });
  }

  getByStatus(status: StatutMouvement): Observable<MouvementDto[]> {
    const params = new HttpParams().set("status", status);
    return this.http.get<MouvementDto[]>(`${this.apiUrl}/status`, { params });
  }

  create(loiCadreId: number, request: MouvementRequest): Observable<MouvementDto> {
    return this.http.post<MouvementDto>(
      `${this.apiUrl}/loi/${loiCadreId}`,
      request
    );
  }

  update(id: number, request: MouvementRequest): Observable<MouvementDto> {
    return this.http.put<MouvementDto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
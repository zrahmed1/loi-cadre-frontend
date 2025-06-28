import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mouvement, TypeMouvement } from '../models/mouvement';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  private apiUrl = `${environment.apiUrl}/mouvements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.apiUrl);
  }

  getById(id: number): Observable<Mouvement> {
    return this.http.get<Mouvement>(`${this.apiUrl}/${id}`);
  }

  getByLoiCadre(loiCadreId: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(`${this.apiUrl}/loi/${loiCadreId}`);
  }

  getByPoste(posteId: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(`${this.apiUrl}/poste/${posteId}`);
  }

  getByType(type: TypeMouvement): Observable<Mouvement[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Mouvement[]>(`${this.apiUrl}/type`, { params });
  }

  create(loiCadreId: number, mouvement: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(`${this.apiUrl}/loi/${loiCadreId}`, mouvement);
  }

  update(id: number, mouvement: Mouvement): Observable<Mouvement> {
    return this.http.put<Mouvement>(`${this.apiUrl}/${id}`, mouvement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

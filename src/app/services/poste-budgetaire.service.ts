import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PosteBudgetaire, EtatPoste } from '../models/poste-budgetaire';

@Injectable({
  providedIn: 'root'
})
export class PosteBudgetaireService {
  private apiUrl = `${environment.apiUrl}/postes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PosteBudgetaire[]> {
    return this.http.get<PosteBudgetaire[]>(this.apiUrl);
  }

  getById(id: number): Observable<PosteBudgetaire> {
    return this.http.get<PosteBudgetaire>(`${this.apiUrl}/${id}`);
  }

  getByEtablissement(etablissementId: number): Observable<PosteBudgetaire[]> {
    return this.http.get<PosteBudgetaire[]>(`${this.apiUrl}/etablissement/${etablissementId}`);
  }

  getByEtat(etat: EtatPoste): Observable<PosteBudgetaire[]> {
    const params = new HttpParams().set('etat', etat);
    return this.http.get<PosteBudgetaire[]>(`${this.apiUrl}/etat`, { params });
  }

  getDisponibles(): Observable<PosteBudgetaire[]> {
    return this.http.get<PosteBudgetaire[]>(`${this.apiUrl}/disponibles`);
  }

  create(poste: PosteBudgetaire): Observable<PosteBudgetaire> {
    return this.http.post<PosteBudgetaire>(this.apiUrl, poste);
  }

  update(id: number, poste: PosteBudgetaire): Observable<PosteBudgetaire> {
    return this.http.put<PosteBudgetaire>(`${this.apiUrl}/${id}`, poste);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

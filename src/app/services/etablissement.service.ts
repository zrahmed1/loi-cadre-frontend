import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etablissement } from '../models/etablissement.model';

@Injectable({ providedIn: 'root' })
export class EtablissementService {
  private apiUrl = '/api/etablissements'; // Utilise le proxy Angular (localhost:8080)

  constructor(private http: HttpClient) {}

  getAll(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.apiUrl);
  }

  getById(id: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.apiUrl}/${id}`);
  }

  create(etab: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(this.apiUrl, etab);
  }

  update(id: number, etab: Etablissement): Observable<Etablissement> {
    return this.http.put<Etablissement>(`${this.apiUrl}/${id}`, etab);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

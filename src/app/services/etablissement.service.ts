import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Etablissement } from '../models/etablissement';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  private apiUrl = `${environment.apiUrl}/etablissements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.apiUrl);
  }

  getById(id: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.apiUrl}/${id}`);
  }

  create(etablissement: Etablissement): Observable<Etablissement> {
    return this.http.post<Etablissement>(this.apiUrl, etablissement);
  }

  update(id: number, etablissement: Etablissement): Observable<Etablissement> {
    return this.http.put<Etablissement>(`${this.apiUrl}/${id}`, etablissement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

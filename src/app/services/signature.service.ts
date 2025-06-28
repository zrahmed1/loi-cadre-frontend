import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SignatureElectronique } from '../models/signature-electronique';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  private apiUrl = `${environment.apiUrl}/signatures`;

  constructor(private http: HttpClient) {}

  getByUtilisateur(utilisateurId: number): Observable<SignatureElectronique[]> {
    return this.http.get<SignatureElectronique[]>(`${this.apiUrl}/utilisateur/${utilisateurId}`);
  }

  getByLoiCadre(loiCadreId: number): Observable<SignatureElectronique[]> {
    return this.http.get<SignatureElectronique[]>(`${this.apiUrl}/loi/${loiCadreId}`);
  }

  create(loiCadreId: number, utilisateurId: number): Observable<SignatureElectronique> {
    return this.http.post<SignatureElectronique>(`${this.apiUrl}/loi/${loiCadreId}/utilisateur/${utilisateurId}`, {});
  }

  validate(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/signer`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

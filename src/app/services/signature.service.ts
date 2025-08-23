import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SignatureElectronique } from "../models/signature-electronique";

@Injectable({
  providedIn: "root",
})
export class SignatureService {
  private apiUrl = `${environment.apiUrl}/signatures`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SignatureElectronique[]> {
    return this.http.get<SignatureElectronique[]>(this.apiUrl);
  }

  getById(id: number): Observable<SignatureElectronique> {
    return this.http.get<SignatureElectronique>(`${this.apiUrl}/${id}`);
  }

  getByLoiCadre(loiCadreId: number): Observable<SignatureElectronique[]> {
    return this.http.get<SignatureElectronique[]>(
      `${this.apiUrl}/loi/${loiCadreId}`
    );
  }

  getByMouvement(mouvementId: number): Observable<SignatureElectronique[]> {
    return this.http.get<SignatureElectronique[]>(
      `${this.apiUrl}/mouvement/${mouvementId}`
    );
  }

  getByUtilisateur(utilisateurId: number): Observable<SignatureElectronique[]> {
    return this.http.get<SignatureElectronique[]>(
      `${this.apiUrl}/utilisateur/${utilisateurId}`
    );
  }

  createLoiSignature(
    loiCadreId: number,
    utilisateurId: number,
    circuitId: number
  ): Observable<SignatureElectronique> {
    return this.http.post<SignatureElectronique>(
      `${this.apiUrl}/loi/${loiCadreId}/utilisateur/${utilisateurId}/circuit/${circuitId}`,
      {}
    );
  }

  createMouvementSignature(
    mouvementId: number,
    utilisateurId: number,
    circuitId: number
  ): Observable<SignatureElectronique> {
    return this.http.post<SignatureElectronique>(
      `${this.apiUrl}/mouvement/${mouvementId}/utilisateur/${utilisateurId}/circuit/${circuitId}`,
      {}
    );
  }

  validate(id: number): Observable<SignatureElectronique> {
    return this.http.put<SignatureElectronique>(
      `${this.apiUrl}/${id}/signer`,
      {}
    );
  }

  reject(id: number, motifRejet: string): Observable<SignatureElectronique> {
    return this.http.put<SignatureElectronique>(
      `${this.apiUrl}/${id}/rejeter`,
      { motifRejet }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

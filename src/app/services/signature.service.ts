import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SignatureElectronique, SignatureElectroniqueDto, SignatureRequest } from "../models/signature-electronique";

@Injectable({
  providedIn: "root",
})
export class SignatureService {
  private apiUrl = `${environment.apiUrl}/signatures`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SignatureElectroniqueDto[]> {
    return this.http.get<SignatureElectroniqueDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<SignatureElectroniqueDto> {
    return this.http.get<SignatureElectroniqueDto>(`${this.apiUrl}/${id}`);
  }

  getByLoiCadre(loiCadreId: number): Observable<SignatureElectroniqueDto[]> {
    return this.http.get<SignatureElectroniqueDto[]>(
      `${this.apiUrl}/loi/${loiCadreId}`
    );
  }

  getByMouvement(mouvementId: number): Observable<SignatureElectroniqueDto[]> {
    return this.http.get<SignatureElectroniqueDto[]>(
      `${this.apiUrl}/mouvement/${mouvementId}`
    );
  }

  getByUtilisateur(utilisateurId: number): Observable<SignatureElectroniqueDto[]> {
    return this.http.get<SignatureElectroniqueDto[]>(
      `${this.apiUrl}/utilisateur/${utilisateurId}`
    );
  }

  create(request: SignatureRequest): Observable<SignatureElectroniqueDto> {
    return this.http.post<SignatureElectroniqueDto>(this.apiUrl, request);
  }
  createLoiSignature(loiCadreId: number, utilisateurId: number): Observable<SignatureElectroniqueDto> {
    return this.http.post<SignatureElectroniqueDto>(
      `${this.apiUrl}/loi/${loiCadreId}/utilisateur/${utilisateurId}`,
      {}
    );
  }

  createMouvementSignature(mouvementId: number, utilisateurId: number): Observable<SignatureElectroniqueDto> {
    return this.http.post<SignatureElectroniqueDto>(
      `${this.apiUrl}/mouvement/${mouvementId}/utilisateur/${utilisateurId}`,
      {}
    );
  }

  validate(id: number): Observable<SignatureElectroniqueDto> {
    return this.http.put<SignatureElectroniqueDto>(
      `${this.apiUrl}/${id}/signer`,
      {}
    );
  }

  reject(id: number, motifRejet: string): Observable<SignatureElectroniqueDto> {
    return this.http.put<SignatureElectroniqueDto>(
      `${this.apiUrl}/${id}/rejeter`,
      { motifRejet }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PosteBudgetaire} from '../models/poste-budgetaire.model';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PosteBudgetaireService {
  private api = 'http://localhost:8080/api/lois-cadres';

  constructor(private http: HttpClient) {}

  addPosteToLoi(loiCadreId: number, poste: PosteBudgetaire): Observable<PosteBudgetaire> {
    return this.http.post<PosteBudgetaire>(`${this.api}/${loiCadreId}/postes`, poste);
  }

  getAll(): Observable<PosteBudgetaire[]> {
    return this.http.get<PosteBudgetaire[]>('/api/postes');
  }
}

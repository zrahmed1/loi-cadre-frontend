@Injectable({ providedIn: 'root' })
export class MouvementService {
  private api = 'http://localhost:8080/api/mouvements';

  constructor(private http: HttpClient) {}

  addMouvementToLoi(loiCadreId: number, mvt: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(`${this.api}/loi/${loiCadreId}`, mvt);
  }
  getByLoiCadre(loiId: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(`/api/mouvements/loi/${loiId}`);
  }

}

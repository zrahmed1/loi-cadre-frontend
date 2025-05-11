@Injectable({ providedIn: 'root' })
export class LoiCadreService {
  private apiUrl = 'http://localhost:8080/api/lois-cadres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LoiCadre[]> {
    return this.http.get<LoiCadre[]>(this.apiUrl);
  }

  getById(id: number): Observable<LoiCadre> {
    return this.http.get<LoiCadre>(`${this.apiUrl}/${id}`);
  }

  create(loi: LoiCadre): Observable<LoiCadre> {
    return this.http.post<LoiCadre>(this.apiUrl, loi);
  }

  update(id: number, loi: LoiCadre): Observable<LoiCadre> {
    return this.http.put<LoiCadre>(`${this.apiUrl}/${id}`, loi);
  }
}

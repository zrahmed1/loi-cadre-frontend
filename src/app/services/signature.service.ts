@Injectable({ providedIn: 'root' })
export class SignatureService {
  private api = 'http://localhost:8080/api/signatures';

  constructor(private http: HttpClient) {}

  getByLoiCadre(loiId: number): Observable<Signature[]> {
    return this.http.get<Signature[]>(`${this.api}/loi/${loiId}`);
  }

  signer(id: number): Observable<Signature> {
    return this.http.put<Signature>(`${this.api}/${id}/signer`, {});
  }
}

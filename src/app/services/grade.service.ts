import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Grade, GradeDto, GradeRequest } from "../models/grade";

@Injectable({
  providedIn: "root",
})
export class GradeService {
  private apiUrl = `${environment.apiUrl}/grades`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<GradeDto[]> {
    return this.http.get<GradeDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<GradeDto> {
    return this.http.get<GradeDto>(`${this.apiUrl}/${id}`);
  }

  getByCode(code: string): Observable<GradeDto> {
    return this.http.get<GradeDto>(`${this.apiUrl}/code/${code}`);
  }

  create(request: GradeRequest): Observable<GradeDto> {
    return this.http.post<GradeDto>(this.apiUrl, request);
  }

  update(id: number, request: GradeRequest): Observable<GradeDto> {
    return this.http.put<GradeDto>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

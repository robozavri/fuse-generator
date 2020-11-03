import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { QueryResponse } from '../models/query-response';
import { CommonsText } from '../models/commons-text';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class CommonsTextApiService {

  constructor(private http: HttpClient) { }

  getOne(): Observable<QueryResponse<CommonsText>> {
    return this.http.get<any>(`${API_URL}/api/commons-texts/one`);
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/commons-texts/one`, data);
  }
}

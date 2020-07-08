import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryResponse } from '../models/query-response';
import { Meta } from '../models/meta';

const API_URL = environment.apiUrl;

@Injectable()
export class MetaApiService {

  constructor(private http: HttpClient) { }

  getOne(): Observable<QueryResponse<Meta>> {
    return this.http.get<any>(`${API_URL}/api/metas/one`);
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/metas/one`, data);
  }
}

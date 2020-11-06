import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { QueryResponse } from '../models/query-response';
import { Config } from '../models/config';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class ConfigApiService {

  constructor(private http: HttpClient) { }

  getOne(): Observable<QueryResponse<Config>> {
    return this.http.get<any>(`${API_URL}/api/configs/one`);
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/configs/one`, data);
  }
}

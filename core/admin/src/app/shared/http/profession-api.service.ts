import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';
import { Profession } from '../models/profession';

const API_URL = environment.apiUrl;

@Injectable()
export class ProfessionApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params): Observable<QueryResponse<Profession>> {
    return this.http.get<any>(`${API_URL}/api/professions`, {
      params,
    });
  }

  create(data): Observable<any> {
    return this.http.post(`${API_URL}/api/professions`, data, {
      responseType: 'text',
    });
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/professions/${data._id}`, data, {
      responseType: 'text',
    });
  }

  updatePositions(data): Observable<any> {
    return this.http.patch(`${API_URL}/api/professions/positions`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/professions/${id}`, {
      responseType: 'text',
    });
  }

}

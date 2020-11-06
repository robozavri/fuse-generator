import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';
import { Field } from '../models/field';

const API_URL = environment.apiUrl;

@Injectable()
export class FieldApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params): Observable<QueryResponse< Field>> {
    return this.http.get<any>(`${API_URL}/api/fields`, {
      params,
    });
  }

  create(data): Observable<any> {
    return this.http.post(`${API_URL}/api/fields`, data, {
      responseType: 'text',
    });
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/fields/${data._id}`, data, {
      responseType: 'text',
    });
  }

  updatePositions(data): Observable<any> {
    return this.http.patch(`${API_URL}/api/fields/positions`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/fields/${id}`, {
      responseType: 'text',
    });
  }

}

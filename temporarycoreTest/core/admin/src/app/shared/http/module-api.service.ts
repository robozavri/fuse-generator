import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';
import { Module } from '../models/module';

const API_URL = environment.apiUrl;

@Injectable()
export class ModuleApiService {
  constructor(private http: HttpClient) { }



  getByQuery(params): Observable<QueryResponse<Module>> {
    return this.http.get<any>(`${API_URL}/api/modules`, {
      params,
    });
  }

  generate(data): Observable<any> {
    return this.http.post(`${API_URL}/api/modules/generate`, data, {
      responseType: 'text',
    });
  }

  create(data): Observable<any> {
    return this.http.post(`${API_URL}/api/modules`, data, {
      responseType: 'text',
    });
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/modules/${data._id}`, data, {
      responseType: 'text',
    });
  }

  updatePositions(data): Observable<any> {
    return this.http.patch(`${API_URL}/api/modules/positions`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/modules/${id}`, {
      responseType: 'text',
    });
  }

}

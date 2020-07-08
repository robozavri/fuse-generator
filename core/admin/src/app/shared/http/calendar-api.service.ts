import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';

const API_URL = environment.apiUrl;

@Injectable()
export class CalendarApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params): Observable<QueryResponse<any>> {
    return this.http.get<any>(`${API_URL}/api/events`, {
      params,
    });
  }

  create(data): Observable<any> {
    return this.http.post(`${API_URL}/api/events`, data, {
      responseType: 'text',
    });
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/events/${data._id}`, data, {
      responseType: 'text',
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/events/${id}`, {
      responseType: 'text',
    });
  }

}

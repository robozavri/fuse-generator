import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';
import { <%=nameSingularUC%> } from '../models/<%=nameSingular%>';

const API_URL = environment.apiUrl;

@Injectable()
export class <%=nameSingularUC%>ApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params): Observable<QueryResponse<<%=nameSingularUC%>>> {
    return this.http.get<any>(`${API_URL}/api/<%=namePlural%>`, {
      params,
    });
  }

  create(data): Observable<any> {
    return this.http.post(`${API_URL}/api/<%=namePlural%>`, data, {
      responseType: 'text',
    });
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/<%=namePlural%>/${data._id}`, data, {
      responseType: 'text',
    });
  }

  updatePositions(data): Observable<any> {
    return this.http.patch(`${API_URL}/api/<%=namePlural%>/positions`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/<%=namePlural%>/${id}`, {
      responseType: 'text',
    });
  }

}

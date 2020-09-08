import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { QueryResponse } from '../models/query-response';
import { <%=nameSingularUC%> } from '../models/<%=singularFileName%>';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class <%=nameSingularUC%>ApiService {

  constructor(private http: HttpClient) { }

  getOne(): Observable<QueryResponse<<%=nameSingularUC%>>> {
    return this.http.get<any>(`${API_URL}/api/<%=pluralFileName%>/one`);
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/<%=pluralFileName%>/one`, data);
  }
}

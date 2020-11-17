import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { <%=nameSingularUC%> } from '../models/<%=singularFileName%>';

const API_URL = environment.apiUrl;

@Injectable()
export class <%=nameSingularUC%>ApiService {
  constructor(private http: HttpClient) { }

  getOne(): Observable<<%=nameSingularUC%>> {
    return this.http.get<any>(`${API_URL}/api/<%=pluralFileName%>/one`);
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/<%=pluralFileName%>/one`, data);
  }

}

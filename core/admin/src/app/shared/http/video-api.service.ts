import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { QueryResponse } from '../models/query-response';
import { Video } from '../models/video';

const API_URL = environment.apiUrl;

@Injectable()
export class VideoApiService {
  constructor(private http: HttpClient) { }

  getByQuery(params): Observable<QueryResponse<Video>> {
    return this.http.get<any>(`${API_URL}/api/videos`, {
      params,
    });
  }

  create(data): Observable<any> {
    return this.http.post(`${API_URL}/api/videos`, data, {
      responseType: 'text',
    });
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/videos/${data._id}`, data, {
      responseType: 'text',
    });
  }

  updatePositions(data): Observable<any> {
    return this.http.patch(`${API_URL}/api/videos/positions`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/api/videos/${id}`, {
      responseType: 'text',
    });
  }

}

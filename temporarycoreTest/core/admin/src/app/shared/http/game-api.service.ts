import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Game } from '../models/game';

const API_URL = environment.apiUrl;

@Injectable()
export class GameApiService {
  constructor(private http: HttpClient) { }

  getOne(): Observable<Game> {
    return this.http.get<any>(`${API_URL}/api/games/one`);
  }

  update(data): Observable<any> {
    return this.http.put(`${API_URL}/api/games/one`, data);
  }

}

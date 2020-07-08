import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';


const API_URL = environment.apiUrl;

@Injectable()
export class UserApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getMe(): Observable<User> {
    return this.http
      .get<User>(`${API_URL}/api/users/me`);
  }

  public getByQuery(params): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/api/users`, { params });
  }

  public signIn(data): Observable<any> {
    return this.http
      .post(`${API_URL}/api/users/sign-in`, data);
  }

}

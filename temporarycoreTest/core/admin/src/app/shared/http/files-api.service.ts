import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


const API_URL = environment.apiUrl;

@Injectable()
export class FileApiService {

  constructor(private http: HttpClient) { }

  public createFiles(filesToAdd: File[], fileNamesToDestroy: string[]): Observable<any> {
    const data = this.getFilesFormData(filesToAdd, fileNamesToDestroy);
    return this.http.post(`${API_URL}/api/files`, data, { responseType: 'text' });
  }

  getFilesFormData(filesToAdd: File[], fileNamesToDestroy: string[]): FormData {
    const formData = new FormData();
    for (const file of filesToAdd) {
      formData.append('filesToAdd', file);
    }
    for (const file of fileNamesToDestroy) {
      formData.append('fileNamesToDestroy', file);
    }
    return formData;
  }
}

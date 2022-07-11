import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Cargo, Encargado, Estado} from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = environment.apiUrl;

  constructor(
      private _httpClient: HttpClient,
  ) { }

  getStatus(queryParams = null): Observable<Estado[]> {
    return this._httpClient.get<Estado[]>(`${this.apiUrl}estado/lista`, {params: queryParams});
  }

  getEmployees(queryParams = null): Observable<Encargado[]> {
    return this._httpClient.get<Encargado[]>(`${this.apiUrl}encargado/lista`, {params: queryParams});
  }

  getPositions(queryParams = null): Observable<Cargo[]> {
    return this._httpClient.get<Cargo[]>(`${this.apiUrl}cargo/lista`, {params: queryParams});
  }
}

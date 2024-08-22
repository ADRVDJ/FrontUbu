import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getUserDetails(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any>(`${this.apiUrl}/user-info`, { params });
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServService {
  private apiUrl = 'http://localhost:8080/api/admin'; // Asegúrate de apuntar a tu backend

  constructor(private http: HttpClient) { }

  createUser(createUserDTO: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/createUser`, createUserDTO, { headers, responseType: 'json' as 'json' })
      .pipe(
        catchError(error => {
          console.error('Error creating user:', error);
          return throwError(() => new Error('Error creating user'));
        })
      );
  }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(() => new Error('Error fetching users'));
        })
      );
  }

  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/deleteUser/${userId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error deleting user:', error);
          return throwError(() => new Error('Error deleting user'));
        })
      );
  }

  updateUser(userId: number, updateUserDTO: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, updateUserDTO, { headers, responseType: 'json' as 'json' })
      .pipe(
        catchError(error => {
          console.error('Error updating user:', error);
          return throwError(() => new Error('Error updating user'));
        })
      );
  }

  getRoles(): Observable<string[]> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<string[]>(`${this.apiUrl}/roles`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching roles:', error);
          return throwError(() => new Error('Error fetching roles'));
        })
      );
  }
}

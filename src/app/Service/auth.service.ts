import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  // Guardar el token y los detalles del usuario en localStorage
  saveUserDetails(response: any): void {
    console.log('Respuesta completa:', response); // Imprimir la respuesta completa para verificar la estructura

    // Verificar si response.Role está definido y es un array
    const roles = Array.isArray(response.Role) ? response.Role.map((role: any) => role.authority) : [];

    // Guardar el token y los detalles del usuario
    localStorage.setItem('token', response.token); // Guardar el token
    localStorage.setItem('userDetails', JSON.stringify({
      username: response.Username,
      roles // Guardar roles como un array (incluso si está vacío)
    }));
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // No necesita argumentos
  }

  getUserDetails(): Observable<any> {
    const token = this.getToken();
    if (token) {
      return this.http.get<any>(`${this.apiUrl}/user-details`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return new Observable(); // Retorna un observable vacío si no hay token
  }

  getUserRole(): string[] {
    const userDetails = localStorage.getItem('userDetails');
    
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      return parsedDetails.roles || [];
    }
    
    return [];
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/logout`, {}, { responseType: 'text' as 'json' });
  }
}

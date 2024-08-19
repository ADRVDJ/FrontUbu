import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private apiUrl = 'http://localhost:8080/api/user'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  getShoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibles`);
  }

  getbusqueda(nombre?: string, categoria?: string, talla?: string, minPrecio?: number, maxPrecio?: number): Observable<any[]> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (categoria) params = params.set('categoria', categoria);
    if (talla) params = params.set('talla', talla);
    if (minPrecio != null) params = params.set('minPrecio', minPrecio.toString());
    if (maxPrecio != null) params = params.set('maxPrecio', maxPrecio.toString());

    return this.http.get<any[]>(`${this.apiUrl}/buscar`, { params });
  }
}
  


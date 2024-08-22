import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Stock {
  id: number;
  cedula:string;
  nombre: string;
  apellido:string;
  categoria_id: number;
  stock_inicial: string;
  ubicacion: string;
  fecha: string;
  foto?: string;

  categoria: number;
  categoriaNombre?: string; // Agregamos esta propiedad opcional

}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/stock/';

  constructor(private http: HttpClient) { }

  getStockList(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/listar`);
  }

  createStock(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/crear`, formData, { responseType: 'text' as 'json' });
  }

  updateStock(id: number, formData: FormData): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/actualizar/${id}`, formData, { responseType: 'text' as 'json' });
  }

  deleteStock(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' as 'json' });
  }

  getTodos(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/listar`);
  }
  //
  searchStock(term: string): Observable<Stock[]> {
    // Utilizar parámetros de consulta en la URL
    return this.http.get<Stock[]>(`${this.apiUrl}/buscar`, {
      params: {
        cedula: term // Suponiendo que 'term' se usa como 'cedula' en el backend
      }
    });
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Stock {
  id: number;
  nombre: string;
  categoriaId: number;
  descripcion: string;
  Stock_inicial: string;
  Ubicacion: string;
  fecha_caducidad: string;
  foto?: string;
  stock_inicial: string;
  ubicacion: string;
  categoria:number;

}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/stock';

  constructor(private http: HttpClient) { }

  getStockList(): Observable<Stock[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Stock[]>(`${this.apiUrl}/listar`, { headers });
  }

  createStock(formData: FormData): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.apiUrl}/add`, formData, { headers, responseType: 'text' as 'json' });
  }

  updateStock(id: number, formData: FormData): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<string>(`${this.apiUrl}/actualizar/${id}`, formData, { headers, responseType: 'text' as 'json' });
  }

  deleteStock(id: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<string>(`${this.apiUrl}/eliminar/${id}`, { headers, responseType: 'text' as 'json' });
  }

  
  getTodos(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/listar`);
  }
}

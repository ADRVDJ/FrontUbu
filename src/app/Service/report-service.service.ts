import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private apiUrl = 'http://localhost:8080/api/reports'; // URL de tu API

  constructor(private http: HttpClient) {}

  getInventoryReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory`);
  }
}
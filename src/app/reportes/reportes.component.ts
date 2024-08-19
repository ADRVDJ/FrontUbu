import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../Service/report-service.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'] // Asegúrate de que este archivo exista y esté correctamente referenciado
})
export class ReportesComponent implements OnInit {
  reportData: any = {};
  errorMessage: string = '';

  constructor(private reportService: ReportServiceService) {}

  ngOnInit(): void {
    this.loadInventoryReport();
  }

  loadInventoryReport(): void {
    this.reportService.getInventoryReport().subscribe(
      (data) => {
        this.reportData = data;
      },
      (error) => {
        console.error('Error fetching report:', error);
        this.errorMessage = 'Error fetching report. Please try again later.';
      }
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from '../Service/auth.service'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'] // Cambia styleUrl a styleUrls
})
export class MenuAdminComponent {

  constructor(private authService: AuthService, private router: Router) { } // Inyecta Router

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

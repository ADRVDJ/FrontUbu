import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-invited',
  templateUrl: './menu-invited.component.html',
  styleUrl: './menu-invited.component.css'
})
export class MenuINVITEDComponent {

  constructor(private authService: AuthService, private router: Router) { } // Inyecta Router

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

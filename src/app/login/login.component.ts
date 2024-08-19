import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null; // Para mostrar el mensaje de error
  loginError: string = '';  // Asegúrate de declarar 'loginError'


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response, this.credentials);

        this.authService.saveUserDetails(response);
        const roles = this.authService.getUserRole();

        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/controllerstock']);
        } else if (roles.includes('ROLE_INVITED')) {
          this.router.navigate(['/Controller-invited']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.loginError = 'Invalid username or password.';
        console.error('Login error:', error);
        console.log('Respuesta del servidor:',  this.credentials);

      }
    );
  
  }
  
  
}
  


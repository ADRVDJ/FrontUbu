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
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.message === 'Login successful') {
          // Redirigir al usuario a la página principal después de un inicio de sesión exitoso
          this.router.navigate(['/controllerstock']);
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña inválidos.';
        }
      },
      (error) => {
        this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo más tarde.';
        console.error('Error de inicio de sesión:', error);
      }
    );
  }
}
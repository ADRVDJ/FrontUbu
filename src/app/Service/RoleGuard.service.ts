import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = this.authService.getUserRole();
    const requiredRole = route.data['role'] as string;

    if (roles.includes(requiredRole)) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}

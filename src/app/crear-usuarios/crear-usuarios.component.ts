import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServService } from '../Service/admin-serv.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  selectedRole: string = 'INVITED';
  successMessage: string = '';
  errorMessage: string = '';
  users: any[] = [];
  roles: string[] = [];
  editingUserId: number | null = null;

  constructor(private userService: AdminServService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  onSubmit(): void {
    const userDTO = {
      username: this.username,
      password: this.password,
      email: this.email,
      roles: [this.selectedRole]
    };

    if (this.editingUserId) {
      this.userService.updateUser(this.editingUserId, userDTO).subscribe({
        next: (response) => {
          this.successMessage = 'Usuario actualizado correctamente';
          this.loadUsers(); // Recargar la lista de usuarios
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
          this.errorMessage = 'Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo.';
        }
      });
    } else {
      this.userService.createUser(userDTO).subscribe({
        next: (response) => {
          this.successMessage = 'Usuario creado correctamente';
          this.loadUsers(); // Recargar la lista de usuarios
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          this.errorMessage = 'Hubo un error al crear el usuario. Por favor, inténtelo de nuevo.';
        }
      });
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.errorMessage = 'Hubo un error al cargar los usuarios. Por favor, inténtelo de nuevo.';
      }
    });
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
        this.errorMessage = 'Hubo un error al cargar los roles. Por favor, inténtelo de nuevo.';
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.successMessage = 'Usuario eliminado correctamente';
        this.loadUsers(); // Recargar la lista de usuarios
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
        this.errorMessage = 'Hubo un error al eliminar el usuario. Por favor, inténtelo de nuevo.';
      }
    });
  }

  editUser(user: any): void {
    this.username = user.username;
    this.password = ''; // No pre-cargar la contraseña
    this.email = user.email;
    this.selectedRole = user.roles[0]; // Asumiendo que solo hay un rol por usuario
    this.editingUserId = user.id;
  }

  resetForm(): void {
    this.username = '';
    this.password = '';
    this.email = '';
    this.selectedRole = 'INVITED';
    this.editingUserId = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}

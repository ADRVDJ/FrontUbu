import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DetallesComponent } from './detalles/detalles.component';
import { InformacionComponent } from './informacion/informacion.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { PieComponent } from './pie/pie.component';
import { ListarStockComponent } from './listar-stock/listar-stock.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { MenuINVITEDComponent } from './menu-invited/menu-invited.component';
import { CategoriaComponent } from './categoria/categoria.component';

// Configuración de rutas
const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Ruta para el componente Home
  { path: 'login', component: LoginComponent }, // Ruta para el componente Login
  { path: 'detalle', component: DetallesComponent }, // Ruta para el componente Detalles
  { path: 'informacion', component: InformacionComponent }, // Ruta para el componente Información
 { path: 'menu-user', component: MenuUserComponent }, // Ruta para el componente MenuAdmin
 { path: 'menu-admin', component: MenuAdminComponent }, // Ruta para el componente MenuAdmin
  { path: 'pie', component: PieComponent }, // Ruta para el componente MenuAdmin
  { path: 'controllerstock', component: ListarStockComponent }, // Ruta para el componente MenuAdmin
  { path: 'list-reporty', component: ReportesComponent }, // Ruta Reportes
  { path: 'CrearUsuario', component: CrearUsuariosComponent }, // Ruta Reportes
  { path: 'menu-invited', component: MenuINVITEDComponent }, // Ruta Reportes
  { path: 'Controllercate', component: CategoriaComponent }, // Ruta Reportes

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa y configura las rutas
  exports: [RouterModule] // Exporta el módulo de enrutamiento
})
export class AppRoutingModule { }

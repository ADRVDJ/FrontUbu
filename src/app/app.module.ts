import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './Service/auth.service';
import { ShoeService } from './Service/shoe.service';
import { DetallesComponent } from './detalles/detalles.component';
import { InformacionComponent } from './informacion/informacion.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { ListarStockComponent } from './listar-stock/listar-stock.component';
import { TokenInterceptor } from './TokenInterceptor ';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportesComponent } from './reportes/reportes.component';
import { PieComponent } from './pie/pie.component';
import { RouterModule } from '@angular/router';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { MenuINVITEDComponent } from './menu-invited/menu-invited.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaService } from './Service/categoria.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetallesComponent,
    InformacionComponent,
    MenuAdminComponent,
    MenuUserComponent,
    PieComponent,
    ListarStockComponent,
    ReportesComponent,
    CrearUsuariosComponent,
    MenuINVITEDComponent,
    CategoriaComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule, // Asegúrate de incluir NgbModule aquí
    BrowserAnimationsModule, // Agrega este módulo
    ToastrModule.forRoot(), // Agrega este módulo
    RouterModule 
  ],
 // schemas: [CUSTOM_ELEMENTS_SCHEMA], // Esto se usa para permitir elementos personalizados
  providers: [AuthService, ShoeService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

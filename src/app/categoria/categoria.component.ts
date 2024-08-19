import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Categoria, CategoriaService } from '../Service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'] // Cambiado de styleUrl a styleUrls
})
export class CategoriaComponent implements OnInit {
  @ViewChild('createModal') createModal: TemplateRef<any> | undefined;
  
  stockList: Categoria[] = [];
  currentCategoria: Categoria = {} as Categoria;
  isEdit: boolean = false;

  constructor(
    private categoriaService: CategoriaService, 
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.stockList = data;
      },
      (error) => {
        console.error('Error loading categories', error);
        this.toastr.error('No se pudo cargar la lista de categorías.');
      }
    );
  }

  openCreateForm(): void {
    this.currentCategoria = {} as Categoria; // Resetea el formulario
    this.isEdit = false;
    if (this.createModal) {
      this.modalService.open(this.createModal, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  openEditForm(categoria: Categoria): void {
    this.currentCategoria = { ...categoria }; // Carga los datos en el formulario
    this.isEdit = true;
    if (this.createModal) {
      this.modalService.open(this.createModal, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  createCategoria(): void {
    this.categoriaService.createCategoria(this.currentCategoria).subscribe(
      () => {
        this.loadCategorias();
        this.modalService.dismissAll(); // Cierra el modal
        this.toastr.success('Categoría creada exitosamente.');
      },
      (error) => {
        console.error('Error creating category', error);
        this.toastr.error('No se pudo crear la categoría.');
      }
    );
  }

  updateCategoria(): void {
    if (this.currentCategoria.id) {
      this.categoriaService.updateCategoria(this.currentCategoria.id, this.currentCategoria).subscribe(
        () => {
          this.loadCategorias();
          this.modalService.dismissAll(); // Cierra el modal
          this.toastr.success('Categoría actualizada exitosamente.');
        },
        (error) => {
          console.error('Error updating category', error);
          this.toastr.error('No se pudo actualizar la categoría.');
        }
      );
    }
  }

  deleteCategoria(id: number): void {
    if (id) {
      this.categoriaService.deleteCategoria(id).subscribe(
        () => {
          this.loadCategorias();
          this.toastr.success('Categoría eliminada exitosamente.');
        },
        (error) => {
          console.error('Error deleting category', error);
          this.toastr.error('No se pudo eliminar la categoría.');
        }
      );
    }
  }
}

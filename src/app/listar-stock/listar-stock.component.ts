import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService, Stock } from '../Service/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService, Categoria } from '../Service/categoria.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listar-stock',
  templateUrl: './listar-stock.component.html',
  styleUrls: ['./listar-stock.component.css']
})
export class ListarStockComponent implements OnInit {
  @ViewChild('createModal') createModal: TemplateRef<any> | undefined;
  @ViewChild('editModal') editModal: TemplateRef<any> | undefined;

  stockList: Stock[] = [];
  currentProduct: Stock = {} as Stock;
  isEdit: boolean = false;
  selectedEstado: string = 'todos'; 
  categorias: Categoria[] = []; // Lista de categorías para el componente

  constructor(
    private stockService: AdminService, 
    private modalService: NgbModal,
    private categoriaService: CategoriaService,
    private toastr: ToastrService // Inyección del servicio de notificaciones
  ) { }

  ngOnInit(): void {
    this.loadStock();
    this.fetchStockList(); 
    this.loadCategorias(); // Carga las categorías al iniciar el componente
  }

  loadStock(): void {
    this.stockService.getStockList().subscribe(
      (data) => {
        this.stockList = data;
      },
      (error) => {
        console.error('Error loading stock', error);
        this.toastr.error('No se pudo cargar la lista de productos.'); // Notificación de error
      }
    );
  }

  openCreateForm(): void {
    if (this.createModal) {
      this.currentProduct = {} as Stock; // Resetea el formulario
      this.isEdit = false;
      this.modalService.open(this.createModal, { ariaLabelledBy: 'modal-basic-title' });  
    }
  }

  openEditForm(stock: Stock): void {
    if (this.editModal) {
      this.currentProduct = { ...stock }; // Carga los datos en el formulario
      this.isEdit = true;
      this.modalService.open(this.editModal, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentProduct.foto = e.target.result; // Guarda el archivo como base64
      };
      reader.readAsDataURL(file);
    }
  }
  
  createProduct(): void {
    const formData = new FormData();
    Object.keys(this.currentProduct).forEach(key => {
      if (key === 'foto' && this.currentProduct.foto) {
        const base64Data = this.currentProduct.foto.split(',')[1]; // Extrae el contenido base64
        const byteCharacters = atob(base64Data); // Decodifica el base64 a bytes
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        formData.append('foto', blob, 'foto.png');
      } else {
        formData.append(key, this.currentProduct[key as keyof Stock] as string);
      }
    });
  
    this.stockService.createStock(formData).subscribe(
      () => {
        this.loadStock();
        this.modalService.dismissAll(); // Cierra el modal
        this.toastr.success('Producto creado exitosamente.'); // Notificación de éxito
      },
      (error) => {
        console.error('Error creating product', error);
        this.toastr.error('No se pudo crear el producto.'); // Notificación de error
      }
    );
  }
  
  updateProduct(): void {
    const formData = new FormData();
    Object.keys(this.currentProduct).forEach(key => {
      if (key === 'foto' && this.currentProduct.foto) {
        const base64Data = this.currentProduct.foto.split(',')[1]; // Extrae el contenido base64
        const byteCharacters = atob(base64Data); // Decodifica el base64 a bytes
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        formData.append('foto', blob, 'foto.png');
      } else {
        formData.append(key, this.currentProduct[key as keyof Stock] as string);
      }
    });
  
    this.stockService.updateStock(this.currentProduct.id, formData).subscribe(
      () => {
        this.loadStock();
        this.modalService.dismissAll(); // Cierra el modal
        this.toastr.success('Producto actualizado exitosamente.'); // Notificación de éxito
      },
      (error) => {
        console.error('Error updating product', error);
        this.toastr.error('No se pudo actualizar el producto.'); // Notificación de error
      }
    );
  }

  deleteProduct(id: number): void {
    this.stockService.deleteStock(id).subscribe(
      () => {
        this.loadStock();
        this.toastr.success('Producto eliminado exitosamente.'); // Notificación de éxito
      },
      (error) => {
        console.error('Error deleting product', error);
        this.toastr.error('No se pudo eliminar el producto.'); // Notificación de error
      }
    );
  }
  
  // Método para obtener la lista de stock según el estado seleccionado
  fetchStockList(): void {
    switch (this.selectedEstado) {
      case 'todos':
        this.stockService.getTodos().subscribe(data => {
          this.stockList = data;
        });
        break;
    }
  }

  // Método para manejar el cambio en los radio buttons
  onEstadoChange(estado: string) {
    this.selectedEstado = estado;
    this.fetchStockList();
  }

  // Método para cargar las categorías
  loadCategorias(): void {
    this.categoriaService.getCategoriaList().subscribe(data => {
      this.categorias = data;
    });
  }

  // Método para obtener el nombre de la categoría basado en el ID
  getCategoriaNombre(id: number): string {
    const categoria = this.categorias.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Desconocida';
  }

   // Método para generar el PDF
   generatePDF(): void {
    const doc = new jsPDF();
    doc.text('Lista de Productos', 14, 16);

    const tableColumn = ['ID', 'Nombre', 'Categoría', 'Descripción', 'Stock inicial', 'Ubicacion', 'fecha_caducidad'];
    const tableRows = this.stockList.map(stock => [
      stock.id,
      stock.nombre,
      this.getCategoriaNombre(stock.categoria),
      stock.descripcion,
      stock.stock_inicial,
      stock.ubicacion,
      stock.fecha_caducidad
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save('stock-list.pdf');
  }
}

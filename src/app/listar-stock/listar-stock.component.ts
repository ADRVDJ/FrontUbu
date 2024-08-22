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
  searchTerm: string = ''; // Término de búsqueda
  categoriasCargadas: boolean = false; // Marca si las categorías están cargadas

  constructor(
    private stockService: AdminService, 
    private modalService: NgbModal,
    private categoriaService: CategoriaService,
    private toastr: ToastrService // Inyección del servicio de notificaciones
  ) { }

  ngOnInit(): void {
    this.loadCategorias(); // Carga las categorías al iniciar el componente
    this.searchStock(); // Carga la lista de stock con la búsqueda inicial    this.fetchStockList(); // Carga la lista de stock después de las categorías
   // this. searchStock();
  }
   // Método de búsqueda
   searchStock(): void {
    if (this.searchTerm.trim() === '') {
      this.loadStock(); // Carga todos los datos si el campo de búsqueda está vacío
    } else {
      this.stockService.searchStock(this.searchTerm).subscribe(
        data => {
          this.stockList = data; // Actualiza la lista de stock con los datos de la búsqueda
        },
        error => {
          console.error('Error searching stock', error);
          this.toastr.error('No se pudo realizar la búsqueda de productos.'); // Notificación de error
        }
      );
    }
  }

  // Método para cargar la lista de stock
  loadStock(): void {
    this.stockService.getStockList().subscribe(
      data => {
        this.stockList = data; // Actualiza la lista de stock con todos los datos
      },
      error => {
        console.error('Error loading stock', error);
        this.toastr.error('No se pudo cargar la lista de productos.'); // Notificación de error
      }
    );
  }
  // Método para abrir el modal de creación
  openCreateForm(): void {
    if (this.createModal) {
      this.currentProduct = {} as Stock; // Resetea el formulario
      this.isEdit = false;
      this.modalService.open(this.createModal, { ariaLabelledBy: 'modal-basic-title' });  
    }
  }

  // Método para abrir el modal de edición
  openEditForm(stock: Stock): void {
    if (this.editModal) {
      this.currentProduct = { ...stock }; // Carga los datos en el formulario
      this.isEdit = true;
      this.modalService.open(this.editModal, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  // Manejo del cambio de archivo
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
  
  // Método para crear un producto
  createProduct(): void {
    const productData: any = {};
  
    // Llenar productData con los valores de currentProduct
    Object.keys(this.currentProduct).forEach(key => {
      if (key !== 'foto') { // Ignorar la foto
        productData[key] = this.currentProduct[key as keyof Stock];
      }
    });
  
    this.stockService.createStock(productData).subscribe(
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
  
  // Método para actualizar un producto
  updateProduct(): void {
    const productData: any = {};
  
    // Llenar productData con los valores de currentProduct
    Object.keys(this.currentProduct).forEach(key => {
      if (key !== 'foto') { // Ignorar la foto
        productData[key] = this.currentProduct[key as keyof Stock];
      }
    });
  
    this.stockService.updateStock(this.currentProduct.id, productData).subscribe(
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

  // Método para eliminar un producto
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
    this.stockService.getStockList().subscribe(
      (data) => {
        this.stockList = data.map(stock => ({
          ...stock,
          categoriaNombre: this.getCategoriaNombre(stock.categoria_id) 
        }));
      },
      (error) => {
        console.error('Error loading stock', error);
        this.toastr.error('No se pudo cargar la lista de productos.');
      }
    );
  }

  // Método para manejar el cambio en los radio buttons
  onEstadoChange(estado: string) {
    this.selectedEstado = estado;
    this.fetchStockList();
  }

  // Método para cargar las categorías
  loadCategorias(): void {
    this.categoriaService.getCategoriaLista().subscribe(data => {
      this.categorias = data;
      this.categoriasCargadas = true; // Marca las categorías como cargadas
      console.log('Categorías cargadas:', this.categorias);
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
  
    const tableColumn = ['ID', 'Cédula', 'Nombre', 'Apellido', 'Categoría', 'Stock Inicial', 'Ubicación', 'Fecha'];
    const tableRows = this.stockList.map(stock => [
      stock.id,
      stock.cedula,
      stock.nombre,
      stock.apellido,
      this.getCategoriaNombre(stock.categoria_id),
      stock.stock_inicial,
      stock.ubicacion,
      stock.fecha,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save('stock-list.pdf');
  }

 
}

import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../Service/shoe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  buscarZapatos: string = '';

  constructor(private shoeService: ShoeService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.shoeService.getShoes().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        image: `data:image/jpeg;base64,${product.fotoBase64}` // Usar el campo fotoBase64
      }));
      this.filteredProducts = this.products; // Inicialmente, mostrar todos los productos
    });
  }

  onSearch() {
    const searchTerm = this.buscarZapatos.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm) ||
      product.precio.toString().includes(searchTerm)
    );
  }
}

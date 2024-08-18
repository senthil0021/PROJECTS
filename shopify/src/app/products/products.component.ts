// src/app/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filter: string = 'all';

  constructor(private productService: AuthService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  onFilterChange(event: any): void {
    this.filter = event.target.value;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'all':
        this.filteredProducts = this.products;
        break;
      case 'price':
        this.filteredProducts = this.products.sort((a, b) => a.price - b.price);
        break;
      case 'category':
        this.filteredProducts = this.products.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'rating':
        this.filteredProducts = this.products.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'brand':
        this.filteredProducts = this.products.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      
      default:
        this.filteredProducts = this.products;
        break;
    }
  }}
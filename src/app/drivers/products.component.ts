import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products! : Array<Product> ;
  errorMessage! : string;
  searchFormGroup!: FormGroup;


  constructor(private productService : ProductService,  private http : HttpClient, private formBuilder: FormBuilder) {
    this.products = [];
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: ['']
    });
    this.handleGetAllDrivers();
  }
  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  handleDeleteProduct(product: Product) {
    let confirmation = confirm("Are you sure you want to delete this product?");
    if (!confirmation) return;
    if (!product.userId) return;
    this.productService.deleteProduct(product.userId).subscribe({
      next: (data) => {
        this.handleGetAllDrivers()
        console.log(data);
      },
      error: (error) => {
        console.log(error)
        this.errorMessage = error;
      }
    });
  }
  handleAddProduct() {
    let name = prompt("Enter product name");
    let email = prompt("Enter product email");
    let password = prompt("Enter product password");

    if (!name || !email || !password) {
      alert("Please enter all fields");
      return;
    }
    let product: Product = {
      name: name,
      email: email,
      password: password,
      role: "DRIVER"
    };


    this.productService.addProduct(product).subscribe({
      next: (data) => {
        this.handleGetAllDrivers();
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  handleBackHome() {
    this.productService.backHome().subscribe({
      next: (data) => {
        window.location.href = '/';
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  handleToggleDriverStatus(product: Product) {
    if (!product.userId) return;
    this.productService.toggleDriverStatus(product.userId).subscribe({
      next: (data) => {
        this.handleGetAllDrivers();
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
  handleGetAllDrivers() {
    this.productService.getAllDrivers().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  handleSearchDriver() {

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  driverForm!: FormGroup;
  showAddDriverForm = false;
  isSubmitting = false;
  errorMessage: string | null = null;

  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  sortBy: string = 'id';
  sortDirection: string = 'asc';

  searchFormGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initDriverForm();
    this.initSearchForm();
    this.handleGetAllDrivers();
  }

  initDriverForm(): void {
    this.driverForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  initSearchForm(): void {
    this.searchFormGroup = this.fb.group({
      keyword: ['']
    });
  }

  get name() { return this.driverForm.get('name'); }
  get email() { return this.driverForm.get('email'); }
  get password() { return this.driverForm.get('password'); }

  toggleAddDriverForm(): void {
    this.showAddDriverForm = !this.showAddDriverForm;
    if (!this.showAddDriverForm) {
      this.driverForm.reset();
      this.errorMessage = null;
    }
  }

  resetDriverForm(): void {
    this.driverForm.reset();
    this.errorMessage = null;
  }

  handleAddProduct(): void {
    if (this.driverForm.invalid) return;

    this.isSubmitting = true;
    const newDriver: Product = this.driverForm.value;

    this.productService.addProduct(newDriver).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toggleAddDriverForm();
        this.handleGetAllDrivers();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to add driver. Please try again.';
        console.error(err);
      }
    });
  }

  handleGetAllDrivers(): void {
    this.productService.getAllDrivers(this.currentPage, this.pageSize, this.sortBy, this.sortDirection)
      .subscribe({
        next: (response) => {
          this.products = response.content;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.pages = [...Array(this.totalPages).keys()];
        },
        error: (err) => {
          this.errorMessage = 'Failed to load drivers.';
          console.error(err);
        }
      });
  }

  handleSearchDriver(): void {
    const keyword = this.searchFormGroup.get('keyword')?.value.trim();
    if (!keyword) return this.handleGetAllDrivers();

    this.productService.searchDriver(keyword).subscribe({
      next: (data) => {
        this.products = data;
        this.totalItems = data.length;
        this.totalPages = 1;
        this.pages = [0];
      },
      error: (err) => {
        this.errorMessage = 'Search failed.';
        console.error(err);
      }
    });
  }

  handleSearchOnKeyup(): void {
    const keyword = this.searchFormGroup.get('keyword')?.value?.trim();

    if (!keyword) {
      // If search is empty, load all drivers
      this.currentPage = 0; // Reset to first page
      this.handleGetAllDrivers();
      return;
    }

    // Perform real-time search
    this.productService.searchDriver(keyword).subscribe({
      next: (data) => {
        this.products = data;
        this.totalItems = data.length;
        this.totalPages = 1;
        this.pages = [0];
        this.currentPage = 0;
      },
      error: (err) => {
        this.errorMessage = 'Search failed. Please try again.';
        console.error(err);
      }
    });
  }

  changePageSize(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 0;
    this.handleGetAllDrivers();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.handleGetAllDrivers();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.handleGetAllDrivers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.handleGetAllDrivers();
    }
  }

  changeSorting(field: string): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.handleGetAllDrivers();
  }

  handleToggleDriverStatus(driver: Product): void {
    if (!driver.userId) return;
    this.productService.toggleDriverStatus(driver.userId).subscribe({
      next: () => this.handleGetAllDrivers(),
      error: (err) => console.error('Error toggling status:', err)
    });
  }

  handleDeleteProduct(driver: Product): void {
    if (!driver.userId) return;
    if (confirm(`Are you sure you want to delete ${driver.name}?`)) {
      this.productService.deleteProduct(driver.userId).subscribe({
        next: () => this.handleGetAllDrivers(),
        error: (err) => console.error('Error deleting driver:', err)
      });
    }
  }

  handleBackHome(): void {
    this.productService.backHome().subscribe();
  }


  protected readonly Math = Math;
}

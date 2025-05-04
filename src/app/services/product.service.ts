  import { Injectable } from '@angular/core';
  import {catchError, map, Observable, of, throwError } from 'rxjs';
  import {Product} from '../model/product.model';
  import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private products! : Array<Product> ;

    constructor(private http : HttpClient) {
      this.products = [

      ];
    }
    public getAllProducts(): Observable<Product[]> {
      // Return the Observable directly without subscribing
      return this.http.get<any>('http://localhost:8080/api/user')
        .pipe(
          map(response => {
            // Assuming the API returns an object with a products property
            return response.users || response;
          }),
          catchError(error => {
            console.error('Error fetching products:', error);
            return throwError(() => error);
          })
        );
    }
    public deleteProduct(id :number): Observable<boolean> {
     return this.http.delete<any>(`http://localhost:8080/api/admin/drivers/${id}`)
        .pipe(
          map(response => {
            console.log('Product deleted:', response);
            // Assuming the API returns a success message or status
            return response.success || true;
          }),
          catchError(error => {
            console.error('Error deleting product:', error);
            return throwError(() => error);
          })
        );
    }
    public addProduct(product : Product): Observable<Product> {

      console.log('Adding product:', product);

      return this.http.post<any>('http://localhost:8080/api/admin/drivers', product)
        .pipe(
          map(response => {
            console.log('Product created:', response);
            // Assuming the API returns the created user object
            return response.user || response;
          }),
          catchError(error => {
            console.error('Error creating user:', error);
            return throwError(() => error);
          })
        );
    }
    public toggleDriverStatus(id : number): Observable<Product> {
      return this.http.put<any>(`http://localhost:8080/api/admin/drivers/${id}/disponibility`, {})
        .pipe(
          map(response => {
            console.log('Driver status toggled:', response);
            // Assuming the API returns the updated user object
            return response.user || response;
          }),
          catchError(error => {
            console.error('Error toggling driver status:', error);
            return throwError(() => error);
          })
        );
    }
    public getAllDrivers(): Observable<Product[]> {
      return this.http.get<any>("http://localhost:8080/api/drivers")
        .pipe(
          map(response => {
            return response.drivers || response;
          }),
          catchError(error => {
            console.error('Error fetching drivers:', error);
            return throwError(() => error);
          })
        );
    }
    public backHome() : Observable<boolean> {
      return of(true);
    }
    public searchDriver(keyword : string) : Observable<Product[]> {
      return this.http.get<any>(`http://localhost:8080/api/search?name=${keyword}`)
        .pipe(
          map(response => {
            return response.drivers || response;
          }),
          catchError(error => {
            console.error('Error searching drivers:', error);
            return throwError(() => error);
          })
        );
    }

  }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products/search";
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/findByCategoryId?id=${theCategoryId}`

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string|null): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


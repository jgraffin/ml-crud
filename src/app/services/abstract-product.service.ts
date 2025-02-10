import { Observable } from 'rxjs';

export abstract class AbstractProductService {
  abstract getAllProducts(): Observable<Product[]>;
  abstract getProductById(id: string): Observable<Product>;
  abstract createProduct(product: Product): Observable<Product>;
  abstract updateProduct(id: number, product: Product): Observable<Product>;
  abstract deleteProduct(id: number): Observable<void>;
}

export interface Product {
  id: string;
  thumb: string;
  name: string;
  price: number;
  color: string;
  quantity: number;
  description?: string;
  characteristics?: {
    memory: string;
    screen: string;
    batteryDuration: string;
    resolution: string;
    touchableScreen: boolean;
  };
}

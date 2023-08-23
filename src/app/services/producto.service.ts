import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ICategoria } from "../interfaces/ICategoria";
import { IProducto } from "../interfaces/IProducto";
import { ICliente } from "../interfaces/ICliente";


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl: string;
  private token?: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Producto';

  }

 
  getProducto(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.apiUrl}`);
  }

  createProducto(producto: IProducto): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }
  
  
  deleteProducto(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  
}

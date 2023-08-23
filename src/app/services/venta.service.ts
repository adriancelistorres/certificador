import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ICategoria } from "../interfaces/ICategoria";
import { IProducto } from "../interfaces/IProducto";
import { IUsuario } from "../interfaces/IUsuario";
import { IVenta } from "../interfaces/IVentas";


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl: string;
  private token?: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Venta';

  }

 
  getVenta(): Observable<IVenta[]> {
    return this.http.get<IVenta[]>(`${this.apiUrl}`);
  }
  createVenta(usuario: IVenta): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
  
  
  deleteVenta(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  
}

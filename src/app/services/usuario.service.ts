import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ICategoria } from "../interfaces/ICategoria";
import { IProducto } from "../interfaces/IProducto";
import { IUsuario } from "../interfaces/IUsuario";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string;
  private token?: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Usuario';

  }

 
  getUsuario(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.apiUrl}`);
  }

  createUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
  
  
  deleteUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

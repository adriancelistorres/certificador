import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ICategoria } from "../interfaces/ICategoria";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string;
  private token?: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Categoria';

  }

 
  getCategorias(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(`${this.apiUrl}`);
  }
  createCategoria(categoria: ICategoria): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria);
  }

  updateCategoria(id: number, categoria: ICategoria): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, categoria);
  }

  deleteCategoria(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  
}

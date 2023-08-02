import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IIncentivoPagoRequest } from "../interfaces/IIncentivoPagoReques";
import { IIncentivoPago } from "../interfaces/IIncentivosPago";
import { IIncentivoVista } from "../interfaces/IIncentivoVista";

@Injectable({
  providedIn: 'root'
})
export class IncentivosService {

  private apiUrl: string;
  private token?: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Incentivos/';

  }

  // login(dni: string): Observable<any> {
  //   const request: IIncentivoPagoRequest = { Dni: dni };
  //   return this.http.post<any>(this.apiUrl + 'login', request).pipe(
  //     tap(response => {
  //       this.token = response.result;
  //       console.log(this.token)
  //     })
  //   );
  // }
  login(usuario: string, clave: string): Observable<any> {
    const request:IIncentivoPagoRequest = { USUARIO: usuario, CLAVE: clave }; // Cambiar según el formato de tu DTO de usuario

    return this.http.post<any>(this.apiUrl + 'validateUser', request).pipe(
      tap(response => {
        const token = response.token;
        // console.log('Token JWT:', token);
        localStorage.setItem('token', token); // Establecer el token en el localStorage
      })
    );
  }

  getIncentivosConfirmationFalse(dni: any): Observable<IIncentivoVista[]> {
    // Añadir el token en la cabecera "Authorization" de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    // console.log('tokken',this.token)
    const request: IIncentivoPagoRequest = { Dni: dni };
    return this.http.post<IIncentivoVista[]>(this.apiUrl + 'GeneralWithDNIConfirmationFalse', request, { headers });
  }



  UpdateIncentivoswithDNI(dni: any, id: any): Observable<IIncentivoVista[]> {
    // Añadir el token en la cabecera "Authorization" de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log('tokkenupdate',this.token)
    const request: IIncentivoPagoRequest = { Dni: dni, Id: id };
    return this.http.post<IIncentivoVista[]>(this.apiUrl + 'UpdateWithDNI', request, { headers });
  }
}

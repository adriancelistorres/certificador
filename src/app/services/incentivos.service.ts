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

  login(dni: string): Observable<any> {
    const request: IIncentivoPagoRequest = { Dni: dni };
    return this.http.post<any>(this.apiUrl + 'login', request).pipe(
      tap(response => {
        this.token = response.result;
        console.log(this.token)
      })
    );
  }

  getIncentivosConfirmationFalse(dni: any): Observable<IIncentivoVista[]> {
    // Añadir el token en la cabecera "Authorization" de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const request: IIncentivoPagoRequest = { Dni: dni };
    return this.http.post<IIncentivoVista[]>(this.apiUrl + 'GeneralWithDNIConfirmationFalse', request, { headers });
  }



  UpdateIncentivoswithDNI(dni: any, id: any): Observable<IIncentivoVista[]> {
    // Añadir el token en la cabecera "Authorization" de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const request: IIncentivoPagoRequest = { Dni: dni, Id: id };
    return this.http.post<IIncentivoVista[]>(this.apiUrl + 'UpdateWithDNI', request, { headers });
  }
}

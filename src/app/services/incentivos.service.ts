import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IIncentivoPagoRequest } from "../interfaces/IIncentivoPagoReques";
import { IIncentivoPago } from "../interfaces/IIncentivosPago";
import { IIncentivoVista } from "../interfaces/IIncentivoVista";

@Injectable({
  providedIn: 'root'
})
export class IncentivosService {

  private apiUrl: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Incentivos/';

  }

  getIncentivosConfirmationFalse(dni: any): Observable<IIncentivoVista[]> {
    const request: IIncentivoPagoRequest = { Dni: dni };
    return this.http.post<IIncentivoVista[]>(this.apiUrl + 'GeneralWithDNIConfirmationFalse', request);

  }
  UpdateIncentivoswithDNI(dni: any,id:any): Observable<IIncentivoVista[]> {
    const request: IIncentivoPagoRequest = { Dni: dni,Id:id };
    return this.http.post<IIncentivoVista[]>(this.apiUrl + 'UpdateWithDNI', request);

  }
}

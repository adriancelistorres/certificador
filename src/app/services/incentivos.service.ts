import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IIncentivoPagoRequest } from "../interfaces/IIncentivoPagoReques";
import { IIncentivoPago } from "../interfaces/IIncentivosPago";

@Injectable({
  providedIn: 'root'
})
export class IncentivosService {

  private apiUrl: string;


  constructor(private http: HttpClient) {

    this.apiUrl = environment.endpoint + 'api/Incentivos/';

  }

  getIncentivosConfirmationFalse(dni: any): Observable<IIncentivoPago[]> {
    const request: IIncentivoPagoRequest = { Dni: dni };
    return this.http.post<IIncentivoPago[]>(this.apiUrl + 'GeneralWithDNIConfirmationFalse', request);

  }
  UpdateIncentivoswithDNI(dni: any): Observable<IIncentivoPago[]> {
    const request: IIncentivoPagoRequest = { Dni: dni };
    return this.http.post<IIncentivoPago[]>(this.apiUrl + 'UpdateWithDNI', request);

  }
}

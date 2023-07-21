export interface IIncentivoVista {
  id: number;
  periodoIncentivo: string;
  dniPromotor: string;
  nombreCompleto: string;
  idIncentivo: number;
  nombreIncentivo: string;
  empresa: string;
  monto: number;
  estadoIncentivo: string;
  aceptado?: boolean; // Nueva propiedad para controlar si se ha aceptado el incentivo

}

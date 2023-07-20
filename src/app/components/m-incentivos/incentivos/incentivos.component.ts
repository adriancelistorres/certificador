import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IIncentivoPagoRequest } from 'src/app/interfaces/IIncentivoPagoReques';
import { IIncentivoPago } from 'src/app/interfaces/IIncentivosPago';
import { IncentivosService } from 'src/app/services/incentivos.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-incentivos',
  templateUrl: './incentivos.component.html',
  styleUrls: ['./incentivos.component.css']
})
export class IncentivosComponent {
  dni: any;
  listIncentivos: IIncentivoPago[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _incentivosServices: IncentivosService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.dni = params['dni'];
      this.getIncentivos();
    });
  }

  getIncentivos(): void {
    this._incentivosServices.getIncentivosConfirmationFalse(this.dni).subscribe(
      (data: IIncentivoPago[]) => {
        if (data.length === 0) {
          this.toastr.warning('No se encontraron incentivos a su nombre.', 'SIN INCENTIVOS');
          // Redirigir al login de incentivos
          this._router.navigate(['/incentivosLogin']);
        } else {
          this.listIncentivos = data;
          console.log('DATA', this.listIncentivos);
          console.log('DATA', data);
        }
      },
      (error) => {
        console.error(error);
        if (error.status === 400 && error.error && error.error.errors) {
          console.log('Errores de validación:', error.error.errors);
        } else {
          console.log('Error:', error.message);
        }
      }
    );
  }

  // Función que se ejecuta cuando se presiona el botón "Aceptar" para un incentivo
  onAceptar(incentivo: IIncentivoPago): void {
    Swal.fire({
      title: '¡ADVERTENCIA!',
      text: 'Al aceptar este incentivo, asume la total responsabilidad. Cualquier reclamo futuro será ignorado y no nos haremos responsables por las consecuencias.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar bajo mi responsabilidad',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        incentivo.ConfirmacionEntrega = true;
        incentivo.aceptado = true; // Establecer el incentivo como aceptado
        Swal.fire({
          title: '¡Aceptado!',
          text: 'Has aceptado el incentivo bajo tu responsabilidad.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  }



  // Función que verifica si todos los incentivos han sido aceptados
  todosAceptados(): boolean {
    return this.listIncentivos.every(incentivo => incentivo.ConfirmacionEntrega);
  }

  updateIncentivos(): void {
    if (!this.todosAceptados()) {
      this.toastr.warning('Debe aceptar la entrega de los incentivos.', 'PRESIONA EN EL CHECK');
      return;
    }

    this._incentivosServices.UpdateIncentivoswithDNI(this.dni).subscribe(
      (data: IIncentivoPago[]) => {
        this.toastr.success('Los incentivos se le han entregado correctamente.', 'Éxito');
        this._router.navigate(['/incentivosLogin']); // Ajusta la ruta correcta hacia el login
      },
      (error) => {
        console.error('Error al actualizar incentivos:', error);
      }
    );
  }
}

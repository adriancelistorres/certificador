import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IIncentivoPagoRequest } from 'src/app/interfaces/IIncentivoPagoReques';
import { IIncentivoPago } from 'src/app/interfaces/IIncentivosPago';
import { IncentivosService } from 'src/app/services/incentivos.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { IIncentivoVista } from 'src/app/interfaces/IIncentivoVista';
import { LoginIncentivosComponent } from '../login-incentivos/login-incentivos.component';
import { AuthRedirectService } from 'src/app/auth/auth-redirect.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-incentivos',
  templateUrl: './incentivos.component.html',
  styleUrls: ['./incentivos.component.css'],
})
export class IncentivosComponent {
  dni: any;
  listIncentivos: IIncentivoVista[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _incentivosServices: IncentivosService,
    private toastr: ToastrService,
    private _router: Router,
    private cookieService: CookieService // Inyecta el CookieService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.dni = params['dni'];

      this._incentivosServices.login(this.dni).subscribe(
        (response) => {
          console.log('Token JWT:', response.result);
          this.checkTokenExpiration();

          this.getIncentivos();
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.toastr.error(
            'Hubo un problema al iniciar sesión. Por favor, inténtalo nuevamente.',
            'Error de Inicio de Sesión'
          );
          this._router.navigate(['/incentivosLogin']);
        }
      );
    });
  }

  getIncentivos(): void {
    this._incentivosServices.getIncentivosConfirmationFalse(this.dni).subscribe(
      (data: IIncentivoVista[]) => {
        if (data.length === 0) {
          //this.toastr.warning('No se encontraron incentivos a su nombre.', 'SIN INCENTIVOS');
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

  onAceptar(incentivo: IIncentivoVista): void {
    Swal.fire({
      title: '¿Estas seguro de confirmar la entrega?',
      text: 'Al aceptar estas confirmando que se te fue entregado el premio de tus incentivos y asumes la total responsabilidad',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar bajo mi responsabilidad',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._incentivosServices
          .UpdateIncentivoswithDNI(incentivo.dniPromotor, incentivo.id)
          .subscribe(
            () => {
              incentivo.aceptado = true; // Establecer el incentivo como aceptado
              Swal.fire({
                title: '¡Aceptado!',
                text: 'Has aceptado el incentivo bajo tu responsabilidad.',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
              });
              this.updateIncentivosList();
            },
            (error) => {
              console.error(error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un error al aceptar el incentivo. Por favor, intenta nuevamente.',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
              });
            }
          );
      }
    });
  }

  // Método para actualizar la lista de incentivos después de aceptar
  updateIncentivosList(): void {
    this._incentivosServices.getIncentivosConfirmationFalse(this.dni).subscribe(
      (data: IIncentivoVista[]) => {
        if (data.length === 0) {
          // Si la lista está vacía, mostrar mensaje y redirigir al login de incentivos
          this.toastr.warning(
            'Ya no tienes incentivos cargados.',
            'SIN INCENTIVOS'
          );
          this._router.navigate(['/incentivosLogin']);
        } else {
          this.listIncentivos = data;
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
  checkTokenExpiration(): void {
    const token = this.cookieService.get('token'); // Obtener el token del cookie
    if (!token) {
      // No hay token, redirigir a la página de inicio de sesión
      this._router.navigate(['/incentivosLogin']);
      return;
    }

    // Obtener la fecha de expiración del token del payload (si está presente)
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log('PAYLOAD HOUR', payload);
      const expirationTime = payload.exp * 1000; // Multiplica por 1000 para convertir a milisegundos

      // Calcular el tiempo restante hasta la expiración del token
      const now = new Date().getTime();
      const timeRemaining = expirationTime - now;

      if (timeRemaining <= 0) {
        // Token expirado, redirigir a la página de inicio de sesión y borrar la cookie
        this.cookieService.delete('token');
        this._router.navigate(['/incentivosLogin']);
        return;
      }

      // Programar un redireccionamiento al tiempo de expiración del token
      setTimeout(() => {
        // Token expirado, borrar la cookie y redirigir al inicio de sesión
        this.cookieService.delete('token');
        this.showSessionExpiredAlert();

        this._router.navigate(['/incentivosLogin']);
      }, timeRemaining);
    }
  }
  showSessionExpiredAlert(): void {
    Swal.fire({
      title: '¡Sesión expirada!',
      text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      icon: 'warning',
    }).then((result) => {
      // Redirigir al usuario a la página de inicio de sesión
      this._router.navigate(['/incentivosLogin']);
    });
  }

  cerrarSesion(): void {
    // Borrar la cookie
    this.cookieService.delete('token');

    // Redirigir al login
    this._router.navigate(['/incentivosLogin']);
  }
}

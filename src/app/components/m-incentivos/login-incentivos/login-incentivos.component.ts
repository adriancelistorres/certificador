import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IIncentivoPago } from 'src/app/interfaces/IIncentivosPago';
import { IncentivosService } from 'src/app/services/incentivos.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthRedirectService } from 'src/app/auth/auth-redirect.service';
import { CookieService } from 'node_modules/ngx-cookie-service';


@Component({
  selector: 'app-login-incentivos',
  templateUrl: './login-incentivos.component.html',
  styleUrls: ['./login-incentivos.component.css']
})
export class LoginIncentivosComponent implements OnInit {
  listIncentivos: IIncentivoPago[] = [];
  dni = new FormControl('', [Validators?.pattern('[0-9]*')]);

  constructor(
    private _incentivosServices: IncentivosService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Verificar si el token ha expirado al cargar el componente
    localStorage.removeItem('token'); // Borra el token al cargar la página del inicio de sesión
  }

  login(event: Event): void {
    event.preventDefault();

    if (this.dni.invalid || this.dni.value === null) {
      return;
    }

    const dniValue = this.dni.value;
    this._incentivosServices.login(dniValue).subscribe(
      response => {
        console.log('Token JWT:', response.result);
        localStorage.setItem('token', response.result); // Establecer el token en el localStorage

        this._router.navigate(['/incentivos'], { queryParams: { dni: dniValue } });

      },
      error => {
        console.error('Error al iniciar sesión:', error);

        if (error && error.error === "No tiene registros") {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'No tiene Incentivos cargados a su nombre'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Hubo un error al iniciar sesión. Por favor, intenta nuevamente.'
          });
        }
      }
    );
  }

  onlyNumbers(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      event.preventDefault();
    }
  }



}

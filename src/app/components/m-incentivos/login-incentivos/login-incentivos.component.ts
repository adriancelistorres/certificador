import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IIncentivoPago } from 'src/app/interfaces/IIncentivosPago';
import { IncentivosService } from 'src/app/services/incentivos.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login-incentivos',
  templateUrl: './login-incentivos.component.html',
  styleUrls: ['./login-incentivos.component.css']
})
export class LoginIncentivosComponent {
  listIncentivos: IIncentivoPago[] = [];
  dni=new FormControl('',[Validators?.pattern('[0-9]*')]);

  constructor(
    private _incentivosServices: IncentivosService,
    private _router: Router


  ){}

  // login(event:Event): void {
  //   event?.preventDefault();
  //   console.log(this.dni.value)
  //   this._router.navigate(['/incentivos'], { queryParams: { dni: this.dni.value } });
  // }
  login(event: Event): void {
    event.preventDefault();

    // Validar el campo DNI
    if (this.dni.invalid || this.dni.value === null) {
      return;
    }


    // Obtener el valor del DNI ingresado
    const dniValue = this.dni.value;

    // Llamar al método de logeo del servicio IncentivosService para obtener el token
    this._incentivosServices.login(dniValue).subscribe(
      response => {
        // El token se ha almacenado en el servicio IncentivosService.
        console.log('Token JWT:', response.result);

        // Redirigir a la página de incentivos con el DNI como parámetro en la URL
        this._router.navigate(['/incentivos'], { queryParams: { dni: dniValue } });
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        // Aquí puedes mostrar un mensaje de error al usuario si ocurre algún problema con el logeo.
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

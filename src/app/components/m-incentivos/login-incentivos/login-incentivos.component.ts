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

  login(event:Event): void {
    event?.preventDefault();
    console.log(this.dni.value)
    this._router.navigate(['/incentivos'], { queryParams: { dni: this.dni.value } });
  }
onlyNumbers(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      event.preventDefault();
    }
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectService {
  private isLoggedInFlag = false;
  private isNavigatedAwayFlag = false;
  private isNavigatedToIncentivosFlag = false;

  constructor() { }

  login() {
    // Aquí implementa tu lógica de inicio de sesión.
    this.isLoggedInFlag = true;
    this.isNavigatedAwayFlag = false; // Restablecer la bandera al iniciar sesión correctamente.
  }

  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  logout() {
    // Aquí implementa tu lógica de cierre de sesión.
    this.isLoggedInFlag = false;
    this.isNavigatedAwayFlag = false;
  }

  setNavigatedAwayFlag() {
    this.isNavigatedAwayFlag = true;
  }

  isNavigatedAway(): boolean {
    return this.isNavigatedAwayFlag;
  }

  setNavigatedToIncentivosFlag() {
    this.isNavigatedToIncentivosFlag = true;
  }

  isNavigatedToIncentivos(): boolean {
    return this.isNavigatedToIncentivosFlag;
  }
  resetNavigatedToIncentivosFlag() {
    this.isNavigatedToIncentivosFlag = false;
  }
}

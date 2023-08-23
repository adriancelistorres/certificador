import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/m-certificador/categoria/categoria.component';
import { ClienteComponent } from './components/m-certificador/cliente/cliente.component';
import { ProductoComponent } from './components/m-certificador/producto/producto.component';
import { UsuarioComponent } from './components/m-certificador/usuario/usuario.component';
import { VentaComponent } from './components/m-certificador/venta/venta.component';

const routes: Routes = [
  { path: 'categoriaGet', component: CategoriaComponent },
  { path: 'clienteGet', component: ClienteComponent },
  { path: 'productoGet', component: ProductoComponent },
  { path: 'usuariosGet', component: UsuarioComponent },
  { path: 'ventasGet', component: VentaComponent },

  { path: '', redirectTo: '/incentivosLogin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

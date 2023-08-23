import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/ICliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent {
  clientes: ICliente[] = [];
  nuevoCliente: ICliente; // No es necesario inicializarla aquí
  showEditModal: boolean = false;

  constructor(private clienteService: ClienteService) {
    this.nuevoCliente = {
      idCliente: 0,
      nombre: '',
      apellidos: '',
      correo: '',
      clave: '',
      activo: 1,
      fechaRegistro: new Date().toISOString(),
    };
  }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.clienteService.getCliente().subscribe((clientes) => {
      this.clientes = clientes;
      console.log(this.clientes);
    });
  }

  crearCliente(): void {
    this.clienteService.createCliente(this.nuevoCliente).subscribe(
      (respuesta) => {
        console.log('Categoría creada exitosamente', respuesta);
        this.nuevoCliente = {
          idCliente: 0,
          nombre: '',
          apellidos: '',
          correo: '',
          clave: '',
          activo: 1,
          fechaRegistro: new Date().toISOString(),
        };
        this.getCliente();
      },
      (error) => {
        console.error('Error al crear la categoría', error);
        this.getCliente();
      }
    );
  }

  eliminarCliente(idcliente: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.clienteService.deleteCliente(idcliente).subscribe(
        (respuesta) => {
          console.log('Categoría eliminada exitosamente', respuesta);
          this.getCliente();
        },
        (error) => {
          console.error('Error al eliminar la categoría', error);
          this.getCliente();
        }
      );
    }
  }
}

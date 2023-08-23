import { Component } from '@angular/core';
import { IVenta } from 'src/app/interfaces/IVentas';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  ventas: IVenta[] = [];
  nuevaVenta: IVenta; // No es necesario inicializarla aquí
  showEditModal: boolean = false;
  constructor(private ventaService: VentaService) {
    this.nuevaVenta = {
      idCliente: 1,
      totalProducto: 0,
      total: 0,
      contacto: '',
      idLocalidad: 'LCX',
      telefono: '',
      direccion: '',
      idTransaccion: '2GN74657DM958390W',
      fechaVenta: new Date().toISOString(),
    };
  }

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas(): void {
    this.ventaService.getVenta().subscribe((ventas) => {
      this.ventas = ventas;
      console.log(this.ventas);
    });
  }


  crearVenta(): void {
    this.ventaService.createVenta(this.nuevaVenta).subscribe(
      (respuesta) => {
        console.log('Categoría creada exitosamente', respuesta);
        this.nuevaVenta = {
          idCliente: 0,
          totalProducto: 0,
          total: 0,
          contacto: '',
          idLocalidad: '',
          telefono: '',
          direccion: '',
          idTransaccion: '',
          fechaVenta: new Date().toISOString(),
        };
        this.getVentas();
      },
      (error) => {
        console.error('Error al crear la categoría', error);
        this.getVentas();
      }
    );
  }

  eliminarVenta(idVenta: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.ventaService.deleteVenta(idVenta).subscribe(
        (respuesta) => {
          console.log('Categoría eliminada exitosamente', respuesta);
          this.getVentas();
        },
        (error) => {
          console.error('Error al eliminar la categoría', error);
          this.getVentas();
        }
      );
    }
  }
}

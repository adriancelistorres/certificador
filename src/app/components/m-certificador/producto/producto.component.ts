import { Component } from '@angular/core';
import { IProducto } from 'src/app/interfaces/IProducto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent {
  productos: IProducto[] = [];
  nuevoProducto: IProducto; // No es necesario inicializarla aquí
  showEditModal: boolean = false;
  constructor(private prductoService: ProductoService) {
    this.nuevoProducto = {
      idProducto: 0,
      nombre: '',
      descripcion: '',
      idCategoria: 0,
      precio: 0,
      rutaImagen: 'C:\Imagenes',
      nombreImagen: 'Imagenguardada.jpg',
      activo: 1,
      fechaRegistro: new Date().toISOString(),
    };
  }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(): void {
    this.prductoService.getProducto().subscribe((productos) => {
      this.productos = productos;
      console.log(this.productos);
    });
  }

  crearProducto(): void {
    this.prductoService.createProducto(this.nuevoProducto).subscribe(
      (respuesta) => {
        console.log('Categoría creada exitosamente', respuesta);
        this.nuevoProducto = {
          idProducto: 0,
          nombre: '',
          descripcion: '',
          idCategoria: 0,
          precio: 0,
          rutaImagen: 'c//images//',
          nombreImagen: 'FOTOPROD',
          activo: 1,
          fechaRegistro: new Date().toISOString(),
        };
        this.getProducto();
      },
      (error) => {
        console.error('Error al crear la categoría', error);
        this.getProducto();
      }
    );
  }

  eliminarProducto(idproducto: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.prductoService.deleteProducto(idproducto).subscribe(
        (respuesta) => {
          console.log('Categoría eliminada exitosamente', respuesta);
          this.getProducto();
        },
        (error) => {
          console.error('Error al eliminar la categoría', error);
          this.getProducto();
        }
      );
    }
  }

}

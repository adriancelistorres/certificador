import { Component } from '@angular/core';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  categorias: ICategoria[] = [];
  nuevaCategoria: ICategoria; // No es necesario inicializarla aquí
  showEditModal: boolean = false;

  constructor(private categoriaService: CategoriaService) {
    this.nuevaCategoria = {
      idCategoria: 0,
      descripcion: '',
      activo: 1,
      fechaRegistro: new Date().toISOString()
    };

  }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      console.log(this.categorias);
    });
  }
  crearCategoria(): void {
    this.categoriaService.createCategoria(this.nuevaCategoria).subscribe(
      (respuesta) => {
        console.log('Categoría creada exitosamente', respuesta);
        this.nuevaCategoria = {
          idCategoria: 0,
          descripcion: '',
          activo: 1,
          fechaRegistro: new Date().toISOString()
        };
        this.getCategorias();
      },
      (error) => {
        console.error('Error al crear la categoría', error);
        this.getCategorias();

      }
    );
  }



  eliminarCategoria(idCategoria: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(idCategoria).subscribe(
        (respuesta) => {
          console.log('Categoría eliminada exitosamente', respuesta);
          this.getCategorias();
        },
        (error) => {
          console.error('Error al eliminar la categoría', error);
          this.getCategorias();

        }
      );
    }
  }
  
}

import { Component } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  usuarios: IUsuario[] = [];
  nuevoUsuario: IUsuario; // No es necesario inicializarla aquí
  showEditModal: boolean = false;
  constructor(private usuarioService: UsuarioService) {
    this.nuevoUsuario = {
      idUsuario: 0,
      nombre: '',
      apellidos: '',
      correo: '',
      clave: '',
      activo: 1,
      fechaRegistro: new Date().toISOString(),
    };
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    this.usuarioService.getUsuario().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    });
  }

  crearUsuario(): void {
    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe(
      (respuesta) => {
        console.log('Categoría creada exitosamente', respuesta);
        this.nuevoUsuario = {
          idUsuario: 0,
          nombre: '',
          apellidos: '',
          correo: '',
          clave: '',
          activo: 1,
          fechaRegistro: new Date().toISOString(),
        };
        this.getUsuario();
      },
      (error) => {
        console.error('Error al crear la categoría', error);
        this.getUsuario();
      }
    );
  }

  eliminarUsuario(idUsuario: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.usuarioService.deleteUsuario(idUsuario).subscribe(
        (respuesta) => {
          console.log('Categoría eliminada exitosamente', respuesta);
          this.getUsuario();
        },
        (error) => {
          console.error('Error al eliminar la categoría', error);
          this.getUsuario();
        }
      );
    }
  }


}

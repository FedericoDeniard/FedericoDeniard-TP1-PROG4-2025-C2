import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  private mensaje: string = 'Hola Mundo!';
  private _nombre: string = '';

  public getMensaje(): string {
    return this.mensaje;
  }

  get nombre(): string {
    return this._nombre;
  }
  set nombre(nombre: string) {
    this._nombre = nombre;
  }

}

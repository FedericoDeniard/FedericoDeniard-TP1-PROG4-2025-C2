import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameCard } from '../../components/cards/game-card/game-card';
import { SupabaseService } from '../../services/supabase/supabase';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-home',
  imports: [FormsModule, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit {
  private supabase = inject(SupabaseService);
  protected session = signal<Session | null>(null)

  async ngOnInit() {
    this.session.set(await this.supabase.getSessionAsync());
  }
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

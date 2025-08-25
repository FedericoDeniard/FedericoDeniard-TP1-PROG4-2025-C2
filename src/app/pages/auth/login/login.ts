import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Button, RouterLink, ReactiveFormsModule, NgIconComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [provideIcons({ featherLoader })]
})
export class Login {
  private supabase = inject(SupabaseService)
  private router = inject(Router)
  protected errorMessage = ""
  protected loading = false

  email = new FormControl("")
  password = new FormControl("")

  async login(event: Event) {
    event.preventDefault()
    this.loading = true
    this.email.disable()
    this.password.disable()
    try {
      if (!this.email.value || !this.password.value) {
        this.errorMessage = "Por favor, complete todos los campos"
        return
      }
      const response = await this.supabase.signIn({
        email: this.email.value,
        password: this.password.value
      })
      if (response.error) {
        if (response.error.message === "Invalid login credentials") {
          this.errorMessage = "Credenciales inválidas"
          return
        }
        else {
          this.errorMessage = "Error al iniciar sesión"
        }
        return
      }
      if (response.data.session) {
        this.router.navigate(["/"])
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
      this.email.enable()
      this.password.enable()
    }
  }
}

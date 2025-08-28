import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Button, RouterLink, ReactiveFormsModule, NgIconComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [provideIcons({ featherLoader })]
})
export class Register {
  private supabase = inject(SupabaseService)
  private router = inject(Router)
  protected loading = false

  email = new FormControl("")
  password = new FormControl("")
  repeatedPassword = new FormControl("")
  username = new FormControl("")
  protected errorMessage = ""

  protected async register(event: Event) {
    event.preventDefault()
    this.errorMessage = ""
    this.loading = true
    this.disableForm()
    try {
      if (!this.email.value || !this.password.value || !this.username.value || !this.repeatedPassword.value) {
        this.errorMessage = "Por favor, complete todos los campos"
        return
      }
      if (this.username.value.length < 3) {
        this.errorMessage = "El nombre de usuario debe tener al menos 3 caracteres"
        return
      }

      if (this.password.value.length < 6) {
        this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
        return
      }

      if (this.password.value !== this.repeatedPassword.value) {
        this.errorMessage = "Las contraseñas no coinciden"
        return
      }

      const user: Parameters<SupabaseService['register']>[0] & { repeatedPassword: string } = {
        email: this.email.value,
        password: this.password.value,
        username: this.username.value,
        repeatedPassword: this.repeatedPassword.value!,
      }

      const response = await this.supabase.register(user)
      if (response.user !== null && response.session !== null) {
        this.router.navigate(['/'])
      }
    } catch (error) {
      console.error(error)
      this.errorMessage = "Error al registrarse"
    } finally {
      this.loading = false
      this.activateForm()
    }
  }

  private disableForm() {
    this.email.disable()
    this.password.disable()
    this.repeatedPassword.disable()
    this.username.disable()
  }

  private activateForm() {
    this.email.enable()
    this.password.enable()
    this.repeatedPassword.enable()
    this.username.enable()
  }
}

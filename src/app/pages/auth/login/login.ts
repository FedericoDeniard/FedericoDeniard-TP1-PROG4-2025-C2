import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })


  async login(event: Event) {
    event.preventDefault()
    this.errorMessage = ""

    console.log('Form status:', {
      emailValid: this.loginForm.get("email")?.valid,
      emailValue: this.loginForm.get("email")?.value,
      passwordValid: this.loginForm.get("password")?.valid,
      formValid: this.loginForm.valid
    })
    try {
      if (!this.loginForm.valid) {
        if (this.loginForm.get("email")?.errors?.["email"]) {
          this.errorMessage = "Por favor, ingrese un correo electrónico válido"
        } else if (this.loginForm.get("password")?.errors?.["minlength"]) {
          this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
        } else {
          this.errorMessage = "Por favor, complete todos los campos correctamente"
        }
        return
      }

      const isValid = this.loginForm.valid
      const email = this.loginForm.get("email")?.value
      const password = this.loginForm.get("password")?.value
      this.loginForm.disable()
      this.loading = true

      if (isValid && email && password) {
        const response = await this.supabase.signIn({
          email: email,
          password: password
        })

        if (response.error) {
          if (response.error.message === "Invalid login credentials") {
            this.errorMessage = "Credenciales inválidas"
          } else {
            this.errorMessage = "Error al iniciar sesión"
          }
          return
        }

        if (response.data.session) {
          this.router.navigate(["/"])
        }
      }
    } catch (error) {
      console.error(error)
      this.errorMessage = "Error inesperado al iniciar sesión"
    } finally {
      this.loading = false
      this.loginForm.enable()
    }
  }
}

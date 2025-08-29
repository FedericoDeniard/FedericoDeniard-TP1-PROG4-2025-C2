import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { getSupabaseErrors, SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';
import { AuthError } from '@supabase/supabase-js';

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
        console.log("asd", this.loginForm.errors)
        this.errorMessage = this.getFormErrors(this.loginForm.errors)
        console.log("hola", this.errorMessage)
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
          this.errorMessage = getSupabaseErrors(response.error)
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

  private getFormErrors(error: ValidationErrors | null): string {
    console.log(error)
    const controls = Object.keys(this.loginForm.controls)
    const errorMessages: Record<string, string> = {
      email: "Por favor, ingrese un correo electrónico válido",
      password: "La contraseña debe tener al menos 6 caracteres",
      required: "Campo requerido",
      passwordsNotMatch: "Las contraseñas no coinciden",
      invalid: "Campo inválido"
    }

    for (const controlName of controls) {
      const control = this.loginForm.get(controlName)
      if (control?.errors) {
        const firstErrorKey = Object.keys(control.errors)[0]
        return errorMessages[firstErrorKey] || "Error desconocido"
      }
    }
    return ""
  }
}

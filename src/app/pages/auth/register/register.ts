import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase/supabase';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  protected errorMessage = ""
  protected loading = false

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    repeatedPassword: new FormControl("", [Validators.required])
  }, { validators: this.comparePasswords })

  protected async register(event: Event) {
    event.preventDefault()
    this.errorMessage = ""

    console.log('Form status:', {
      formValid: this.registerForm.valid,
      usernameValid: this.registerForm.get("username")?.valid,
      emailValid: this.registerForm.get("email")?.valid,
      passwordValid: this.registerForm.get("password")?.valid
    })

    try {
      if (!this.registerForm.valid) {
        if (this.registerForm.get("username")?.errors?.["minlength"]) {
          this.errorMessage = "El nombre de usuario debe tener al menos 3 caracteres"
        } else if (this.registerForm.get("email")?.errors?.["email"]) {
          this.errorMessage = "Por favor, ingrese un correo electrónico válido"
        } else if (this.registerForm.get("password")?.errors?.["minlength"]) {
          this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
        } else if (this.registerForm.errors?.["passwordsNotMatch"]) {
          this.errorMessage = "Las contraseñas no coinciden"
        } else {
          this.errorMessage = "Por favor, complete todos los campos correctamente"
        }
        this.loading = false
        this.registerForm.enable()
        return
      }
      const email = this.registerForm.get("email")?.value
      const username = this.registerForm.get("username")?.value
      const password = this.registerForm.get("password")?.value
      const repeatedPassword = this.registerForm.get("repeatedPassword")?.value

      this.loading = true
      this.registerForm.disable()

      if (email && password && username) {
        const user: Parameters<SupabaseService['register']>[0] & { repeatedPassword: string } = {
          email: email,
          password: password,
          username: username,
          repeatedPassword: repeatedPassword!,
        }

        const response = await this.supabase.register(user)
        if (response.user !== null && response.session !== null) {
          this.router.navigate(['/'])
        }
      }
    } catch (error) {
      console.error(error)
      this.errorMessage = "Error al registrarse"
    } finally {
      this.loading = false
      this.registerForm.enable()
    }
  }

  private comparePasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password")?.value
    const repeatedPassword = control.get("repeatedPassword")?.value
    if (password !== repeatedPassword) {
      return { passwordsNotMatch: true }
    }
    return null
  }
}

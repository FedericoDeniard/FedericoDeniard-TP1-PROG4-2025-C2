import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { getSupabaseErrors, SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherLoader } from '@ng-icons/feather-icons';
import { getFormErrors } from '../../../utils/forms';

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
    try {
      if (!this.loginForm.valid) {
        this.errorMessage = getFormErrors(this.loginForm)
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

  test1Account() {
    this.loginForm.setValue({
      email: "test1@test.com",
      password: "123456"
    })
  }

  test2Account() {
    this.loginForm.setValue({
      email: "test2@test.com",
      password: "123456"
    })
  }

  test3Account() {
    this.loginForm.setValue({
      email: "test3@test.com",
      password: "123456"
    })
  }
}

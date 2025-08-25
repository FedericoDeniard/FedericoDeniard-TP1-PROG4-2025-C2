import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Button, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private supabase = inject(SupabaseService)
  private router = inject(Router)
  protected errorMessage = ""

  email = new FormControl("")
  password = new FormControl("")

  async login(event: Event) {
    event.preventDefault()
    if (!this.email.value || !this.password.value) {
      this.errorMessage = "Por favor, complete todos los campos"
      return
    }
    const response = await this.supabase.signIn({
      email: this.email.value,
      password: this.password.value
    })
    if (response.error) {
      console.log(response.error)
      this.errorMessage = "Error al iniciar sesión"
      return
    }

    if (response.data) {
      console.log(response.data)
      this.router.navigate(['/'])
    }
  }
}

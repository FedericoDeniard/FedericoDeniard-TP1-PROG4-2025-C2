import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../services/supabase/supabase';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Button, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private supabase = inject(SupabaseService)
  private router = inject(Router)

  email = new FormControl("")
  password = new FormControl("")
  repeatedPassword = new FormControl("")
  username = new FormControl("")

  protected async register(event: Event) {
    event.preventDefault()
    if (this.email.value === null || this.password.value === null || this.username.value === null || this.repeatedPassword.value === null) {
      return
    }
    if (this.password.value !== this.repeatedPassword.value) {
      return
    }

    const user: Parameters<SupabaseService['register']>[0] & { repeatedPassword: string } = {
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      repeatedPassword: this.repeatedPassword.value!,
    }

    try {
      const response = await this.supabase.register(user)
      if (response.user !== null && response.session !== null) {
        this.router.navigate(['/'])
        console.log("register success")
        return
      }
    } catch (error) {
      console.log("register error")
      console.error(error)
    }
  }
}

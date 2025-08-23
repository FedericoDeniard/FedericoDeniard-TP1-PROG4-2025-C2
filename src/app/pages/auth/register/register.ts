import { Component } from '@angular/core';
import { Button } from '../../../components/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Button, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}

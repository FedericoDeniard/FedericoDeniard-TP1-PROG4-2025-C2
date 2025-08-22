import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-styleguide',
  imports: [RouterLink, Button],
  templateUrl: './styleguide.html',
  styleUrl: './styleguide.css'
})
export class Styleguide {

}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-error',
  imports: [RouterLink, Button],
  templateUrl: './error.html',
  styleUrl: './error.css'
})
export class Error {
  constructor(private router: Router) { }

}

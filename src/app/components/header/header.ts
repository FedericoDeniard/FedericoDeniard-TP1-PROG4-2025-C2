import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherHome, featherInfo, featherSettings, featherMail } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
  providers: [provideIcons({ featherHome, featherInfo, featherSettings, featherMail })]
})
export class Header {
  isMenuOpen = false;
  selectedItem: string | null = 'home';

  constructor(private router: Router) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setSelected(item: string) {
    this.selectedItem = item;
    this.isMenuOpen = false; // Close menu on item selection
  }

  isSelected(item: string): boolean {
    return this.selectedItem === item;
  }

}

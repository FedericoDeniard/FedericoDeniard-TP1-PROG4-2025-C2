import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  isMenuOpen = false;
  isModalOpen = false;
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

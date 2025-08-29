import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherHome, featherInfo, featherSettings, featherMail, featherLogOut } from '@ng-icons/feather-icons';
import { SupabaseService } from '../../services/supabase/supabase';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
  providers: [provideIcons({ featherHome, featherInfo, featherSettings, featherMail, featherLogOut })]
})
export class Header {
  isMenuOpen = false;
  selectedItem: string | null = 'home';

  constructor(private router: Router, private supabase: SupabaseService) { }

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

  async logout() {
    try {
      this.router.navigate(['/auth/login']);
      await this.supabase.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

}

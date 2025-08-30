import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherHome, featherInfo, featherSettings, featherMail, featherLogOut, featherLogIn } from '@ng-icons/feather-icons';
import { SupabaseService } from '../../services/supabase/supabase';
import { Session, Subscription } from '@supabase/supabase-js';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
  providers: [provideIcons({ featherHome, featherInfo, featherSettings, featherMail, featherLogOut, featherLogIn })]
})
export class Header implements OnInit, OnDestroy {
  isMenuOpen = false;
  selectedItem: string | null = 'home';
  session = signal<Session | null>(null);
  authSubscription: Subscription | null = null;

  constructor(private router: Router, private supabase: SupabaseService) { }

  async ngOnInit() {
    const session = await this.supabase.getSessionAsync()
    this.session.set(session)
    this.authSubscription = this.supabase.authChanges((event, session) => {
      this.session.set(session);
    }).data.subscription
  }

  ngOnDestroy() {
    this.authSubscription ? this.authSubscription.unsubscribe() : null;
  }

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

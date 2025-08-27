import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase/supabase';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const supabase = inject(SupabaseService)

  const session = await supabase.getSessionAsync()
  return session ? true : router.createUrlTree(['/auth/login']);
};

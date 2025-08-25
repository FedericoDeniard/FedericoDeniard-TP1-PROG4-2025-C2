import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase/supabase';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const supabase = inject(SupabaseService)

  const canLogin = supabase.session
  console.log("canLogin", canLogin)
  return canLogin ? true : router.createUrlTree(['/auth/login']);
};

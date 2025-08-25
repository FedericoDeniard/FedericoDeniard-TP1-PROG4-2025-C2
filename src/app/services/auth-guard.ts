import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase/supabase';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const supabase = inject(SupabaseService)

  let session = supabase.session
  if (session === null) {
    session = await supabase.getSessionAsync()
  }
  console.log("Me autentiqué")
  return session ? true : router.createUrlTree(['/auth/login']);
};

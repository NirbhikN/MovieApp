import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const movieGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if (localStorage.getItem('token')) {
    return true;
  }
  
  alert("Please login first to access the page")
  router.navigate(['/login']);
  return false;
};
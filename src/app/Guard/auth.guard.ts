import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private authService:AuthService,private router:Router) {


  }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data["roles"];
    const currentUser = this.authService.currentUserValue;

    if (!this.authService.isLoggedIn() || (expectedRoles && !expectedRoles.includes(currentUser?.role))) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../private/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const path = route.url[0].path;
    if (path == 'login' || path == 'public') {
      if (!(await this.authService.autoLogin())) {
        return true;
      } else {
        this.router.navigate(['../private/dashboard']);
        return false;
      }
    } else {
      if (await this.authService.autoLogin()) {
        return true;
      } else {
        this.router.navigate(['../public/login']);
        return false;
      }
    }
  }
}

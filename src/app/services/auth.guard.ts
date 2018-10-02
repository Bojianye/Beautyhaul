/**
 * Created by robert on 18/06/17.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {CurrentUserService} from "./currentUser.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: CurrentUserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    if (url === '/userInfo' || url === '/profile') {
      return this.checkLogin(url);
    }
    return true;

  }

  checkLogin(url: string): boolean {
    if (this.authService.checkLogin()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}

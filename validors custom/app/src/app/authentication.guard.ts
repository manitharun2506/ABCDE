import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import toast from 'src/toast';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

constructor(private router:Router){}

  userData: any;
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userData = sessionStorage.getItem('userdata');
    
    if (this.userData.length == 0) {
      this.router.navigate(['/'])
      toast('Please Login First', false);

      return false;
    }
    return true;
  }
}

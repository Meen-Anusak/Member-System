import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../shared/services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {

  constructor(
    private authen : AuthenService,
    private router : Router
    ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authen.getAccessToeken()){
        return true;
      }else{
        this.router.navigate(['/login'])
        return false;
      }

  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IRole } from '../model/user-model';
import { AuthenService } from '../shared/services/authen.service';
import { AccountService } from '../shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private authen: AuthenService,
    private account : AccountService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable(res =>{
        const role  = next.data.role
        this.account.getUserLogin(this.authen.getAccessToeken())
          .subscribe(user =>{
            if(role.filter(item => item === user.role).length > 0){
              res.next(true)
            }else{
              res.next(false)
            }
          })
      })

  }

}

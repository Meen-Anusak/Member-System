import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister, IUser } from 'src/app/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  mockUser:IUser[] = [
    {
      firstname:'meen',
      lsatname:'anusak',
      email:'meen@mail.com',
      password:'123456',
      role:'admin'
    }
  ]


  constructor() { }

  onLogin(modelLogin){
    return new Observable<any>(result =>{
     const userLogin = this.mockUser.find(item => item.email === modelLogin.email && item.password === modelLogin.password)
     if(!userLogin) return result.error({message:'อีเมลผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'})
      result.next(userLogin)
    })
  }

  onRegister(modelRegister:IRegister){
    return new Observable(result=>{
      console.log(modelRegister)
      result.next();
    })
  }

  getUserLogin(accessToken:string){
    return new Observable<IUser>(result =>{
      const User = this.mockUser.find(user => user.email === accessToken);
      if(!User) return result.error({message:'AccessToken ไม่ถูกต้อง'})
      result.next(User)
    })
  }
}

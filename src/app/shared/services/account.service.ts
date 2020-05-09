import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister, IUser } from 'src/app/model/user-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  mockUser:IUser[] = [
    {
      id:'1',
      firstname:'meen',
      lastname:'anusak',
      email:'meen@mail.com',
      password:'123456',
      image:null,
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
      const User = this.mockUser.find(user => user.id === accessToken);
      if(!User) return result.error({message:'AccessToken ไม่ถูกต้อง'})
      result.next(User)
    })
  }

  updateProfile(accessToken:string,model:IUser){
    return new Observable(result =>{
      const user = this.mockUser.find(user => user.id === accessToken);
      if(!user) return result.error({messgae:'ไม่พบผู้ใช้งานนี้ในระบบ'})
      user.firstname = model.firstname;
      user.lastname = model.lastname;
      user.email = model.email;
      user.image = model.image;
      user.role = model .role;
      result.next(user)
    })
  }
}

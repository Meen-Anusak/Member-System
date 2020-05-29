import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister, IUser, IChanepass, SearchUser, IUSERS } from 'src/app/model/user-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  mockUser:IUser[] = [

  ]


  constructor( private http : HttpClient) {  }

  onLogin(modelLogin){
    return this.http.post<any>('http://localhost:3000/api/users/login',modelLogin)
  }

  onRegister(modelRegister:IRegister){
    return this.http.post<any>('http://localhost:3000/api/users/register',modelRegister)

  }

  getUserLogin(accessToken:string){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.get<any>('http://localhost:3000/api/users/profile',{headers:Header})
  }

  getUser(accessToken:string,option?:SearchUser){
    return new Observable<IUSERS>(result =>{
      let users = this.mockUser;
      const startItem = (option.startPage - 1) * option.limitPage;
      const endItem = option.startPage * option.limitPage;

     if(option.searchText && option.searchType){
       users = this.mockUser.filter(item => item[option.searchType]
        .toString().toLowerCase()
        .indexOf(option.searchText.toString().toLowerCase()) >= 0);
     }
      result.next({user:users.slice(startItem,endItem),usertotal:users.length})
    })
  }

  updateProfile(accessToken:string,model:IUser){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.put<any>('http://localhost:3000/api/users/updateprofile',model,{headers:Header})
  }

  changePassword(accessToken:string,model:IChanepass){
    return new Observable(result=>{
      const user = this.mockUser.find(user => user.id === accessToken);
      if(!user) return result.error({messgae:'ไม่พบผู้ใช้งานนี้ในระบบ'});
      if(user.password !==  model.old_pass) return result.error({message:'รหัสผ่านเดิมไม่ถูกต้อง'})
      user.password = model.new_pass;
      result.next(user);
    })
  }

  createUser(model:IUser){
    return new Observable(result =>{
      if(this.mockUser.find(user => user.email === model.email))
        return result.error({message:'อีเมลล์นี้มีผู้ใช้งานแล้ว'})
      model.id = Math.random().toString();
      const newUser = this.mockUser.push(model);
      result.next(newUser);
    })
  }

  deleteUser(id:any){
    return new Observable(resulr =>{
      const user = this.mockUser.findIndex(item => item.id === id)
      if(!user) return resulr.error({message:'ไม่พบผู้ใช้งานในระบบ'})
      resulr.next(this.mockUser.splice(user,1))
    })
  }

  getUserById(id:any){
    return new Observable<IUser>(res =>{
      const user = this.mockUser.find(user => user.id === id)
      if(!user) return res.error({message:'ไม่พบผู้ใช้งานนี้ในระบบ'})
      return res.next(user)
    })
  }

  editUser(id:any,model:IUser){
    return new Observable(res=>{
      const user = this.mockUser.find(item => item.id === id)
      if(!user) return res.error({message:'ไม่พบผู้ใช้งานนี้ในระบบ'})
      if(this.mockUser.find(item =>
         item.email === model.email && model.email != user.email
      )) return res.error({message:'อีเมลนี้มีผู้ใช้งานแล้ว'});


        user.firstname = model.firstname
        user.lastname = model.lastname,
        user.email = model.email,
        user.image = model.image,
        user.role = model.role
        res.next(user);
      }
    );
  }

}

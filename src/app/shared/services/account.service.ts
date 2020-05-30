import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister, IUser, IChanepass, SearchUser, IUSERS } from 'src/app/model/user-model';
import { HttpClient } from '@angular/common/http';
declare const $;

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
    // return new Observable<IUSERS>(result =>{
    //   let users = this.mockUser;
      let startItem = (option.startPage - 1) * option.limitPage;
      let endItem = option.startPage * option.limitPage;

    //  if(option.searchText && option.searchType){
    //    users = this.mockUser.filter(item => item[option.searchType]
    //     .toString().toLowerCase()
    //     .indexOf(option.searchText.toString().toLowerCase()) >= 0);
    //  }
    //   result.next({user:users.slice(startItem,endItem),usertotal:users.length})
    // })

    return this.http.get<IUSERS>(`http://localhost:3000/api/users/get/?startPage=${startItem}&limitPage=${endItem}`)

  }

  updateProfile(accessToken:string,model:IUser){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.put<any>('http://localhost:3000/api/users/updateprofile',model,{headers:Header})
  }

  changePassword(accessToken:string,model:IChanepass){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.post<any>('http://localhost:3000/api/users/changepassword',model,{headers:Header})
  }

  createUser(model:IUser){
    return this.http.post<any>('http://localhost:3000/api/users/register',model)
  }

  deleteUser(id:any,accessToken:string){
    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.delete<any>('http://localhost:3000/api/users/user/'+id,{headers:Header})
  }

  getUserById(id:any,accessToken:string){
    console.log(id);

    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.get<any>('http://localhost:3000/api/users/user/'+id , {headers:Header})
  }

  editUser(id:any,model:IUser,accessToken:string){
    console.log(model);

    const Header ={
      'Authorization': 'Bearer '+ accessToken
    }
    return this.http.put<any>('http://localhost:3000/api/users/updateuser/'+id,model,{headers:Header})

  }
}

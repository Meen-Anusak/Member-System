import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor() { }

  private accessKey = 'accessKey'

  setAccesstoken(accessToken:string){
    localStorage.setItem(this.accessKey,accessToken)
  }

  getAccessToeken(){
   return localStorage.getItem(this.accessKey)
  }

  clearAccesstoken(){
    localStorage.clear()
  }
}

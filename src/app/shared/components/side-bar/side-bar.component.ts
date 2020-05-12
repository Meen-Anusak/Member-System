import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from 'src/app/authentication/authen.routing';
import { AuthenService } from '../../services/authen.service';
import { AccountService } from '../../services/account.service';
import { NotifyAlertService } from '../../services/notify-alert.service';
import { IUser, IRole } from 'src/app/model/user-model';
import { Router } from '@angular/router';

declare const Toggle;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  AppURL = AppURL;
  AuthenURL = AuthenURL;

  User : IUser;
  role = {
    admin:'admin',
    instructor:'instructor',
    student:'student',
  }

  constructor(
    private authen :AuthenService,
    private account : AccountService,
    private alert : NotifyAlertService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.getUserlogin()
    setTimeout(()=>{
      Toggle.sidebar();
    },500)
  }

 private getUserlogin(){
  this.account.getUserLogin(this.authen.getAccessToeken())
    .subscribe(result =>{
      this.User = result;
    },
    error =>{
      this.alert.notify(error.message,'danger')
      this.authen.clearAccesstoken()
      this.router.navigate(['/login'])
    })

  }

}

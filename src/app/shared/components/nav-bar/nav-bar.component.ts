import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from 'src/app/authentication/authen.routing';
import { AuthenService } from '../../services/authen.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  AppURL = AppURL;
  AuthenURL = AuthenURL

  constructor(private authen : AuthenService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authen.clearAccesstoken();
  }
}

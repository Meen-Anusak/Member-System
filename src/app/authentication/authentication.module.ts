import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChangPasswordComponent } from './components/profile/chang-password/chang-password.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [DashboardComponent, ProfileComponent, AddUserComponent, UserListComponent, ChangPasswordComponent, ProductComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }

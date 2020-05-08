import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenURL } from './authen.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';


const routes: Routes = [
  {path:AuthenURL.Dashboard,component:DashboardComponent},
  {path:AuthenURL.Profile,component:ProfileComponent},
  {path:AuthenURL.UserList,component:UserListComponent},
  {path:AuthenURL.AddUser,component:AddUserComponent},
  {path:'',redirectTo:AuthenURL.Dashboard,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

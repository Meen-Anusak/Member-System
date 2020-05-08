import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURL } from './app.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:AppURL.Login,component:LoginComponent},
  {path:AppURL.Register,component:RegisterComponent},
  {path:AppURL.Authen,loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:'',redirectTo:AppURL.Login,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ContentComponent } from './components/content/content.component';
import { RouterModule } from "@angular/router";
import { FormsModule , ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [NavBarComponent, SideBarComponent, ContentComponent],
  imports: [
    CommonModule,
    BsDropdownModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    NavBarComponent,
    SideBarComponent,
    ContentComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

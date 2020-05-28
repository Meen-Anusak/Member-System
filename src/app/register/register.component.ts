import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyAlertService } from '../shared/services/notify-alert.service';
import { AccountService } from '../shared/services/account.service';
import { Router } from '@angular/router';
import { AppURL } from '../app.routing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup

  constructor(
    private builder : FormBuilder,
    private alert : NotifyAlertService,
    private account :AccountService,
    private router : Router,
  ) {
    this.createFormRegister();
  }

  ngOnInit(): void {
  }

  private createFormRegister(){
    this.form = this.builder.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
    })
  }

  onSubmit(){
    if(this.form.invalid){
     return  this.alert.notify('มีข้อมูลบางอย่างไม่ถูกต้อง','warning');
    }
    this.account.onRegister(this.form.value).subscribe(result => {
      this.alert.notify(result.message,'success')
      this.router.navigate(['/',AppURL.Login])
    },error =>{
      this.alert.notify(error.error.error.message,'warning')
    })
  }

}

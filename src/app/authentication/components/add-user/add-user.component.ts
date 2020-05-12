import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyAlertService } from 'src/app/shared/services/notify-alert.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppURL } from 'src/app/app.routing';
import { AuthenURL } from '../../authen.routing';
import { IUser } from 'src/app/model/user-model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form:FormGroup;
  userId : any;
  editUser : boolean = false;

  constructor(
    private alert : NotifyAlertService,
    private builder : FormBuilder,
    private account : AccountService,
    private router  : Router,
    private activatedRoute : ActivatedRoute
    ) {
      this.activatedRoute.params.forEach(param => this.userId = param.id)
     }

  ngOnInit(): void {
    this.createFormNewUser();
    this.editForm();
  }


  private createFormNewUser(){
    this.form = this.builder.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      image:[''],
      role:['',[Validators.required]],
    })
  }

  onConvertImage(input:HTMLInputElement){
    const image = this.form.controls['image'];
    const imageType = ['image/png','image/jpeg','image/jpg']
    image.setValue(null)
    if(input.files.length == 0) return;
    if(imageType.indexOf(input.files[0].type)<0){
      input.value = null;
      return this.alert.notify('เฉพาะรูปเท่านั้น','danger')
    }
   const reader = new FileReader();
   reader.readAsDataURL(input.files[0]);
   reader.addEventListener('load',()=>{
     image.setValue(reader.result)
   })
  }

  onSubmit(){
    if(this.form.invalid) return this.alert.notify('กรุณาป้อนข้อมูลให้ถูกต้อง','danger')
    if(!this.userId){
      this.account.createUser(this.form.value).subscribe(
        result =>{
          this.alert.notify('บันทึกข้อมูลทำเสร็จ','success');
          this.router.navigate(['/',AppURL.Authen,AuthenURL.UserList])
        },error =>{
          this.alert.notify(error.message,'warning')
        }
      );
    }else{
      this.account.editUser(this.userId,this.form.value)
        .subscribe(res=>{
          this.alert.notify('แก้ไขข้อมูลเรียบร้อย','success');
          this.router.navigate(['/',AppURL.Authen,AuthenURL.UserList])
        },error =>{
          this.alert.notify(error.message,'danger')
        });
    }

  }

  private editForm(){
    if(!this.userId) return;
    this.account.getUserById(this.userId).subscribe(res =>{
      this.editUser = true
      this.form.controls['password'].disable()
      this.form.controls['firstname'].setValue(res.firstname)
      this.form.controls['lastname'].setValue(res.lastname)
      this.form.controls['email'].setValue(res.email)
      this.form.controls['image'].setValue(res.image)
      this.form.controls['role'].setValue(res.role)
    })
  }

}

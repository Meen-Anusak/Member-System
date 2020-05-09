import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthenService } from 'src/app/shared/services/authen.service';
import { IUser } from 'src/app/model/user-model';
import { NotifyAlertService } from 'src/app/shared/services/notify-alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  User : IUser;
  modalRef: BsModalRef;
  constructor(
    private builder: FormBuilder,
    private account : AccountService,
    private authen : AuthenService,
    private alert : NotifyAlertService,
    private modalService: BsModalService
    ) {}

  ngOnInit(): void {
    this.createFormProfile();
    this.getUserProfile();
  }

  private createFormProfile() {
    this.form = this.builder.group(
      {
        firstname: ['',[Validators.required]],
        lastname: ['',[Validators.required]],
        email: ['',],
        image: ['',[Validators.required]],
        role: [''],
      });
      this.form.get('email').disable();
      this.form.get('role').disable();
  }

  onSubmit() {
    if(this.form.invalid) return this.alert.notify('ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง','warning');
    this.account.updateProfile(this.authen.getAccessToeken(),this.form.value)
      .subscribe(result =>{
        console.log(result)
        this.alert.notify('แก้ไขข้อมูลเรียบร้อย','success')
      },
      error =>{
        this.alert.notify(error.messgae,'danger')
      })
  }

 private getUserProfile(){
   this.account.getUserLogin(this.authen.getAccessToeken())
    .subscribe(result =>{
      this.form.controls['firstname'].setValue(result.firstname);
      this.form.controls['lastname'].setValue(result.lastname);
      this.form.controls['email'].setValue(result.email);
      this.form.controls['image'].setValue(result.image);
      this.form.controls['role'].setValue(result.role);
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
 openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
}

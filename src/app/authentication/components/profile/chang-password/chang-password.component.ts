import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NotifyAlertService } from 'src/app/shared/services/notify-alert.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthenService } from 'src/app/shared/services/authen.service';

@Component({
  selector: 'app-chang-password',
  templateUrl: './chang-password.component.html',
  styleUrls: ['./chang-password.component.css']
})
export class ChangPasswordComponent implements OnInit {

    @Input('modalRef') modalRef: BsModalRef;
    form:FormGroup;

  constructor(
    private builder : FormBuilder,
    private alert : NotifyAlertService,
    private account : AccountService,
    private authen : AuthenService
    ) { }

  ngOnInit(): void {
    this.formNewPassword();
  }

  private formNewPassword(){
    this.form = this.builder.group({
      old_pass :['',[Validators.required]],
      new_pass :['',[Validators.required,Validators.minLength(6)]],
      cnew_pass:['',[Validators.required,this.conFirmPssword('new_pass')]]
    })
  }

  onSubmit(){
    if(this.form.invalid) return this.alert.notify('กรุณาป้อนข้อมูลให้ถูกต้อง','warning')
    this.account.changePassword(this.authen.getAccessToeken(),this.form.value)
      .subscribe(result =>{
        this.alert.notify(result.message,'success')
        this.modalRef.hide()
      },error =>{
        this.alert.notify(error.error.error.message,'danger')
      })
  }

  private conFirmPssword(psswordField :string ){
    return function(confirm_password:AbstractControl){
      if(!confirm_password.parent) return;
      const password = confirm_password.parent.get(psswordField);
      const passwordallow = password.valueChanges.subscribe(()=>{
        confirm_password.updateValueAndValidity();
        passwordallow.unsubscribe();
      })
      if(confirm_password.value === password.value) return
      return {compare:true}
    }
  }
}


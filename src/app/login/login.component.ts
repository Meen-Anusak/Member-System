import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyAlertService } from '../shared/services/notify-alert.service';
import { AccountService } from '../shared/services/account.service';
import { Router } from '@angular/router';
import { AppURL } from '../app.routing';
import { AuthenURL } from '../authentication/authen.routing';
import { AuthenService } from '../shared/services/authen.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private alert: NotifyAlertService,
    private account: AccountService,
    private router: Router,
    private authen : AuthenService
  ) {
    this.createFormLogin();
  }

  ngOnInit(): void {}

  private createFormLogin() {
    this.form = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid)
      return this.alert.notify('ข้อมูลบางอย่างไม่ถูกต้อง', 'warning');

    this.account.onLogin(this.form.value).subscribe(
      (result) => {
        this.authen.setAccesstoken(result.id)
        this.alert.notify('เข้าสูระบบสำเร็จ', 'success');
        this.router.navigate(['/',AppURL.Authen,AuthenURL.Dashboard])
      },
      (error) => {
        this.alert.notify(error.message, 'danger');
      }
    );
  }
}

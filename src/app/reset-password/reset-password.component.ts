import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private _email = ''; res;
  error = '';
  hasError(): boolean {
    return this.error.length > 0;
  }

  @Input() toggleResetPassword;

  constructor(private server: ServerService) {}

  ngOnInit(): void {}

  emailRule = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@([\w-]+)(\.ab\-inbev.com)$/gi);

  get email() {
    return this._email;
  }

  set email(value: string) {
    const isValid = this.emailRule.test(value);
    if (!isValid) {
      this.error = 'Email is invalid';
    } else {
      this.error = '';
    }
    this._email = value;
  }

  resetPassword() {
    if (!this._email) {
      this.error = 'Please, enter your email adress';
      return;
    }
    if (this.error) {
      this.error = 'Please, enter a valid email address';
    }

    // Send off to API
    this.server.resetPassword(this._email).subscribe(data=>{
      this.res = data.success
    })
  }
}

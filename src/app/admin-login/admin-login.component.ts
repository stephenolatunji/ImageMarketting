import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { AdminAuthService } from '../service/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private server: ServerService, private auth: AdminAuthService, public rout: Router) { }

  public admin = {
    email: null,
    password: null
  };

  notice: string = "Admin Sign In"; loading: string = 'Login'; data;

  ngOnInit(): void {
    // console.log('din'.slice(0,2))
  }

  public handleSubmit(): void {

    if (this.admin.email == null || this.admin.password == null) {
      this.notice = 'Please fill all input boxes correctly';
    } else {
      this.notice = 'Admin Sign In';
      // temp
      // this.loading = 'Please wait...';
      // localStorage.setItem('who', 'admin');
      // this.auth.setAuth(this.admin.userId);
      // window.location.reload();
      
      this.loading = 'Please wait...';
      this.server.logMeInAsAdmin(this.admin).subscribe(
        data => {
          if (data.success == true) {
              this.loading == 'Login';
            this.auth.setAuth(this.admin.email);
            localStorage.setItem('who', 'admin');
            setTimeout(() => {        
              window.location.reload(false);
            }, 500);
          }
        },
        error => this.handleError(error.status)
      );
    }

  }

  handleError(status) {
    this.loading = 'Login';
    this.notice = status == 401 ? 'Invalid Credential(s)' : 'Network Problem';
  }

}

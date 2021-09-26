import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-super-admin-page',
  templateUrl: './super-admin-page.component.html',
  styleUrls: ['./super-admin-page.component.scss']
})
export class SuperAdminPageComponent implements OnInit {

  constructor(private server: ServerService) { }

  public user = { email: null, password: null, content: false, loading: false, success: null };
  public data = { outlet_name: '', bdr_email: '', latitude: '', longitude: '' };

  ngOnInit(): void {
  }

  keyUpCheck() {
   
    if(this.user.email.toLowerCase() == 'adeola.bello@ng.ab-inbev.com' && this.user.password == 'adebello') {
      this.user.content = true; 
    }
    else {
      this.user.content = false; 
    }
  }

  handleSubmit() {
    this.user.loading = true;
    if(this.data.outlet_name!=='' &&  this.data.bdr_email!=='' && this.data.longitude !== '' && this.data.latitude !== '') {
      this.server.updatePocData(this.data).subscribe(data => {
        this.user.success = data.success;
        this.user.loading = false;
      })
    }
  }

  handleDataKeyUp() {
    this.user.success = null;
  }


}

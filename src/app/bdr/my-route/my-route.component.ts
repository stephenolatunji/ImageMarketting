import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../service/event-emitter.service'; 
import { LocalServerService } from '../../service/local-server.service';
import { ServerService } from '../../service/server.service';
import { IdbService } from '../../helper/idb.service';
import { LoginComponent } from 'src/app/login/login.component';
declare var $: any;

@Component({
  selector: 'app-my-route',
  templateUrl: './my-route.component.html',
  styleUrls: ['./my-route.component.css']
})
export class MyRouteComponent implements OnInit {

  public user; downloadNotice; uploadNotice; totalStuffsToUpload=0; totalPerc: any;  totalLength: number = 0; data;
  taskToUpload; opportunityToUpload; surveyToUpload; pendingTasks = []; pendingOpportunity = []; 

  constructor(
    private eventEmitterService: EventEmitterService,
    public rout: Router, 
    private localServer: LocalServerService,
    private server: ServerService,
    public funcFromLogin: LoginComponent,
    private idb: IdbService
    ) { }
    
    ngOnInit(): void {

    // SET TOTAL PERCENTAGE TO BE 0
    this.totalPerc = 0;


    this.downloadNotice = 'Download Data';
    this.uploadNotice = 'Upload Pending Task';
    this.user = localStorage.getItem('userId');

    this.taskToUpload = this.localServer.supplyTaskFromLocalStorage();
    this.opportunityToUpload = this.localServer.supplyOpportunityFromLocalStorage();

    if(this.taskToUpload == null) {
      this.totalStuffsToUpload += 0
    }
    else {
      this.pendingTasks =  this.taskToUpload.filter(task=>task.action=='pending');
      this.totalStuffsToUpload += this.pendingTasks.length;
    }
    
    if(this.opportunityToUpload == null) {
      this.totalStuffsToUpload += 0
    }

    else {
      this.totalStuffsToUpload += this.opportunityToUpload.filter(task=>task.action=='pending').length;
      this.pendingOpportunity =  this.opportunityToUpload.filter(task=>task.action=='pending')
    }

  }

  backFunc() {
    this.rout.navigate(['']);
    this.eventEmitterService.OpenSideBar();    
  }

  addPocAndShowDailyShedule() {
    this.rout.navigate(['DailySchedule']);
  }

  downloadCallSchedule() {
      this.downloadNotice = 'Downloading...';
      let x = this.funcFromLogin.getDataFromServer(this.user);

      if(x.success) {
        setTimeout(() => {
          this.downloadNotice = 'Successfully Downloaded!';
        }, 1500);

        setTimeout(() => {
          (this.server.checkIfIAmOnline())?
          window.location.reload() : window.location.reload()
        }, 2500);
      }
  }



  uploadPendingInformation() {
    this.uploadNotice = 'Uploading...';

    if(
      this.pendingTasks.length == 0 && 
      this.pendingOpportunity.length == 0) {
      this.uploadNotice = 'No task to upload!';
    }

    else {
      this.totalLength = this.pendingOpportunity.length + this.pendingTasks.length;
      this.handleUpload();
    }
  }

  async handleUpload() {

    if(this.pendingTasks.length > 0) {
      this.handleTaskUpload()
    }

    else if(this.pendingOpportunity.length > 0){
      this.handleOpportunityUpload()
    }

    else {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  handleTaskUpload() {
    var request = window.indexedDB.open(this.pendingTasks[0].image_name, 1);
      let x = this.pendingTasks[0];
      request.onsuccess = (event) => {
       var db = request.result;
       db.transaction("tasks").objectStore("tasks").getAll().onsuccess = (event) => {
         
          x.image = (event.target as IDBOpenDBRequest).result[0].image;
         
          this.server.uploadDataFrmLocalServer(x, null, null, this.user).subscribe(data=>{
          
            this.data = data.results;
            this.idb.deleteDb(this.pendingTasks[0]);
            this.pendingTasks.shift();
            localStorage.setItem("task", JSON.stringify(this.pendingTasks));
            this.localServer.updateTaskFromServer(this.data);
            this.totalPerc = (((this.totalLength-this.pendingTasks.length-this.pendingOpportunity.length) / this.totalLength)* 100).toFixed(0);
            this.handleUpload();
          }, error => this.handleError(error.status))
          return;

        };
        db.close();
      }
  };

  handleOpportunityUpload() {
    var request = window.indexedDB.open(this.pendingOpportunity[0].image_name, 1);
      let x = this.pendingOpportunity[0];
      request.onsuccess = (event) => {
       var db = request.result;
       db.transaction("tasks").objectStore("tasks").getAll().onsuccess = (event) => {
         
          x.image = (event.target as IDBOpenDBRequest).result[0].image;
         
          this.server.uploadDataFrmLocalServer(null, x, null, this.user).subscribe(data=>{          
            this.data = data.results;
            this.idb.deleteDb(this.pendingOpportunity[0]);
            this.pendingOpportunity.shift();
            localStorage.setItem("opportunity", JSON.stringify(this.pendingOpportunity));
            this.totalPerc = (((this.totalLength-this.pendingTasks.length-this.pendingOpportunity.length) / this.totalLength)* 100).toFixed(0);
            this.handleUpload();
          }, error => this.handleError(error.status))
          return;

        };
        db.close();
      }
  };

  handleError(status) {
    this.uploadNotice = 'Network Error';
  }

}

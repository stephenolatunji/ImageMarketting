import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { NotifyComponent } from "../../notify/notify.component";
import { LocalServerService } from '../../service/local-server.service';

declare var $:any;
@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.css']
})
export class PocComponent implements OnInit {

  public pocId; loading:boolean; success:boolean; failure: boolean; alert; gateway: boolean = false;
  outletStatusGateway: boolean = false; data;

  notification_msg: object = { msg: null, success: null };

  public dataForCam = {
    poc_id: null,
    value: null,
    outletStatus: null,
    chillerPresence: null,
    snapType: null
  }

  public pocCoord = {
    lat: null,
    long: null
  }

  public traffic = {
    chair: null, poster: null, chiller: null, hero_pp: null
  }

  public pendingTaskLength; pendingOpportunityLength;
  constructor(public actRoute: ActivatedRoute, private server: ServerService, public rout: Router, public notifier: NotifyComponent, private localServer: LocalServerService) { }

  ngOnInit(): void {
    this.alert = 'Take Photo';
    this.getPocId();
    // call function todo what needs to be done
    this.getPocValidation(this.pocId);

    // get
    const pendingChillerTasks =  this.localServer.supplyTaskFromLocalStorage()?.filter(task=>task?.action=='pending').length;
    const pendingOpportunityTasks = this.localServer.supplyOpportunityFromLocalStorage()?.filter(oppor=>oppor?.action=='pending').length;
    this.pendingTaskLength = (pendingChillerTasks && pendingOpportunityTasks)? 
    pendingChillerTasks + pendingOpportunityTasks :
    (pendingChillerTasks && !pendingOpportunityTasks)? 
    pendingChillerTasks + 0 :
    (!pendingChillerTasks && pendingOpportunityTasks)? 
    0 + pendingOpportunityTasks :
    0
  }

  getPocId() {
    this.actRoute.paramMap.subscribe((param => {
        this.pocId = param.get('pocId');
    }))
  }

  getPocValidation(pocId) {
    let data = JSON.parse(localStorage.getItem('data'));
    this.data = data;
     data.forEach(element => {
       if(element.id==pocId){
         this.pocCoord.lat = element.latitude;
         this.pocCoord.long = element.longitude;
         this.traffic.chiller = element.chiller;
         this.traffic.chair = element.chair;
         this.traffic.hero_pp = element.hero_pp;
         this.traffic.poster = element.poster;
       }
     });
     
    this.loading = true;
    this.success =  this.failure = !this.loading;
    this.proceed(this.server.getPocValidation(this.pocCoord))
  }

  handleError() {
    this.alert = 'Cannot open Camera!';
  }

  // cehcking distance restrictions
  proceed(data) {

    if(data <= 200) {
      this.loading = true;
      this.failure = true;
      this.success = !this.failure;
      const note = { msg: "Sorry! You are beyond 200m restriction to the outlet!", success: false }
      this.notification(note);
      setTimeout(() => {
        this.okThanks()
      }, 2500);
    }

    else if(data > 200){
      this.success = true;
      this.loading = false;
      this.failure = false;
      $('#isOutletOpen').modal('show');
    }

  }

  // check outlet status
  outletStatus(x){
    switch (x) {
      case 0:
        this.success = true;
        this.dataForCam.poc_id = this.pocId;
        this.dataForCam.outletStatus = 'Close';
        this.dataForCam.chillerPresence = 'No-idea';
        this.server.tempStoreDataForCamera(this.dataForCam);
        $('#isOutletOpen').modal('hide');
        this.rout.navigate(['camera']);
        break;

      case 1:
        this.success = true;
        this.dataForCam.poc_id = this.pocId;
        this.dataForCam.outletStatus = 'Open';
        this.server.tempStoreDataForCamera(this.dataForCam);
        $('#isOutletOpen').modal('hide')
        break;
    
      default:
        break;
    }
  }

  okThanks():void {
    window.history.back()
  }

  snapShot(x): void {
    // if tasskToUpload is less than 10, youu know array starts frm 0
    if(this.pendingTaskLength >= 10 ) {
      const note = { msg: "Please Upload pending tasks!", success: false }
      this.notification(note);
    }

    else {
      // for chiller open gateway and check if the task is nt already a good exec
      if(this.success && x == 'chiller' && this.traffic.chiller !== 'success') {
        this.gateway = true;
        this.dataForCam.poc_id = this.pocId;
        this.dataForCam.value = x;
      }
      else if(this.success && x == 'chiller' && this.traffic.chiller == 'success') {
        const note = { msg: "Task already performed!", success: true }
        this.notification(note);
      }
  
      // for posters...dnt open gateway since u already opend is the outlet opened and confirm if action is not success
      else if(this.success && ((x == 'chair' && this.traffic.chair !== 'success') || (x == 'poster' && this.traffic.poster !== 'success') || (x == 'hero_pp' && this.traffic.hero_pp !== 'success'))) {
        this.dataForCam.poc_id = this.pocId;
        this.dataForCam.value = x;
        this.dataForCam.snapType = 'single';
        this.server.tempStoreDataForCamera(this.dataForCam);
        this.rout.navigate(['camera']);
      }
      else {
        const note = { msg: "Task already performed!", success: true }
        this.notification(note);
      };   
    }
  }

  opportunity(): void {

    if(this.pendingTaskLength >= 10 ) {
      
      const note = { msg: "Please Upload pending tasks!", success: false }
      this.notification(note);
    }
    else {
      if(this.success) {
        this.dataForCam.poc_id = this.pocId;
        this.dataForCam.value = 'opportunity';
        this.dataForCam.snapType = 'single';
        this.server.tempStoreDataForCamera(this.dataForCam);
        this.rout.navigate(['camera']);
      }
      else {
        const note = { msg: "You are beyond 200m restriction to the outlet!", success: false }
        this.notification(note);
      }
    }

  }

  survey(): void {
    if(this.success) {
      this.dataForCam.poc_id = this.pocId;
      this.dataForCam.value = 'survey';
      this.server.tempStoreDataForCamera(this.dataForCam);
      this.rout.navigate(['survey']);
    }
    else {
      alert("I can't open Camera, proximity beyond 200m");
    }
  }

  back() {
    $('#isOutletOpen').modal('hide')
    window.history.back()
  }

  notification(note) {
    this.notification_msg = note;
    this.notifier.show();
    setTimeout(() => {    
      this.notifier.hide();
    }, 2500);
  }

}

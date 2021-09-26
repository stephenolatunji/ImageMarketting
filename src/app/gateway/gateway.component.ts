import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../service/server.service';
import { Router } from '@angular/router';
import { NotifyComponent } from '../notify/notify.component';
declare var $: any;

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  @Input() message; 

  err: boolean;

  public survey = {
    how_many_chiller: null,
    cooler_status: null,
    how_many_ibl_weekly: null,
    competitor_chiller: null,
    cases_of_competitor_brand_weekly: null,
    poc_id: null,
    value: null,
    chillerPresence: null,
    outletStatus: null,
    snapType: null
  };

  public notification_msg = {
    success: null,
    msg: null
  }
  
  constructor(private server: ServerService, private rout: Router, public notifier: NotifyComponent) { }

  ngOnInit(): void {
    (this.message.value == 'chiller') ? 
      $('#isChillerPresent').modal('show') :
      $('#otherSurvey').modal('show');

      // no notigfication on load
      this.notifier.hide();
  }

// outletStatus(x) {
//   switch (x) {
//     case 1:
//       $('#isOutletOpen').modal('hide');

//       if(this.message.value == 'chiller') {
//         setTimeout(() => {
//           $('#isChillerPresent').modal('show');
//         }, 400);
//       }
      
//       else {
//         $('#isChillerPresent').modal('hide');
//         this.message.chillerPresence = 'No-idea';
//         this.message.outletStatus = 'Yes';
//         this.server.tempStoreDataForCamera(this.message);
//         this.rout.navigate(['camera']);
//       }
//       break;


//     case 0:
//       $('#isOutletOpen').modal('hide');
//       $('#isChillerPresent').modal('hide');
//       this.message.chillerPresence = 'No-idea';
//       this.message.outletStatus = 'No';
//       this.server.tempStoreDataForCamera(this.message);
//       this.rout.navigate(['camera']);
//       break;
  
//     default:
//       break;
//   }
// }

  chillerStatus(x) {
    // $('#isOutletOpen').modal('hide');
    $('#isChillerPresent').modal('hide');
    switch (x) {
      case 1:
        this.message.chillerPresence = 'Yes';
        // this.message.outletStatus = 'Yes';
        $('#otherSurvey').modal('show');
        break;

      case 0:
        // this.message.chillerPresence = 'No';       
        // $('#otherSurvey').modal('show');
        this.notification_msg.success = false;
        this.notification_msg.msg = "No Chiller task could be performed on this outlet!";
        this.notifier.show();
        setTimeout(() => {
          window.location.href = "/DailySchedule";
        }, 3000);
        break;
    
      default:
        break;
    }
  }


  submit() {

    if(this.message.chillerPresence == 'No' && (this.survey.cases_of_competitor_brand_weekly !== null || this.survey.competitor_chiller !== null || this.survey.how_many_ibl_weekly !== null)) {
      this.err = false;
      $('#otherSurvey').modal('hide');
      this.survey.poc_id = this.message.poc_id;
      this.survey.value = this.message.value;
      this.survey.chillerPresence = this.message.chillerPresence;
      this.survey.outletStatus = this.message.outletStatus;
      this.survey.how_many_chiller = '0';
      this.survey.cooler_status = 'No Chiller';
      this.survey.snapType = 'single';
      this.server.tempStoreDataForCamera(this.survey);
      this.rout.navigate(['camera']);
    }

    else if(this.message.chillerPresence == 'Yes' && ( this.survey.cases_of_competitor_brand_weekly !== null || this.survey.competitor_chiller !== null || this.survey.how_many_chiller !== null || this.survey.how_many_ibl_weekly !== null || this.survey.cooler_status !== null  ) ) {
      this.err = false;
      $('#otherSurvey').modal('hide');
      this.survey.poc_id = this.message.poc_id;
      this.survey.value = this.message.value;
      this.survey.chillerPresence = this.message.chillerPresence;
      this.survey.outletStatus = this.message.outletStatus;
      // remove ds when u ready 
      this.survey.snapType = 'single'; 
      // end
      this.server.tempStoreDataForCamera(this.survey);
      // enable ds wen u ready
      // $('#snapType').modal('show');
      // end
      // remove ds
      this.rout.navigate(['camera']);
      // end
    }

   else {
    this.err = true;
   }
  }

  snapTypeFunc(x): void {
    this.survey.snapType = x;
    this.server.tempStoreDataForCamera(this.survey);  
    $('#snapType').modal('hide');
    this.rout.navigate(['camera']);
  }

  back() {
    window.location.reload();
  }

}

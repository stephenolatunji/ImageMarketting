import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { NotifyComponent } from "../../notify/notify.component";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @Input() taskId;

  notification_msg: object = { msg: null, success: null };

  public feedback = {
    blurry: null,
    photo_over_exposed: null,
    wrong_chiller_detection: null,
    wrong_numbers_of_sku: null,
    wrong_whitespaces: null,
    suspected_photo: null
  };
  public feedback_string: string;

  constructor(private server: ServerService, public notifier: NotifyComponent) { }

  ngOnInit(): void {
  }

  
  feedbackFunc() :void{
    this.feedback_string = '';
    (this.feedback.blurry)?
    this.feedback_string += "Blurry image, " : null;
  
    (this.feedback.photo_over_exposed)?
    this.feedback_string += "Photo over exposed, " : null;
    
    (this.feedback.wrong_chiller_detection)?
    this.feedback_string += "Wrong chiller detection, " : null;

    (this.feedback.wrong_numbers_of_sku)?
    this.feedback_string += "Wrong number(s) of SKU, " : null;

    (this.feedback.wrong_whitespaces)?
    this.feedback_string += "Wrong white spaces or contamination, " : null;

    (this.feedback.suspected_photo)?
    this.feedback_string += "Suspected Photo, " : null;

    // remove last comma and space
    this.feedback_string = this.feedback_string.trim().slice(0, -1);
    // submit
    this.notification_msg = { msg: "Submitting your feedback...", success: true };
    this.notifier.show();

    this.server.updateTask(this.feedback_string, this.taskId).subscribe(data => {
      this.notifier.hide();
      if(data.success) {
        this.notification_msg = { msg: "Feedback Submitted Successfully!", success: true };
        this.notifier.show();
        setTimeout(() => {
          this.notifier.hide();
        }, 2500);
      } 
      else {
        this.notification_msg = { msg: "Error Submitting your feedback!", success: false };  
        this.notifier.show();
        setTimeout(() => {
          this.notifier.hide();
        }, 2500);
      } 
    }, error => this.handleError());
    
  }

    handleError() {
      this.notification_msg = { msg: "Error Submitting your feedback!", success: false };
      this.notifier.show();
        setTimeout(() => {
          this.notifier.hide();
        }, 2500);
    }

}

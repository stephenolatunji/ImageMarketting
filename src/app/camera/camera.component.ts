import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { Router } from '@angular/router';
import { LocalServerService } from '../service/local-server.service';
import { CallFuncInAppService } from '../service/call-func-in-app.service';
import { ToBase64Service } from '../helper/to-base-64.service';
import  html2canvas from "html2canvas";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifyComponent } from "../notify/notify.component";

declare var $: any;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit {
  data_; notice; amOnline; success:boolean; stitched_photo = [];
  image1; image2; resnapedImage: string = 'zero'; singleImage;

  notification_msg: object = { msg: null, success: null, cameraComponent: null };

  constructor(
    private server: ServerService, 
    public rout: Router, 
    private localServer: LocalServerService, 
    private Event: CallFuncInAppService,
    private base64: ToBase64Service,
    private sanitizer: DomSanitizer,
    public notifier: NotifyComponent,
    ) { }
    
    ngOnInit(): void {
      
      this.stitched_photo = [];
      // check IF U RE BN ROUTED WEL
      this.getPocId();
      this.success = false;
      this.amOnline = this.server.checkIfIAmOnline();
      
      $(document).ready(function(){
        // click input type file
        $('#file-input').trigger('click');
        // triigger for stitches
        $("#second_snap").click(function() {
          $('#file-input').trigger('click');
        });
        // trigger for resnap
        $(".resnap").click(function() {
          $('#file-input').trigger('click');
        })
      });
    
    this.notice = 'Proceed';
  }

  resnap(x) {
    // remove last index...on click of reSnap
    if(x == 0){
      this.resnapedImage = 'zero';
      this.stitched_photo = this.stitched_photo.pop();    
    }
    // remove at index 0...on click of image 1
    else if(x == 1) {
      this.resnapedImage = 'one';
      console.log(this.resnapedImage);
      console.log(this.resnapedImage);
      this.stitched_photo.shift(); console.log(this.stitched_photo);      
    }
    // remove at index 0...on click of image 2
    else if(x == 2) {
      this.resnapedImage = 'two';
      this.stitched_photo.pop();console.log(this.stitched_photo);
    }
  }
  
  async onImageTaken(event) {
    // on capture make sure to disable proccedbutton
    document.getElementById('proceed').style.display = 'none';
    const file_prop = event.target.files[0];
    // check type of snap
    this.checkSnapType(file_prop);
  }
  
  checkSnapType(file_prop): void {
  
    // single
    if (this.data_.snapType == 'single') {
      // document.getElementById('photo').setAttribute('src', URL.createObjectURL(file_prop));
      this.singleImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file_prop))
      document.getElementById('photo').style.display = 'block';
      document.getElementById('reSnap').style.display = 'inline-block';
      
      // check if portrait/landscape
      setTimeout(() => {       
        if( $('#photo').prop('naturalHeight') < $('#photo').prop('naturalWidth')  ) {
          this.notification_msg = { msg: "Landscape image detected, please hold your device upright.", success: false, cameraComponent: true }
          this.notifier.show();
        } 
        else {
          document.getElementById('proceed').style.display = 'inline-block';
        }
      }, 700);
      // conevrt to base64
      this.base64.toBase64(file_prop);
    } 
    // stiched image
    else if(this.data_.snapType == 'stitched' && this.resnapedImage == 'zero') {
      document.getElementById('imgStitch').style.display = 'inline-block';
      this.stitched_photo.push(URL.createObjectURL(file_prop));
      this.image1 = this.sanitizer.bypassSecurityTrustUrl(this.stitched_photo[0]);
      this.image2 = this.sanitizer.bypassSecurityTrustUrl(this.stitched_photo[1]);
    }
    
    else if(this.data_.snapType == 'stitched' && this.resnapedImage == 'one') {
      document.getElementById('imgStitch').style.display = 'inline-block';
      this.stitched_photo.unshift(URL.createObjectURL(file_prop));
      this.image1 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file_prop));
    }

    else if(this.data_.snapType == 'stitched' && this.resnapedImage == 'two') {
      document.getElementById('imgStitch').style.display = 'inline-block';
      this.stitched_photo.push(URL.createObjectURL(file_prop));
      this.image2 = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file_prop));
    }
        
    else {
      this.rout.navigate(['']);
    };
    
    if(this.stitched_photo.length == 2 && this.data_.snapType == 'stitched') {
      this.image2 = this.sanitizer.bypassSecurityTrustUrl(this.stitched_photo[1]);
      document.getElementById('second_snap').style.display = 'none';
      document.getElementById('stitch').style.display = 'inline-block';
    }
    else if(this.stitched_photo.length == 1 && this.data_.snapType == 'stitched') {
      document.getElementById('reSnap').style.display = 'inline-block';
      document.getElementById('second_snap').style.display = 'inline-block';
      document.getElementById('stitch').style.display = 'none';
    };
  }

  getPocId() {
    this.data_ = this.server.getDataForCamBack();
    
    if(this.data_.poc_id == undefined) {
      this.rout.navigate(['']);
    }
    
  }

  stitch() {
    
    if(this.data_.snapType == 'stitched') {
      // convert the stithced image to single
      setTimeout(() => {
       html2canvas(document.querySelector("#imgStitch"), {allowTaint: true, useCORS: true}).then((canvas)=>{
          
          let image = canvas.toDataURL("image/jpeg", 1.0);
          console.log(image);
          const dbName = new Date().getTime().toString();
          var request = window.indexedDB.open(dbName, 1);
          let data = []; localStorage.setItem("image", dbName);
          data = [ { id: 1, image: image.toString() } ]
          request.onupgradeneeded = (event) => {
            var db = request.result;
            var objectStore = db.createObjectStore("tasks", { keyPath: "id" });
            objectStore.transaction.oncomplete = (event) => {
              // Store values in the newly created objectStore.
              var customerObjectStore = db.transaction("tasks", "readwrite").objectStore("tasks");
              data.forEach(function(customer) {
                customerObjectStore.add(customer);
              });
            };
          };
          document.getElementById('reSnap').style.display = 'inline-block';
          document.getElementById('proceed').style.display = 'inline-block';
          document.getElementById('stitch').style.display = 'none';
        });     
      }, 1500); 
    };
  }

  async proceed() {
  if(this.data_.value=='opportunity') {
    this.rout.navigate(['opportunity']);
  }

  else {
    let dataFrmStore = this.localServer.supplyDataFromLocalStorage();
    // // console.log(this.pocId)

      for (let i = 0; i < dataFrmStore.length; i++) {
        
        if(dataFrmStore[i].id == this.data_.poc_id) {
          dataFrmStore[i].traffic = 'pending';
          dataFrmStore[i].altered = true;
          dataFrmStore[i].dayOfAltered = new Date().getDay();
        }
        
      }
      
      this.localServer.updateLocalDisk(dataFrmStore);
      this.notice = 'Proceed';
      this.success = true;

      // document.getElementById('photo').style.display='none';
      // document.getElementById('reSnap').style.display='none';
      // document.getElementById('proceed').style.display='none';
  
      this.localServer.updateTask(this.server.getDataForCamBack());
      this.Event.Call();    
        setTimeout(() => {
          (localStorage.getItem('who')=='BDR') ?
          window.location.href = "/DailySchedule" :
          window.location.href = "/outlets"
        }, 5000);  
    }
  }

  backFunc() {
    this.rout.navigate([`poc/${this.data_.poc_id}`]);
  }
  
  handleError(status) {
    alert('Network Error, Please go to upload when the network is available');
    this.notice = 'Proceed';
    this.rout.navigate(['MyRoute']);
  }
}

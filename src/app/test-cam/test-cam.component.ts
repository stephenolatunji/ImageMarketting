import { Component, OnInit } from '@angular/core';
import  html2canvas  from "html2canvas";
declare var $: any;
@Component({
  selector: 'app-test-cam',
  templateUrl: './test-cam.component.html',
  styleUrls: ['./test-cam.component.scss']
})
export class TestCamComponent implements OnInit {

  ss;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      html2canvas(document.querySelector("#imgStitch")).then(function(canvas) {
        var img  = document.createElement('a');
        img.setAttribute('download','myImage.png');
        img.text = "hello";
        img.href  = canvas.toDataURL("image/jpeg");
        document.body.appendChild(img);
        // console.log(canvas.toDataURL("image/jpeg"));
        // $('#s').setAttribute("href", canvas.toDataURL("image/jpeg", 1.0))
      });     
    }, 1500);
  }

}

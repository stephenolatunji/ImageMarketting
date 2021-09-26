import { Component, Injectable, Input, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
@Injectable({
  providedIn: 'root'
})

export class NotifyComponent implements OnInit {

  @Input() notification_msg;

  constructor() { }

  ngOnInit(): void {
    this.hide()
  }

  show() {
    $('#notify').modal('show');
  }

  hide() {
    $('#notify').modal('hide');
  }
}

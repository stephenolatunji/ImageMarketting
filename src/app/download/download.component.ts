import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  public promptEvent;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  downloadFunc(): void {
    this.promptEvent.prompt();
    this.promptEvent = false;
  }

}

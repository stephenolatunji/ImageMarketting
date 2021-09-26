import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { outlets } from 'src/assets/data/outlets';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {
  id;
  outlet;

  constructor(private route: ActivatedRoute, private server: ServerService, public rout: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.outlet = outlets[--this.id];
    });
  }

  snapShot(): void {
    let dataForCam = {
      poc_id: this.id,
      value: 'chiller'
    }
    this.server.tempStoreDataForCamera(dataForCam);
    this.rout.navigate(['camera']);
  }

  opportunity(): void {
    let dataForCam = {
      poc_id: this.id,
      value: 'opportunity'
    }
    this.server.tempStoreDataForCamera(dataForCam);
    this.rout.navigate(['camera']);
  }

  survey(): void {
    let dataForCam = {
      poc_id: this.id,
      value: 'survey'
    }
    this.server.tempStoreDataForCamera(dataForCam);
    this.rout.navigate(['survey']);
  }

}

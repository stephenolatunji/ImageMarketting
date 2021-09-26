import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { LocalServerService } from '../../service/local-server.service';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  map: mapboxgl.Map;

  public day;
  public beach;
  public fakerIt;
  public marker;
  public dataCollector;
  public coord;
  public userId;
  showPocList: boolean;

  constructor(
    public rout: Router,
    private server: ServerService,
    private localServer: LocalServerService
  ) { }

  ngOnInit(): void {

    this.coord = {
      lat: localStorage.getItem('lat'),
      long: localStorage.getItem('long'),
    }; 
    
    this.day = this.dateFunc();
    this.dataFunc();

    this.showPocList = true;
  }

  initMap(data) {

    this.dataCollector = data;
    
    // ds must be comin frm local storage
    let lat = parseFloat(this.coord.lat);
    let long = parseFloat(this.coord.long);

    mapboxgl.accessToken = environment.mapboxkey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [long, lat-0.05], // starting position [lng, lat]
      zoom: 10.5 // starting zoom
      });

      
      // outlet location
      this.dataCollector.forEach(element => {
        this.createMarkers([element.longitude, element.latitude])    
      });

      // bdr location
      this.createBDRMarker([long, lat]);
  }

  createMarkers(cord) {

    var el = document.createElement('img');
    el.srcset = 'https://salesboxai.com/wp-content/uploads/2019/05/marker-icon.png';
    el.setAttribute('width', '40px'); 

    const marker = new mapboxgl.Marker(el)
      .setLngLat(cord)
      .addTo(this.map);

  }

  // BDR current Location
  createBDRMarker(cord) {
    var el = document.createElement('img');
    el.srcset = 'https://icongr.am/jam/map-marker-f.svg?size=45&color=333333';

    const marker = new mapboxgl.Marker(el)
      .setLngLat(cord)
      .addTo(this.map);
  }
  
  dataFunc() {

    this.userId = localStorage.getItem('userId');
    let dataCollector_ = [];
    dataCollector_ = this.localServer.supplyDataFromLocalStorage().reverse().filter(dat => dat.schedule.trim() == this.day);
    dataCollector_ = dataCollector_.slice(0, 9);
    if(dataCollector_ !== null) {
    dataCollector_ = dataCollector_.sort(function(a, b){return a.distance - b.distance});
    dataCollector_.forEach(element => {
      if(element.distance > 999) {
        element.distance = (element.distance/1000).toFixed(2)+' km';
      }
      else {
        element.distance = element.distance+' m';
      }
    });
    this.initMap(dataCollector_);
  }

  else {
    this.server.getData(this.userId).subscribe(data=>{
      this.dataCollector=data.pocs;
      this.localServer.updateLocalDisk(this.dataCollector);
      // ds was done when data were nt showin on fifrst login
      setTimeout(() => {
        (this.server.checkIfIAmOnline())?
        window.location.reload() : window.location.reload(false)
      }, 500);
    })
  }

  }

  dateFunc() {
    switch(new Date().getDay()) {
      case 1:
        return 'Monday';
        break;
      case 2:
        return 'Tuesday';
        break;
      case 3:
        return 'Wednesday';
        break;
      case 4:
        return 'Thursday';
        break;
      case 5:
        return 'Friday';
        break;
      case 6:
        return 'Saturday';
        break;
      case 0:
        return 'Sunday';
        break;
    }
  }

  closeCallShedule() {
    document.getElementById('callShedule').style.display = 'none'
  }

  hidePocList() {
    this.showPocList = false;
  }

  showPocListFunc() {
    this.showPocList = true;
  }

}

import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ChillerComponent } from "../chiller/chiller.component";
import { TrophyStoutComponent } from "../trophy-stout/trophy-stout.component";
import { TrophyLagerComponent } from "../trophy-lager/trophy-lager.component";
import { ServerService } from 'src/app/service/server.service';
import { FilterService } from 'src/app/helper/filter.service';
import { CheckIfIsteamleaderService } from 'src/app/helper/check-if-isteamleader.service';
import { NotifyComponent } from 'src/app/notify/notify.component';
import { FilterSkuCordinateService } from "src/app/helper/filter-sku-cordinate.service";

declare var $: any;

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class VisualizerComponent implements OnInit {

data; panelOpenState = false; index: number = 0; currentPath: string; dataToVisualize; trimmedData; trimmedData_;
loading: boolean = false; totalSummation; lists = []; cordinates;
public notification_msg = { msg: null, success: null };

  constructor(
    public chillerFunc: ChillerComponent, 
    public tSFunc: TrophyStoutComponent, 
    public tLFunc: TrophyLagerComponent,
    public server: ServerService,
    public filterIt: FilterService,
    private isTeamLead: CheckIfIsteamleaderService,
    public notifier: NotifyComponent,
    private filterSkuCordinate: FilterSkuCordinateService
    ) { }

  ngOnInit(): void {
    this.currentPath = window.location.pathname;
    const before = `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`;
    const after = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    const type = 'chiller';
    this.getData(before, after, type);    
    
    this.getPointerData();
  }
  
  getData(before, after, type) {
    this.loading = true;
    return this.server.getTaskForAdminDashboard(type, before, after).subscribe(data=>{ 
      this.data = data.sort((a, b) => b.taskId - a.taskId);
      this.loading = !this.loading;
      // isTeamLeadHandler
      this.checkIfTeamLeaadAndFilter(); 
      this.trimmedData = this.data;
      this.trimmedData_ = this.data;
      this.index = 0;
      this.dataToVisualize = this.data[this.index];
      
      this.dataToVisualize.index = this.index;
      this.doSum();
    });
    
  }

  public checkIfTeamLeaadAndFilter() {
    const isTeamLeadData = this.isTeamLead.isTeamLeadHandler();
    isTeamLeadData.superAdmin.length == 0 ?
    this.filterFunc('TEAM_LEADER', isTeamLeadData.user, isTeamLeadData.checkBox) : null;
  }

  filterFunc(filter_by, value, checkBox) {
    this.loading = true;
    this.trimmedData = [];

    if(value) {
    
      this.filterIt.filterFunc(this.data, filter_by, value).then(data=>{
        this.trimmedData = data;
        (data.length == 0)? this.dataToVisualize = null : null;
        (checkBox.good || checkBox.bad || checkBox.glass || checkBox.chest)? this.filter(checkBox, this.trimmedData) : null;
        // am using time out just fr the loading to show ni oooo, no big deal atal
        setTimeout(() => {          
          this.loading = false;
        }, 300);
      });

    }
    else {
      this.trimmedData = this.data
      this.filter(checkBox, this.trimmedData)
    }
      
      
  }

  filter(checkBox, trimmedData) {
    this.closePointerFunc();
    this.loading = true;
    this.trimmedData_ = [];
    this.filterIt.filterCheckBox(checkBox, trimmedData).then(data=>{

      // am using time out just fr the loading to show ni oooo, no big deal atal
      setTimeout(() => {
        
        this.loading = false;
        this.trimmedData_ = data;
        this.index = 0;
        this.dataToVisualize = this.trimmedData_[this.index];
        this.dataToVisualize.index = this.index;
        this.doSum();

      }, 300);
    })
  
  }
  
  next_previous(type, where) :void {

      (type == 'next' && this.index+1  < this.trimmedData_.length)? this.index++ : null;
      (type == 'previous' && this.index > 0)? this.index-- : null;
      this.dataToVisualize = this.trimmedData_[this.index];
      this.dataToVisualize.index = this.index;
      this.doSum();
      this.closePointerFunc();
  }

  doSum(){
    // bud
    (this.dataToVisualize.budweiser_can == null || this.dataToVisualize.budweiser_can == undefined || this.dataToVisualize.budweiser_can == "")? this.dataToVisualize.budweiser_can = 0 : null;
    (this.dataToVisualize.budweiser == null ||  this.dataToVisualize.budweiser == undefined || this.dataToVisualize.budweiser == "")? this.dataToVisualize.budweiser = 0 : null;
    this.dataToVisualize.budTotal = parseInt(this.dataToVisualize.budweiser_can) + parseInt(this.dataToVisualize.budweiser);
    // Trophy Stout
    (this.dataToVisualize.trophy_stout == null ||  this.dataToVisualize.trophy_stout == undefined || this.dataToVisualize.trophy_stout == "")? this.dataToVisualize.trophy_stout = 0 : null;
    
    // Trophy Lager
    (this.dataToVisualize.trophy == null ||  this.dataToVisualize.trophy == undefined || this.dataToVisualize.trophy == "")? this.dataToVisualize.trophy = 0 : null;
    (this.dataToVisualize.trophy_can == null ||  this.dataToVisualize.trophy_can == undefined || this.dataToVisualize.trophy_can == "")? this.dataToVisualize.trophy_can = 0 : null;
    this.dataToVisualize.trophyLagerTotal = parseInt(this.dataToVisualize.trophy) + parseInt(this.dataToVisualize.trophy_can);
    // Eagle
    (this.dataToVisualize.eagle == null ||  this.dataToVisualize.eagle == undefined || this.dataToVisualize.eagle == "")? this.dataToVisualize.eagle = 0 : null;
    (this.dataToVisualize.eagle_stout == null ||  this.dataToVisualize.eagle_stout == undefined || this.dataToVisualize.eagle_stout == "")? this.dataToVisualize.eagle_stout = 0 : null;
    this.dataToVisualize.eagleTotal = parseInt(this.dataToVisualize.eagle) + parseInt(this.dataToVisualize.eagle_stout);
    // Beta Malt
    (this.dataToVisualize.beta_malt == null ||  this.dataToVisualize.beta_malt == undefined || this.dataToVisualize.beta_malt == "")? this.dataToVisualize.beta_malt = 0 : null;
    (this.dataToVisualize.beta_can == null ||  this.dataToVisualize.beta_can == undefined || this.dataToVisualize.beta_can == "")? this.dataToVisualize.beta_can = 0 : null;
    this.dataToVisualize.betaMaltTotal = parseInt(this.dataToVisualize.beta_malt) + parseInt(this.dataToVisualize.beta_can);
    // Grand Malt
    (this.dataToVisualize.grand_malt == null ||  this.dataToVisualize.grand_malt == undefined || this.dataToVisualize.grand_malt == "")? this.dataToVisualize.grand_malt = 0 : null;
    (this.dataToVisualize.grand_can == null ||  this.dataToVisualize.grand_can == undefined || this.dataToVisualize.grand_can == "")? this.dataToVisualize.grand_can = 0 : null;
    this.dataToVisualize.grandMaltTotal = parseInt(this.dataToVisualize.grand_malt) + parseInt(this.dataToVisualize.grand_can);
    // Hero
    (this.dataToVisualize.hero == null ||  this.dataToVisualize.hero == undefined || this.dataToVisualize.hero == "")? this.dataToVisualize.hero = 0 : null;
    (this.dataToVisualize.hero_can == null ||  this.dataToVisualize.hero_can == undefined || this.dataToVisualize.hero_can == "")? this.dataToVisualize.hero_can = 0 : null;
    this.dataToVisualize.heroTotal = parseInt(this.dataToVisualize.hero) + parseInt(this.dataToVisualize.hero_can);
    // Castle Lite
    (this.dataToVisualize.castle_lite == null ||  this.dataToVisualize.castle_lite == undefined || this.dataToVisualize.castle_lite == "")? this.dataToVisualize.castle_lite = 0 : null;

    this.totalSummation = parseInt(this.dataToVisualize.budTotal) + parseInt(this.dataToVisualize.trophy_stout) + parseInt(this.dataToVisualize.trophyLagerTotal) + parseInt(this.dataToVisualize.eagleTotal) + parseInt(this.dataToVisualize.betaMaltTotal) + parseInt(this.dataToVisualize.grandMaltTotal) + parseInt(this.dataToVisualize.heroTotal) + parseInt(this.dataToVisualize.castle_lite);
  }  

  getPointerData() {
    // enable notification
    Notification.requestPermission();

    this.server.getPointerData().subscribe(data=>{
      this.cordinates = data;
    })
  }

  pointerFunc(sku, id) {
    if(this.cordinates.length == 0 ) {
      this.showNotification("Please wait, Poc Eye is fetching SKU coordinates!")
    }

    else {
      (window.innerWidth >= 1600)? 
      this.showNotification('Your Zoom level must be atleast 90% for effective view!') : this.showPointer(sku, id);
    }
  }

  public showNotification(msg){
    new Notification('Poc Eye', { body: msg, icon: "assets/images/logo128.png"});
  }

  public showPointer(sku, id) {
    this.filterSkuCordinate.start(this.cordinates, sku, id).then(data =>{
      if(data) {
        this.lists = data[0];
      }

      else {
        // this.showNotification(`Sorry! Poc Eye was unable to detect ${sku.toUpperCase()} in the image`);
      }
    });
  }

  closePointerFunc() {
    this.lists = []
  }

}

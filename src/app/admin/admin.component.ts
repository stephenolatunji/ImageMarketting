import { Component, OnInit, Input } from '@angular/core';
import { AdminAuthService } from '../service/admin-auth.service';
import { ChillerComponent } from '../task/chiller/chiller.component';
import { TrophyStoutComponent } from '../task/trophy-stout/trophy-stout.component';
import { TrophyLagerComponent } from '../task/trophy-lager/trophy-lager.component';
import { DailySummaryComponent } from '../daily-summary/daily-summary.component';
import { StatisticalSummaryComponent } from '../statistical-summary/statistical-summary.component';
import { VisualizerComponent } from '../task/visualizer/visualizer.component';
import { IndexComponent } from '../charts/index/index.component';
import { GeneralComponent } from '../charts/general/general.component';
import { CheckIfIsteamleaderService } from "src/app/helper/check-if-isteamleader.service";
import { HeroComponent } from '../task/hero/hero.component';
import { DataExcelComponent } from '../data-excel/data-excel.component';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  content: boolean = false; data; tempData; i:number = 0 ; dat;
  searchVal; filterBy: string; trimmedDataForDisplay; daily_summary: boolean = false;
  today; scheduleData; trimmedScheduleData; date; currentPath; week: string = 'Current week'; 
  isTeamLeader: boolean; isTeamLeadData;

  public checkBox = {
    good: true, bad: true, glass: true, chest: true, working_chiller: true, no_working_chiller: true
  }

  constructor(
    public isTeamlead: CheckIfIsteamleaderService,
    private auth: AdminAuthService, 
    public chillerFunc: ChillerComponent,
    public trophyStoutPosterFunc: TrophyStoutComponent,
    public trophyLagerPosterFunc: TrophyLagerComponent,
    public heroPosterFunc: HeroComponent,
    public dailySummaryFunc: DailySummaryComponent,
    public StatSummaryFunc: StatisticalSummaryComponent,
    public VisFunc: VisualizerComponent,
    public chartFunc: IndexComponent,
    public general: GeneralComponent,
    private DataToExcel: DataExcelComponent
    ) { }

  ngOnInit(): void {
  
    (this.auth.isAuthenticated())? this.content = true : this.content = false;
    this.checkUrlPath();

    // checkIFtEAMLEADER
    (this.auth.isAuthenticated())? this.isTeamLeadHandler() : null;

    // call getdata func in data-excel component if it this.data is undefined
    (this.DataToExcel.data == undefined)? this.DataToExcel.getData() : null;
  }

  async timeWindow() {
    let before, after; 

    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, (start, end, label) => {
        // set format: default: "YYYY-MM-DD"
        before = start.format('YYYY-M-D');
        after = end.format('YYYY-M-D');
          
        (this.currentPath == '/admin/bdr-summary' || this.currentPath == '/admin/district-summary')?
        this.StatSummaryFunc.getData(before, after) :
        (this.currentPath == '/admin/chiller')? 
        this.chillerFunc.getData(before, after, 'chiller') :
        (this.currentPath == '/admin/tsp')? 
        this.trophyStoutPosterFunc.getData(before, after, 'fromTimeWindow') : (this.currentPath == '/admin/tlp')? 
        this.trophyLagerPosterFunc.getData(before, after, 'fromTimeWindow') : (this.currentPath == '/admin/hlp')? 
        this.heroPosterFunc.getData(before, after, 'fromTimeWindow') : (this.currentPath.indexOf('/admin/chart') > -1)? 
        this.chartFunc.getData(before, after) : this.VisFunc.getData(before, after, 'chiller');
      });  
        

  }

  checkUrlPath() {
    this.currentPath = window.location.pathname;
    this.filterBy = (this.currentPath == '/admin/district-summary')? 'DISTRICT' : 'BDR';
  }

  // copyFunc(url: string) {
  //   const selBox = document.createElement('textarea');
  //   selBox.style.position = 'fixed';
  //   selBox.style.left = '0';
  //   selBox.style.top = '0';
  //   selBox.style.opacity = '0';
  //   selBox.value = url;
  //   document.body.appendChild(selBox);
  //   selBox.focus();
  //   selBox.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(selBox);
  // };

  isTeamLeadHandler() {
    this.isTeamLeader = this.isTeamlead.isTeamLeadHandler().superAdmin.length == 0? true : false; 
  }

  set(val) {
    this.searchVal = val; this.search();
  }

  filter_by(x) {
  this.filterBy = x.toUpperCase();
  }

  public checkIfTeamLeaadAndFilter() {
    this.isTeamLeadData = this.isTeamlead.isTeamLeadHandler();
    this.isTeamLeadData.superAdmin.length == 0 ?
    null : this.filterBy = 'TEAM_LEADER';
  }

  search() {

    setTimeout(() => {
      switch (this.currentPath) {
        case '/admin/chiller':
          this.chillerFunc.filterFunc(this.filterBy, this.searchVal, this.checkBox);
          setTimeout(() => {
            // remove mmultiple
            this.dat = this.filterBy == 'BDR'? 
            this.chillerFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
            this.filterBy == 'DISTRICT' ?
            this.chillerFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
            this.filterBy == 'TEAM_LEADER' ? 
            this.chillerFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
            this.chillerFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
          }, 600);
  
          break;
  
        case '/admin/visualizer':
          this.VisFunc.filterFunc(this.filterBy, this.searchVal, this.checkBox);
          setTimeout(() => {
            this.dat = this.filterBy == 'BDR'? 
            this.VisFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
            this.filterBy == 'DISTRICT' ?
            this.VisFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
            this.filterBy == 'TEAM_LEADER' ? 
            this.VisFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
            this.VisFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
          }, 600);
          break;
  
        case '/admin/chart/general':
          this.chartFunc.filterFunc(this.filterBy, this.searchVal);
          setTimeout(() => {
            this.dat = this.filterBy == 'BDR'? 
            this.chartFunc.data.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
            this.filterBy == 'DISTRICT' ?
            this.chartFunc.data.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
            this.filterBy == 'TEAM_LEADER' ? 
            this.chartFunc.data.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
            this.chartFunc.data.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
          }, 600);
          break;
  
        case '/admin/tsp':
          this.trophyStoutPosterFunc.filterFunc(this.filterBy, this.searchVal);
          setTimeout(() => {
            this.dat = this.filterBy == 'BDR'? 
            this.trophyStoutPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
            this.filterBy == 'DISTRICT' ?
            this.trophyStoutPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
            this.filterBy == 'TEAM_LEADER' ? 
            this.trophyStoutPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
            this.trophyStoutPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
          }, 600);
          
          break;
  
        case '/admin/tlp':
          this.trophyLagerPosterFunc.filterFunc(this.filterBy, this.searchVal);
          setTimeout(() => {
            this.dat = this.filterBy == 'BDR'? 
            this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
            this.filterBy == 'DISTRICT' ?
            this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
            this.filterBy == 'TEAM_LEADER' ? 
            this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
            this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
          }, 600);
          break;
        
          case '/admin/hlp':
            this.heroPosterFunc.filterFunc(this.filterBy, this.searchVal);
            setTimeout(() => {
              this.dat = this.filterBy == 'BDR'? 
              this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
              this.filterBy == 'DISTRICT' ?
              this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
              this.filterBy == 'TEAM_LEADER' ? 
              this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
              this.trophyLagerPosterFunc.trimmedData.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
            }, 600);
            break;
  
        case '/admin/summary':
          this.dailySummaryFunc.filterFunc(this.filterBy, this.searchVal);
          setTimeout(() => {
            this.dat = this.filterBy == 'BDR'? 
            this.dailySummaryFunc.tempData.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i) :
            this.filterBy == 'DISTRICT' ?
            this.dailySummaryFunc.tempData.filter((v,i,a)=>a.findIndex(t=>(t.district === v.district))===i) :
            this.filterBy == 'TEAM_LEADER' ? 
            this.dailySummaryFunc.tempData.filter((v,i,a)=>a.findIndex(t=>(t.team_lead === v.team_lead))===i) :
            this.dailySummaryFunc.tempData.filter((v,i,a)=>a.findIndex(t=>(t.pocId === v.pocId))===i)
          }, 600);
          
        break;

        case '/admin/district-summary':
          this.StatSummaryFunc.filterFunc(this.filterBy, this.searchVal);
          break;
  
        case '/admin/bdr-summary':
          this.StatSummaryFunc.filterFunc(this.filterBy, this.searchVal);          
          break;
      
        default:
          break;
      }      
    }, 800);
  }

  searchDateForSummary(){
    this.dailySummaryFunc.searchDateForSummary(this.searchVal);
  }

  visualizerFunction() {
    this.chillerFunc.visualizer = true;
  }

  handleTaskDownload() {
    this.DataToExcel.handleConversion();
  }
  
}

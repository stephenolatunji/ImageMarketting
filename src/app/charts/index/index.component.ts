
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetMonthService } from 'src/app/helper/get-month.service';
import { ServerService } from 'src/app/service/server.service';
import { Bdr } from "../bdr";
import { FilterService } from 'src/app/helper/filter.service';
import { GeneralComponent } from "../general/general.component";
// import { BdrRankingComponent } from '../bdr-ranking/bdr-ranking.component';
import { BdrPerWeekComponent } from '../bdr-per-week/bdr-per-week.component';
import { SkuAvailabilityComponent } from '../sku-availability/sku-availability.component';
import { AvailabilitySegmentComponent } from '../availability-segment/availability-segment.component';
import { CheckIfIsteamleaderService } from 'src/app/helper/check-if-isteamleader.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
@Injectable({
  providedIn: "root"
})
export class IndexComponent implements OnInit {

  public data; loading: boolean = true; public good; public bad; public month: string; public year: number; bdrRankingData = []; bdrRank; scheduleData;
  public allData; isTeamLeader: boolean; isTeamLeadData; allBdr; filterBy: string; searchVal: string;
  constructor(
    public server: ServerService, 
    public getMonth: GetMonthService, 
    public router: Router, 
    private filterIt: FilterService,
    private generalChartFunc: GeneralComponent,
    // private bdrRankingChartFunc: BdrRankingComponent,
    private bdrWeeklyChartFunc: BdrPerWeekComponent,
    private sku_availChartFunc:   SkuAvailabilityComponent,
    private availSegmentChartFunc: AvailabilitySegmentComponent,
    private isTeamLead: CheckIfIsteamleaderService
    ) {}

  ngOnInit(): void {
    const before = `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`;
    const after = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;

    // const before = `2020-10-1`;
    // const after = `2020-10-31`;
    
    this.getData(before, after); 
    this.bdrRank = false
  }

  async getData(before, after) { 
    this.loading = true;
    await this.server.getTaskForAdminDashboard('chiller', before, after).subscribe(data=>{
      this.allData = data;
      this.server.getSchedules().subscribe(schedule_data => {
        this.server.getAllBdr().subscribe(allBdr => { 
          this.loading = false;
          this.allBdr = allBdr;
          this.scheduleData = schedule_data;
          // check if teamlead
          this.checkIfTeamLeaadAndFilter();
        })
      });
           
      // do calc for month
      this.month = this.getMonth.getMonth(data[0].date).month;      
      this.year = this.getMonth.getMonth(data[0].date).year;
    });
  }

  private start(data) {
    this.data = data;
     // do calc for various chart data
     const generalChartData = this.doGeneral(data);
     this.bdrRankingData = this.doBdrRanking(data, this.scheduleData); 
     const bdrWeeklyData = this.doBdrWeekly(data);
     const sku_avail = this.doSkuAvail(data);   
     const availSegment = this.doAvailSegment(data);
    // send data to the chart component and render
     this.generalChartFunc.renderChart(generalChartData);
    //  this.bdrRankingChartFunc.renderChart(this.bdrRankingData);
     this.bdrWeeklyChartFunc.renderChart(bdrWeeklyData);
     this.sku_availChartFunc.renderChart(sku_avail);
     this.availSegmentChartFunc.renderChart(availSegment);
  }

  public checkIfTeamLeaadAndFilter() {
    this.isTeamLeadData = this.isTeamLead.isTeamLeadHandler();
    if(this.isTeamLeadData.superAdmin.length == 0) {
        this.isTeamLeader = true;
        this.filterFunc('TEAM_LEADER', this.isTeamLeadData.user)
    }
    else {
      this.start(this.allData)
      this.isTeamLeader = false;
    } 
 }

  public filterFunc(filterBy, searchValue) {
    this.filterBy = filterBy; this.searchVal = searchValue;
    this.loading = true;
    this.filterIt.filterFunc(this.allData, filterBy, searchValue).then(data=>{
        this.data = data;
        this.start(data);
        // am using time out just fr the loading to show ni oooo, no big deal atal
        setTimeout(() => {          
          this.loading = false;
        }, 300);
      });
  }

  doGeneral(data) {
    let bad_ = data.filter(data=>data?.action=='bad').length;
    let good_ = data.filter(data=>data?.action=='success').length;      
      
    this.bad = ((bad_/(bad_+good_))*100).toFixed(1); //convert bad execution to percentage
    this.good = ((good_/(bad_+good_))*100).toFixed(1); //convert bad execution to percentage
    
    return [this.bad, this.good];
  }
  
  doBdrRanking(data, schedule_data) {
    let res = [];
    // if teamlead signs in     
    const newData = this.isTeamLeader?
    this.allBdr?.filter(dat => dat.tl == this.isTeamLeadData.user) : 
    this.filterBy == 'TEAM_LEADER' ? this.allBdr?.filter(dat => dat.tl.indexOf(this.searchVal) > -1  )  : this.allBdr;
 
    newData.map(bdr => {
        const filteredData = data?.filter(dat => dat.email.toLowerCase() == bdr.email.toLowerCase());
        const bdr_plan_data = schedule_data?.filter(dat => dat.email.toLowerCase() == bdr.email.toLowerCase());
        const totalTaskExec = filteredData.length;
        const bdr_task_plan = bdr_plan_data[0]?.total;
        const totalGoodExec = filteredData?.filter(dat => dat.action == 'success').length;
        const totalBadExec = filteredData?.filter(dat => dat.action == 'bad').length;

        const percExecuted = ((totalTaskExec/bdr_task_plan)*100).toFixed(1);
        const percGood = totalTaskExec == 0? 0 : ((totalGoodExec/totalTaskExec)*100).toFixed(1);
        const percBad = totalTaskExec == 0? 0 : ((totalBadExec/totalTaskExec)*100).toFixed(1);
        const ranking = totalTaskExec == 0? 0 : ((totalGoodExec/bdr_task_plan)*100).toFixed(1);

        const result = {
          "email": bdr.email,
          "plan": bdr_task_plan,
          "totalTaskExec": totalTaskExec,
          "totalGoodExec": totalGoodExec,
          "totalBadExec": totalBadExec,
          "perc_task_Executed": percExecuted,
          "percGood": percGood,
          "percBad": percBad,
          ranking
        }

        res.push(result);
        // res.sort((a, b) => b.ranking - a.ranking); this is d nowmal formular fr sort but u can condition it to sort wit two conditions
        res.sort((a,b) => {
          if(a.ranking == 0 && b.ranking == 0) {
            return b.perc_task_Executed - a.perc_task_Executed
          }
          else {
            return b.ranking - a.ranking
          }
          
        })
      })
      console.log(res)
    return res;
  }

  doBdrWeekly(data) {
    let res = [];
    // get the weeks inside the fetched task by deleting multiple weeks
    const week = data.filter((v,i,a)=>a.findIndex(t=>(t.week === v.week))===i);
    // then map d week to get what u want in d fetced data
    week.map(dat=>{
      const result = data.filter(data => dat.week == data.week);
      const good = result.filter(data => data.action == 'success').length;
      const bad = result.filter(data => data.action == 'bad').length;
      const total = good + bad;
      const percBad = ((bad/total)*100).toFixed(0);
      const percGood = ((good/total)*100).toFixed(0);
      const _res = {
        week: dat.week,
        good,
        bad, total, percBad, percGood
      };

      res.push(_res);
    })
    return res;
  }

  doSkuAvail(data) {
    let res = []; let num = []; let label = [];
    num[0] = data.filter(item => item.trophy > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[1] = data.filter(item => item.trophy_can > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[2] = data.filter(item => item.trophy_stout > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[3] = data.filter(item => item.budweiser > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[4] = data.filter(item => item.budweiser_can > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[5] = data.filter(item => item.beta_can > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[6] = data.filter(item => item.beta_malt > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[7] = data.filter(item => item.castle_lite > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[8] = data.filter(item => item.eagle > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[9] = data.filter(item => item.eagle_stout > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[10] = data.filter(item => item.grand_can > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[11] = data.filter(item => item.grand_malt > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[12] = data.filter(item => item.hero > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;
    num[13] = data.filter(item => item.hero_can > 0 && item.chillerPresent == 'Yes' && item.glass == 1).length;

    const total = data.filter(item => item.chillerPresent == 'Yes' && item.glass == 1).length;
    
    label[0] = 'Trophy';
    label[1] = 'Trophy Can';
    label[2] = 'Trophy Stout';
    label[3] = 'Bud';
    label[4] = 'Bud Can';
    label[5] = 'Beta Can';
    label[6] = 'Beta Malt';
    label[7] = 'Castle Lite';
    label[8] = 'Eagle';
    label[9] = 'Eagle Stout';
    label[10] = 'Grand Can';
    label[11] = 'Grand Malt';
    label[12] = 'Hero';
    label[13] = 'Hero Can';

    num.map((dat, i) => {
      res[i] = ((dat/total)*100).toFixed(1);
    })

    return [res, label]
  }

  doAvailSegment(data) {
    let good = []; let bad = []; let totalExecution = [];

    data.map(dat => {
      let i = 0;
      (dat.trophy !=='' && dat.trophy > 0 || dat.trophy_can !== '' && dat.trophy_can > 0)?
      i++ : null;

      (dat.budweiser !=='' && dat.budweiser > 0 || dat.budweiser_can !== '' && dat.budweiser_can > 0)?
      i++ : null;
      
      (dat.beta_malt !=='' && dat.beta_malt > 0 || dat.beta_can !== '' && dat.beta_can > 0)?
      i++ : null;
      
      (dat.grand_malt !=='' && dat.grand_malt > 0 || dat.grand_can !== '' && dat.grand_can > 0)?
      i++ : null;
      
      (dat.hero !=='' && dat.hero > 0 || dat.hero_can !== '' && dat.hero_can > 0)?
      i++ : null;

      (dat.trophy_stout !=='' && dat.trophy_stout > 0)?
      i++ : null;
      
      (dat.castle_lite !=='' && dat.castle_lite > 0)?
      i++ : null;
      
      (dat.eagle !=='' && dat.eagle > 0)?
      i++ : null;

      (dat.eagle_stout !=='' && dat.eagle_stout > 0)?
      i++ : null;

      dat.availability = i;
    });

    for (let x = 0; x <= 5; x++) {
      good[x] = x < 5 ?
      data.filter(dat => dat.availability == x && dat.action == 'success' && dat.chillerPresent == 'Yes' && dat.glass == 1).length :
      data.filter(dat => dat.availability >= 5 && dat.action == 'success' && dat.chillerPresent == 'Yes' && dat.glass == 1).length;    

      bad[x] = x < 5 ?
      data.filter(dat => dat.availability == x && dat.action == 'bad' && dat.chillerPresent == 'Yes' && dat.glass == 1).length :
      data.filter(dat => dat.availability >= 5 && dat.action == 'bad' && dat.chillerPresent == 'Yes' && dat.glass == 1).length;    
    };

    totalExecution = good.concat(bad);
    const total = totalExecution.reduce((accum, item) => accum + Number(item));

    good.forEach((element, y) => {
      good[y] = ((element/total) * 100).toFixed(1);
    });
    bad.forEach((element, y) => {
      bad[y] = ((element/total) * 100).toFixed(1);
    });

    return [bad, good]
  }

  backFunc() {  
    window.location.reload()
  }  

}

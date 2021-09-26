import { Component, OnInit, Injectable } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { CheckIfIsteamleaderService } from '../helper/check-if-isteamleader.service';
import { FilterService } from '../helper/filter.service';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-statistical-summary',
  templateUrl: './statistical-summary.component.html',
  styleUrls: ['./statistical-summary.component.scss']
})

export class StatisticalSummaryComponent implements OnInit {

  public data; loading: boolean; totalPercPocSurvey; totalPercIblChiller; totalPercGlassChiller; totalPercGoodExec;
  public trimmedData; type; totalUniverse: number; totalPocSurvey: number; totalIblChiller: number; totalChillerFound: number; totalGoodExec: number;
  totalGlassChiller: number; totalPercChillerFound; ;

  constructor(
    private server: ServerService,
    private isTeamLead: CheckIfIsteamleaderService,
    private filterIt: FilterService
    ) { }

  ngOnInit(): void {
    this.checkUrlPath();
    const before = `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`;
    const after = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    
    this.getData(before, after);
  }

  checkUrlPath() {
    this.type = (window.location.pathname == '/admin/district-summary')? 'District' : 'BDR';
    return this.type
  }

  getData(before, after) {
    this.loading = true;
     this.server.getDataForSummary(this.checkUrlPath(), before, after).subscribe(data=>{
       this.data = data;
       this.trimmedData = this.data;
       this.type == 'District'? null : this.checkIfTeamLeaadAndFilter();
       this.loading = false;
       // get total calculations done
       setTimeout(() => {
         this.totalOfPercentages();       
       }, 500);
     });

  }

  public checkIfTeamLeaadAndFilter() {
    const isTeamLeadData = this.isTeamLead.isTeamLeadHandler();
    isTeamLeadData.superAdmin.length == 0 ?
    this.filterFunc('TEAM_LEADER', isTeamLeadData.user) : null;
  }

  filterFunc(filter_by, value) {
    this.loading = true;
    this.trimmedData = [];
    if(value) {
      console.log(this.data)
      this.filterIt.filterFunc(this.data, filter_by, value).then(data=>{
        this.trimmedData = data;
        // am using time out just fr the loading to show ni oooo, no big deal atal
        setTimeout(() => {          
          this.loading = false;
        }, 300);
      });

    }
    else {
      this.trimmedData = this.data
    }
  }  

  
  // total calculations
  totalOfPercentages() {
    console.log(this.trimmedData)
    this.totalUniverse = (this.trimmedData.reduce((accum,dat) => accum + parseFloat(dat.universe), 0)).toFixed(1);

    this.totalPocSurvey = (this.trimmedData.reduce((accum,dat) => accum + parseFloat(dat.pocSurveyed), 0)).toFixed(1);
    this.totalIblChiller = (this.trimmedData.reduce((accum,dat) => accum + parseFloat(dat.iblChiller), 0)).toFixed(1);
    this.totalChillerFound = (this.trimmedData.reduce((accum,dat) => accum + parseFloat(dat.chillersFound), 0)).toFixed(1);
    this.totalGoodExec= (this.trimmedData.reduce((accum,dat) => accum + parseFloat(dat.goodExec), 0)).toFixed(1); 
    this.totalGlassChiller = (this.trimmedData.reduce((accum,dat) => accum + parseFloat(dat.glass), 0)).toFixed(1); 

    this.totalPercPocSurvey =  ((this.totalPocSurvey/this.totalUniverse)*100).toFixed(1);
    this.totalPercIblChiller =  ((this.totalIblChiller/this.totalUniverse)*100).toFixed(1);
    this.totalPercChillerFound =  ((this.totalChillerFound/this.totalUniverse)*100).toFixed(1);
    this.totalPercGoodExec =  ((this.totalGoodExec/this.totalUniverse)*100).toFixed(1);
    this.totalPercGlassChiller=  ((this.totalGlassChiller/this.totalUniverse)*100).toFixed(1);
    
  }

}
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CheckIfIsteamleaderService } from '../helper/check-if-isteamleader.service';
import { FilterService } from '../helper/filter.service';
import { ServerService } from '../service/server.service';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.scss']
})

export class DailySummaryComponent implements OnInit {

  // @Input() scheduleData;

  public data; today; tempData; slashAdmin: boolean = false; loading: boolean = true;

  constructor(
    private server: ServerService,
    private isTeamLead: CheckIfIsteamleaderService,
    private filterIt: FilterService
    ) { }

  ngOnInit(): void {
    let date = new Date().getFullYear() + '-' + (new Date().getMonth() + parseInt("1")) + '-' + new Date().getDate();
    this.loading = true;
    this.server.getDataForAdminSummry(date).subscribe(data=>{
      this.data = data.schedule;
      this.tempData = data.schedule;
      this.loading = false;
      this.checkIfTeamLeaadAndFilter();
    })
    this.today = new Date().getDay();

    if(window.location.pathname=='/admin'){
      this.slashAdmin = true;
    }
  }

  searchDateForSummary(value){
    this.server.getDataForAdminSummry(value).subscribe(data=>{
      this.data = data.schedule;
      this.tempData = data.schedule;
    })
  }

  public checkIfTeamLeaadAndFilter() {
    const isTeamLeadData = this.isTeamLead.isTeamLeadHandler();
    isTeamLeadData.superAdmin.length == 0 ?
    this.filterFunc('TEAM_LEADER', isTeamLeadData.user) : null;
  }

  
  filterFunc(filter_by, value) {
    this.loading = true;
    this.tempData = [];
    if(value) {
      console.log(this.data, filter_by, value)
      this.filterIt.filterFunc(this.data, filter_by, value).then(data=>{
        this.tempData = data;
        // am using time out just fr the loading to show ni oooo, no big deal atal
        setTimeout(() => {          
          this.loading = false;
        }, 300);
      });

    }
    else {
      this.tempData = this.data
    }
  } 

  // totalDailyPocs(data) {
  //   switch(new Date().getDay()) {
  //     case 1:
        
  //       break;
  //     case 2:
  //       return 'Tuesday';
  //       break;
  //     case 3:
  //       return 'Wednesday';
  //       break;
  //     case 4:
  //       return 'Thursday';
  //       break;
  //     case 5:
  //       return 'Friday';
  //       break;
  //     case 6:
  //       return 'Saturday';
  //       break;
  //     case 0:
  //       return 'Sunday';
  //       break;
  //   }
  // }

}

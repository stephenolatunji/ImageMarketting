import { Component, OnInit, Injectable } from '@angular/core';
import { CheckIfIsteamleaderService } from 'src/app/helper/check-if-isteamleader.service';
import { FilterService } from 'src/app/helper/filter.service';
import { ServerService } from 'src/app/service/server.service';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  public data; trimmedData; visualizer: boolean = false;
  dataToVisualize; dataToVisualizeIndex: number; loading: boolean = false;

  constructor(
    private server: ServerService,
    private isTeamLead: CheckIfIsteamleaderService,
    private filterIt: FilterService
    ) { }

  ngOnInit(): void {

    const before = `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`;
    const after = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    
    this.getData(before, after, 'onload');

  }
  
  getData(before, after, who) {
    this.loading = true;
    this.server.getTaskForAdminDashboard('hero_pp', before, after).subscribe(data=>{
      this.data = data.sort((a, b) => b.taskId - a.taskId);
      this.loading = !this.loading;
      // who == 'onload'? this.data = data.reverse() : this.data = data;
      // isTeamLeadHandler
      this.checkIfTeamLeaadAndFilter(); 
      this.trimmedData = this.data;
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

    // visualizer
    visualizeMe(data, i) {
      this.dataToVisualizeIndex = i;
      this.dataToVisualize = data;
      this.dataToVisualize.index = i;
      this.visualizer = !this.visualizer;
    }
  
    next_previous(type) {
  
      switch (type) {
        case 'next':
          (this.dataToVisualizeIndex >= this.trimmedData.length-1)? this.dataToVisualizeIndex : this.dataToVisualizeIndex++;
          break;
        case 'previous':
          (this.dataToVisualizeIndex <= 0)? this.dataToVisualizeIndex : this.dataToVisualizeIndex--;
          default:
            break;
        }
        
        this.dataToVisualize = this.trimmedData[this.dataToVisualizeIndex];
        this.dataToVisualize.index = this.dataToVisualizeIndex;
    }

}
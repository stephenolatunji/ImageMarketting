import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { FilterService } from 'src/app/helper/filter.service';
import { CheckIfIsteamleaderService } from "src/app/helper/check-if-isteamleader.service";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-chiller',
  templateUrl: './chiller.component.html',
  styleUrls: ['./chiller.component.scss']
})
export class ChillerComponent implements OnInit {

  // @ViewChild(VisualizerComponent) visFunc: VisualizerComponent;

  public data; trimmedData; loading:boolean = false; visualizer: boolean;
  dataToVisualize; dataToVisualizeIndex: number; trimmedData_;

  constructor( 
    private server: ServerService, 
    private filterIt: FilterService,
    private isTeamLead: CheckIfIsteamleaderService
    ) { }
  

  ngOnInit(): void {

    const before = `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`;
    const after = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    
    this.getData(before, after, 'onload');  
  }

  getData(before, after, who) {
  
    this.loading = true;
    return this.server.getTaskForAdminDashboard('chiller', before, after).subscribe(data=>{

      this.loading = !this.loading;
      // when dey demand fr filter....put it here
      this.data = data.sort((a, b) => b.taskId - a.taskId);
      this.trimmedData = this.data;
      this.trimmedData_ = this.data;
      // isTeamLeadHandler
      this.checkIfTeamLeaadAndFilter();  
      return this.trimmedData;
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
        (checkBox.good || checkBox.bad || checkBox.glass || checkBox.chest || checkBox.no_working_chiller || checkBox.working_chiller)? this.filter(checkBox, this.trimmedData) : null;
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
    this.loading = true;
    this.trimmedData_ = [];
    this.filterIt.filterCheckBox(checkBox, trimmedData).then(data=>
      // am using time out just fr the loading to show ni oooo, no big deal atal
      setTimeout(() => {
        
        this.loading = false;
        this.trimmedData_ = data;
        
      }, 300)
    )
  }

  // // go back to previous week
  // previous(){
  //   this.currentWeek = this.currentWeek-1;
  //   this.loading = true;
  //   this.server.getTaskForAdminDashboard('chiller', this.currentWeek).subscribe(data=>{
  //     this.loading = !this.loading;
  //     this.data = data.reverse();
  //     this.trimmedData = this.data;
  //   });
  // }

  // // go back to previous week
  // next(){
  //   this.currentWeek = this.currentWeek+1;
  //   this.loading = true;
  //   this.server.getTaskForAdminDashboard('chiller', this.currentWeek).subscribe(data=>{
  //     this.loading = !this.loading;
  //     this.data = data.reverse();
  //     this.trimmedData = this.data;
  //   });
  // }

  // visualizer
  // visualizeMe(data, i) {
  //   this.dataToVisualizeIndex = i;
  //   this.dataToVisualize = data;
  //   this.dataToVisualize.index = i;
  //   this.visualizer = !this.visualizer;
  // }

  // next_previous(type) {

  //   switch (type) {
  //     case 'next':
  //       (this.dataToVisualizeIndex >= this.trimmedData.length-1)? this.dataToVisualizeIndex : this.dataToVisualizeIndex++;
  //       break;
  //     case 'previous':
  //       (this.dataToVisualizeIndex <= 0)? this.dataToVisualizeIndex : this.dataToVisualizeIndex--;
  //       default:
  //         break;
  //     }
      
  //     this.dataToVisualize = this.trimmedData[this.dataToVisualizeIndex];
  //     this.dataToVisualize.index = this.dataToVisualizeIndex;
  // }

}

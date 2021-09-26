import { Component, OnInit, Injectable } from '@angular/core';
import { ServerService } from '../service/server.service';
import { AngularCsv } from 'angular-csv-files/dist/Angular-csv';

@Component({
  selector: 'app-data-excel',
  templateUrl: './data-excel.component.html',
  styleUrls: ['./data-excel.component.scss']
})
@Injectable({
  providedIn: "root"
})
export class DataExcelComponent implements OnInit {
  data;
  constructor(private server:  ServerService) { }

  ngOnInit(): void {
  }
  // this function is being triggered by admin component if this.data is undefined
  public getData() {
    this.server.getTaskForConversionToExcel().subscribe(data=>{
      this.data = data
    })
  }

  handleConversion ()  {
    // get data
    var options = { 
      showLabels: true, 
      showTitle: true,
      title: 'Poc Eye Data',
      useBom: true,
      headers: ["TaskId", "Action", "BDR", "Week", "Task Type", "Image", "Date", 
      "Time", "Glass", "Chest", "Whitespace Presence", "%WhiteSpace", "Contaminated", "Budweiser (RGB)", "Budweiser (Can)",
      "Trophy (Can)", "Trophy (RGB)", "Trophy Stout", "Beta Malt (RGB)", "Beta Malt (Can)", "Castle Lite", 
      "Eagle Lager", "Eagle Stout", "Grand Malt (Can)", "Grand Malt (RGB)", "Hero (RGB)", 
      "Hero (Can)", "Chiller Presence", "Competitor Brand", "Competitor Chiller", "Weekly IBL",
      "Cooler Status", "#IBL Chiller", "Outlet Status", "Poc ID", "BDR Name", "Feedback", "Image Quality", "District", "Region"],
      nullToEmptyString: true,
    };
    
    new AngularCsv(this.data, 'Poc Eye Data', options);
    
  }

}

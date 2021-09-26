import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import { GetMonthService } from 'src/app/helper/get-month.service';
import { Chart, plugins } from 'chart.js';
declare var $:any; 

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

@Injectable({
  providedIn: "root"
})

export class GeneralComponent implements OnInit {

  loading: boolean = true; public good; public bad; public month: string; public year: number;
  private chart;
  constructor(public server: ServerService, public getMonth: GetMonthService) {}

  ngOnInit(): void {
  }

  renderChart(data) {
    
    if(this.chart==undefined){
      this.showChat(data)
    }
    else {
      this.chart.destroy();
      this.showChat(data);
    }

  }

  showChat(data) {
    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    const ctx = canvas.getContext('2d');  
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Bad", "Good"],
        datasets: [{
          backgroundColor: ["red", "green"],
          borderColor: ['#E66A56', '#07A444'],
          data: data
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Good vs Bad Execution'
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
        }
      }
    });
  }
}

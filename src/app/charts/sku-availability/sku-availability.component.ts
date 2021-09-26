import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sku-availability',
  templateUrl: './sku-availability.component.html',
  styleUrls: ['./sku-availability.component.scss']
})

@Injectable({
  providedIn: "root"
})

export class SkuAvailabilityComponent implements OnInit {

  public columnBgColor = []; private chart;

  constructor() { }

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
    const allPercData = data[0];
    allPercData?.map((dat, i) => {
      this.columnBgColor[i] =  dat >=70 ? 'green' : dat >= 40? 'yellow' : 'rgba(252, 0, 0, 0.8)';
    });
    
    const ctx__ = <HTMLCanvasElement> document.getElementById('chart');
  
    this.chart = new Chart(ctx__, 
      { 
        type: 'bar',
  
      data: {
      labels: data[1],
      datasets: [{
          label: '',
          data: data[0],
          backgroundColor: this.columnBgColor,
          // borderColor: [
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)',
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)',
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)',
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)',
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)',
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)',
          //   'rgba(252, 252, 14, 0.568)',              
          //   'rgba(252, 252, 14, 0.568)'
          // ],
          borderWidth: 0
      }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },

        title: {
          display: true,
          text: 'SKU Availability'
        },
        tooltips: {
          displayColors: true,
          callbacks: {
            label: (tooltipItem, data) => {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
        },
      }
    })
  }
}

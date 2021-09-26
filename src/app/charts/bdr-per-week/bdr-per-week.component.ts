import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bdr-per-week',
  templateUrl: './bdr-per-week.component.html',
  styleUrls: ['./bdr-per-week.component.scss']
})

@Injectable({
  providedIn: "root"
})

export class BdrPerWeekComponent implements OnInit {

  bdrData; allAssembledData; chart

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
    this.bdrData = data;
    const allGoods = []; const allBads = []; const allLabels = [];

    this.bdrData.map(dat => { 
      allGoods.push(dat.percGood);
      allBads.push(dat.percBad);
      allLabels.push(dat.week);

      return this.allAssembledData = {
        allGoods, allBads, allLabels
      }
    });
    

    const ctx_ = <HTMLCanvasElement> document.getElementById('myChart_');

    this.chart = new Chart(ctx_, 
      { type: 'bar',
      // data: { labels: this.allAssembledData.allLabels, 
      // remove the below when u are ready to use the normal auto week rather than hard0code
        data: { 
          labels: this.allAssembledData.allLabels, 
          datasets: [
            { label: 'Bad', backgroundColor: "rgba(255, 0, 0, 0.8)", data: this.allAssembledData?.allBads }, 
            { label: 'Good', backgroundColor: "rgba(16, 238, 16, 0.459)", data: this.allAssembledData?.allGoods }
          ], 
        },         
        options: { 
          title: {
            display: true,
            text: 'BDR Weekly Chart'
          },
          tooltips: {
            displayColors: true,
            callbacks: {
              label: (tooltipItem, data) => {
            //     for (let index = 0; index < 2; index++) {
                  
                  return 'Bad: ' +data['datasets'][0]['data'][tooltipItem['index']] + '%' + ', '+ 'Good: ' +data['datasets'][1]['data'][tooltipItem['index']] + '%';
                  
                }
              }
            // }
          },
          scales: { xAxes: [{ stacked: true, gridLines: { display: false, } }], 
          yAxes: [{ stacked: true, ticks: { beginAtZero: true, }, type: 'linear', }] }, 
          responsive: true, maintainAspectRatio: false, legend: { position: 'bottom' }, 
        } 
    });
  }


}

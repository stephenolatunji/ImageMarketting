import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-availability-segment',
  templateUrl: './availability-segment.component.html',
  styleUrls: ['./availability-segment.component.scss']
})

@Injectable({
  providedIn: "root"
})

export class AvailabilitySegmentComponent implements OnInit {
  private chart;
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
    const avail_segment_canvas = <HTMLCanvasElement> document.getElementById('avail_segment_chart_');
    const avail_segment_ctx = avail_segment_canvas.getContext('2d');  
    this.chart = new Chart(avail_segment_ctx, 
      { 
        type: 'bar',
        data: { labels: [0, 1, 2, 3, 4, '>=5'], 
          datasets: [
            { label: 'Bad', backgroundColor: "rgba(255, 0, 0, 0.8)", data: data[0] }, 
            { label: 'Good', backgroundColor: "rgba(16, 238, 16, 0.459)", data: data[1] }
          ], }, 
          
          options: { 
            title: {
              display: true,
              text: '% Poc Per Availability Segment'
            },
            tooltips: {
              displayColors: true,
              callbacks: {
                label: (tooltipItem, data) => {
                  return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                }
              }
            },
            scales: { xAxes: [{ stacked: true, gridLines: { display: false, } }], 
            yAxes: [{ stacked: true, ticks: { beginAtZero: true, }, type: 'linear', }] }, 
            responsive: true, maintainAspectRatio: false, legend: { position: 'bottom' }, 
        } 
    })
  }

}

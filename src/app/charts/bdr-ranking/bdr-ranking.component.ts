import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bdr-ranking',
  templateUrl: './bdr-ranking.component.html',
  styleUrls: ['./bdr-ranking.component.scss']
})
export class BdrRankingComponent implements OnInit {
  
  @Input() bdrData;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bdr-ranking-page',
  templateUrl: './bdr-ranking-page.component.html',
  styleUrls: ['./bdr-ranking-page.component.scss']
})

export class BdrRankingPageComponent implements OnInit {

  @Input() data; 

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }
}

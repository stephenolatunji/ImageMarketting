import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMonthService {

  constructor() { }

  getMonth(date) {
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return ({"month": month[new Date(date).getMonth()], "year": new Date(date).getFullYear()});
  }
}

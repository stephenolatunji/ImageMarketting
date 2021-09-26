import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class LocalServerService {
  diskChecker: boolean;
  constructor(public http: HttpClient, public server: ServerService) { }

  isDiskEmpty() {
    return false
  }

  updateLocalDisk(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  supplyDataFromLocalStorage()  {
    return JSON.parse(localStorage.getItem('data'));
  }

  supplyTaskFromLocalStorage() {
    return JSON.parse(localStorage.getItem('task'));
  }

  supplyOpportunityFromLocalStorage() {
    return JSON.parse(localStorage.getItem('opportunity'));
  }

  supplySurveyFromLocalStorage() {
    return JSON.parse(localStorage.getItem('survey'));
  }

  updateTask(data) {
  
    let taskInArray = [];
    if(data.results && data.result!==0) {
      localStorage.setItem('task', JSON.stringify(data.results));
    }
    else {
      (JSON.parse(localStorage.getItem('task')) == null) ?
      null :
      taskInArray = JSON.parse(localStorage.getItem('task'));
      let date = new Date();
  
      let task = {
        pocId: data.poc_id,
        taskType: data.value,
        user: localStorage.getItem('userId'),
        date: date.getFullYear() + '-'+ (date.getMonth()+parseInt("1")) + '-'+date.getDate(),
        time: date.getHours()+':'+date.getMinutes(),
        image_name: localStorage.getItem('image'),
        action: 'pending',
        chillerPresence: data.chillerPresence,
        outletStatus: data.outletStatus,
        how_many_chiller: data.how_many_chiller,
        cooler_status: data.cooler_status,
        how_many_ibl_weekly: data.how_many_ibl_weekly,
        competitor_chiller: data.competitor_chiller,
        cases_of_competitor_brand_weekly: data.cases_of_competitor_brand_weekly
      }
  
      taskInArray.push(task);
      localStorage.setItem('image', '');
      localStorage.setItem('task', JSON.stringify(taskInArray));
    }

  }

  updateTaskFromServer(data) {
    let taskInArray;

    (JSON.parse(localStorage.getItem('task')) == null) ?
    taskInArray = [] :
    taskInArray = JSON.parse(localStorage.getItem('task'));
    localStorage.setItem('task', JSON.stringify(taskInArray.concat(data)));
  }


  updateOpportunity(data, opportunity) {
    let opportunityArray = [];
    (JSON.parse(localStorage.getItem('opportunity')) == null)?
    null :
    opportunityArray = JSON.parse(localStorage.getItem('opportunity'));

    let date = new Date();
    
    opportunity.user = localStorage.getItem('userId');
    opportunity.date = date.getDate()+'-'+ (date.getMonth()+parseInt("1"))+'-'+date.getFullYear();
    opportunity.time = date.getHours()+':'+date.getMinutes();
    opportunity.image_name = localStorage.getItem('image'),
    opportunity.action = 'pending';
    opportunity.pocId = data.poc_id;

    opportunityArray.push(opportunity);
    localStorage.setItem('image', '');

    localStorage.setItem('opportunity', JSON.stringify(opportunityArray));
  }

  updateSurvey(data) {
    let surveyArray = [];
    (JSON.parse(localStorage.getItem('survey')) == null)?
    null :
    surveyArray = JSON.parse(localStorage.getItem('survey'));

    let date = new Date();
    
    data.user = localStorage.getItem('userId');
    data.pocId = this.server.getDataForCamBack().poc_id;
    data.date = date.getDate()+'-'+ (date.getMonth()+parseInt("1"))+'-'+date.getFullYear();
    data.time = date.getHours()+':'+date.getMinutes();
    data.image = localStorage.getItem('image'),
    data.action = 'pending';

    surveyArray.push(data);
    localStorage.setItem('image', '');

    localStorage.setItem('survey', JSON.stringify(surveyArray));
  }

}
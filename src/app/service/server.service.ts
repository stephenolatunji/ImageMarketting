import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  data; keeper; imageUrl;
  private cache: any; newDataLog = [];
  public poc = {lat: null, long:null};
  public keepData = { poc_id: null, value: null };
  keepDataForSearch;

  constructor(public http: HttpClient) { }

  logMeInMyDear(data) {
    return this.http.post<any>(`${environment.fakeUrl}/login`, data);
  }

  logMeInAsAdmin(data) {
    return this.http.post<any>(`${environment.fakeAdminUrl}/login`, data);
  }

  verifyEmail(email) {
    // return this.http.get<any>(`${this.base_url}user/${email}`);
    return this.http.get<any>(`${environment.fakeUrl}/checkUser/${email}`);
  }
  getData(email) {
    // return this.http.get<any>(`${this.base_url}user/${email}`);
    return this.http.get<any>(`${environment.fakeUrl}/user/${email}`);
  }
  getTask(email) {
    // return this.http.get<any>(`${this.base_url}user/${email}`);
    return this.http.get<any>(`${environment.fakeTaskUrl}/user/${email}`);
  }

  getSchedules() {
    return this.http.get<any>(`${environment.fakeAdminUrl}/schedule`);
  }

  checkIfIAmOnline() {
    return navigator.onLine;
  }

  setPassword(data) {
    return this.http.patch<any>(`${environment.fakeUrl}/user/${data.email}`, data);
  }

  uploadDataFrmLocalServer(task, opportunity, survey, user) {    
    return this.http.post<any>(`${environment.fakeTaskUrl}`, {task, opportunity, survey, user});
  }

  setData(data) {
    this.keeper = data;
    return this.keeper;
  }

  getSavedData() {
    return this.keeper;
  }

  getPocValidation(pocCoord) {
      // let data = JSON.parse(localStorage.getItem('data'));
      let userLat = parseFloat(localStorage.getItem('lat'));
      let userLong  = parseFloat(localStorage.getItem('long'));

      // data.forEach(element => {
        // if(element.id==pocId){
          // this.poc.lat = element.latitude;
          // this.poc.long = element.longitude;
      //   }
      // });

      let distance = this.doCalc(userLat, userLong, pocCoord);
      // convert to metters
      return distance*1000; 
       
  }

  supplyPocs() {
    return this.data
  }

  storeForSupplyPocs(data) {
    this.data = data;
    return this.data
  }

  doCalc(userLat, userLong, poc) {
    const R = 6371.071; // Radius of the Earth in kilometers
    const rlat1 = poc.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = userLat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (userLong - poc.long) * (Math.PI / 180); // Radian difference (longitudes)

    let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2))); 
    // note: d = actual distance
    // Below: external calc to make sure we cover the cluster
    d = (d/100)*50
    return d;
  }

  tempStoreDataForCamera(detail) {
    this.keepData = detail
    return this.keepData;
  }

  getDataForCamBack() {
    return this.keepData;
  }

  // storeImageTempUrl(imageUrl) {
  //   this.imageUrl = imageUrl;console.log(this.imageUrl)
  //   return this.imageUrl;
  // }

  // supplyTempImageUrl() {
  //   return this.imageUrl;
  // }

  // keepForSearch(data) {
  //   this.keepDataForSearch = data;
  //   return this.keepDataForSearch;
  // }

  // returnDataForSearch() {
  //   return this.keepDataForSearch;
  // }
  getDataForAdminDashboard() {
    return this.http.get<any>(`${environment.fakeAdminUrl}/dashboard`);
  }

  getTaskForAdminDashboard(taskType, before, after) {
    return this.http.post<any>(`${environment.fakeAdminUrl}/dashboard/${taskType}`, {before, after});
  }

  getDataForAdminSummry(date) {
    return this.http.post<any>(`${environment.fakeAdminUrl}/dashboard`, {date});
  }

  resetPassword(email) {
    return this.http.post<any>(`${environment.fakeUrl}/forgot-password`, {email})
  }

  getDataForSummary(currentRout, before, after ) {
    return this.http.post<any>(`${environment.fakeAdminUrl}/summary/${currentRout}`, { before, after} );
  }

  updateTask(feedback, taskId) {
    // just in case .. we ve to  json.stringify
    return this.http.patch<any>(`${environment.fakeTaskUrl}/${taskId}`, {feedback} );
  }

  getAllBdr() {
    return this.http.get<any>(`${environment.fakeAdminUrl}/bdr`);
  }

  getPointerData() {
    return this.http.get<any>(`${environment.fakeAdminUrl}/cordinate`);
  }

  updatePocData(data) {
    return this.http.patch<any>(`${environment.fakePocUrl}/update`, data);
  }

  getTaskForConversionToExcel() {
    return this.http.get<any>(`${environment.fakeTaskUrl}`);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  public getTask;
  constructor() { }


  deleteDb(task) {

    var req = indexedDB.deleteDatabase(task.image_name);
    req.onsuccess = function () {
        return true;
    };
    req.onerror = function () {
      return false;
    };
    req.onblocked = function () {
      return false;
    };    
  }

}

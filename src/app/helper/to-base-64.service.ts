import { Injectable } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ToBase64Service {
  sizeOriginal; 
  constructor(private imageCompress: NgxImageCompressService ) { }

  toBase64(file) {
    var reader = new FileReader();
    reader.onloadend = () => {
      // compress image
      this.compressFile(reader.result);
      reader.result.toString();
    }
    reader.readAsDataURL(file);
  }

  compressFile(image) {
    var orientation = -1;
    // getting original size for correlation
    const sizeOriginal = this.imageCompress.byteCount(image)/(1024*1024);
    // doing the commpression gan gan
    this.imageCompress.compressFile(image, orientation, 50, 50).then(result=> {
      // getting the compressed size
      const newSize = this.imageCompress.byteCount(result)/(1024*1024);
      
      this.submitBase64ToDb(result)
    })
  }

  submitBase64ToDb(image) {
    const dbName = new Date().getTime().toString();
      var request = window.indexedDB.open(dbName, 1);
      let data = []; localStorage.setItem("image", dbName);
      data = [ { id: 1, image: image.toString() } ]
      request.onupgradeneeded = (event) => {
        var db = request.result;
      
        // Create an objectStore to hold information about our customers. We're
        // going to use "ssn" as our key path because it's guaranteed to be
        // unique - or at least that's what I was told during the kickoff meeting.
        var objectStore = db.createObjectStore("tasks", { keyPath: "id" });
        // Use transaction oncomplete to make sure the objectStore creation is 
        // finished before adding data into it.
        objectStore.transaction.oncomplete = (event) => {
          // Store values in the newly created objectStore.
          var customerObjectStore = db.transaction("tasks", "readwrite").objectStore("tasks");
          data.forEach(function(customer) {
            customerObjectStore.add(customer);
          });
        };
      };
  }

}

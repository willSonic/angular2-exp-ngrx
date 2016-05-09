import {Injectable, provide} from "@angular/core";
import {Http} from "@angular/http";
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import "rxjs/Rx";

export class AudioRemote {


  constructor(public http: Http) {
  }

  query(URL:string): Observable<any[]> {

    return Observable.create(observer=>{
      let req = new XMLHttpRequest();
      console.log('AudioMachineRemote URL ='+URL)
      req.open('get',URL);
      req.responseType = "arraybuffer";
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
          observer.next(req.response);
          console.log("req.response",req.response)
          observer.complete();
        }
      };
      req.send();
    });


  }


  getTrack(URL: string): Observable<any[]> {
    return this.query(URL);
  }
}

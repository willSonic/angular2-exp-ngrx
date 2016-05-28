import {Injectable, bind} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {audioItem, IAudiodata} from "../app/reducers/audioReducer";

@Injectable()
export class WebAudioPlayerAPI{

    private audioContext: AudioContext;
    private audioNode:AudioBufferSourceNode;
    private audioBuffer: AudioBuffer;
    private playbackRate: number = 1.0;
    private gainNode:GainNode;
    private gain: number = 1.0;


    constructor() {
        this.audioContext = new AudioContext();
        console.log("WebAudioPlayerAPI]  ----- this.audioContext CREATED");
    }



    loadAudio(audioItem:any): Observable<any[]>  {
        var ref = this;
        console.log("[WebAudioPlayerAPI] loadAudio  -----  =", audioItem.artistAudioBuffer.audioBuffer);
        if(this.audioBuffer) {
          if(this.audioNode ) {
            this.audioNode.stop(0);
          }
        }
        return Observable.create(observer=> {
            this.audioContext.decodeAudioData( audioItem.artistAudioBuffer.audioBuffer, function(buffer){
              ref.audioBuffer = buffer;
              console.log("this.gain ="+ref.gain);
              console.log("this.audioBuffer.length ="+ref.audioBuffer.length);
              console.log("this.audioBuffer.duration ="+ref.audioBuffer.duration);
              observer.next(ref.audioBuffer);
              observer.complete();
            });

         });
    }

    playBuffer(): Array<any> {
            this.audioNode = this.audioContext.createBufferSource();
            console.log("this.audioBuffer.length ="+this.audioBuffer.length);
            console.log("this.audioBuffer.duration ="+this.audioBuffer.duration);
            this.audioNode.buffer = this.audioBuffer;
            this.audioNode.playbackRate.value = this.playbackRate;
    
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = this.gain;
    
            this.audioNode.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
    
            this.audioNode.start(0);
            return [ {'playStart':true}];
    }

    stopBuffer(): Array<any>{
           if(this.audioBuffer) {
              if(this.audioNode ) {
                this.audioNode.stop(0);
                this.audioNode = null;
              }
            }
            return [ {'playStop':true}];
    }

}

export var webAudioPlayerAPIInjectables: Array<any> = [
    bind(WebAudioPlayerAPI).toClass(WebAudioPlayerAPI)
];
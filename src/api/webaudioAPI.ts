import {Injectable, bind} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {audioItem, IAudiodata} from "../app/reducers/audioReducer";


@Injectable()
export class WebAudioPlayerAPI{

    private audioContext: AudioContext;
    private audioBuffer: AudioBuffer;
    private playbackRate: number = 1.0;
    private gain: number = 1.0;


    constructor() {
        this.audioContext = new AudioContext();
    }


    loadAudio(audioItem:any): Observable<any> {
        var ref = this;
        console.log("loadAudio  -----  =", audioItem);
        this.audioContext.decodeAudioData( audioItem.artistAudioBuffer, function(buffer){
        ref.audioBuffer = buffer;
        console.log("this.gain ="+ref.gain)
        console.log("this.audioBuffer.length ="+ref.audioBuffer.length);
        console.log("this.audioBuffer.duration ="+ref.audioBuffer.duration);
        })
        return Observable.create(function (observer) {
                        observer.onNext(ref.audioBuffer);
                        observer.onCompleted();
                });
    }

    playBuffer(): void {
        let bufferSource = this.audioContext.createBufferSource();
        console.log("this.audioBuffer.length ="+this.audioBuffer.length);
        console.log("this.audioBuffer.duration ="+this.audioBuffer.duration);
        bufferSource.buffer = this.audioBuffer;
        bufferSource.playbackRate.value = this.playbackRate;

        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.gain;

        bufferSource.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        bufferSource.start(0);
    }
}

export var webAudioPlayerAPIInjectables: Array<any> = [
    bind(WebAudioPlayerAPI).toClass(WebAudioPlayerAPI)
];
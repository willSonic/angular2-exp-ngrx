import {Component, ChangeDetectionStrategy, Output, OnChanges, SimpleChange, Input, EventEmitter} from "@angular/core";
import{ NgClass} from "@angular/common";
import {IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";
import { Subject, Observable } from 'rxjs';
import {Store, Action} from "@ngrx/store";
import {audioSelector} from "../selectors/audio.selector";

@Component({
    selector: 'audio-item',
    directives: [NgClass],
    template: `
    <li class="margin-t-20">
        <button class="pure-button pure-button-primary" [ngClass]="{active: isLoaded}"
            (click)="fetchAudio.emit(audioItem)">{{audioItem.artist.trackTitle}}
        </button>
    </li>
    `,
      styles: [`
        .active {
          background-color: red;
        }
      `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioItem implements OnChanges {
    @Input()  audioItem: any;
    @Output() fetchAudio: EventEmitter<IAudiodata> = new EventEmitter<IAudiodata>();
    @Input() audioBuffer:any;
    isLoaded = false;
    ngOnChanges(changes:any) {
		console.log('AudioItem Change detected:',changes);
		console.log('AudioItem this.audioItem.artistAudioBuffer:',this.audioItem.downloadComplete);
        this.isLoaded = this.audioItem.downloadComplete? true:false;
	}
}
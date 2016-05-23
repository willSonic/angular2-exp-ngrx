import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
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
            (click)="playAudioItem.emit(audioItem)">{{audioItem.artist.trackTitle}}
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
export class AudioItem {
    @Input()  audioItem: any;
    @Output() playAudioItem: EventEmitter<IAudiodata> = new EventEmitter<IAudiodata>();
}
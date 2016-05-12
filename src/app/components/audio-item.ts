import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import {IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";


@Component({
    selector: 'audio-item',
    template: `
    <li class="margin-t-20">
        <button class="pure-button pure-button-primary"
            (click)="playAudio.emit(audioItem)">{{audioItem.trackTitle}}
        </button>
    </li>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioItem{
    @Input()  audioItem: IArtist;
    @Output() playAudio: EventEmitter<IArtist> = new EventEmitter<IArtist>();
}
import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import {IAudio} from "../reducers/audioReducer";

@Component({
    selector: 'audio-item',
    template: `
    <li class="margin-t-20">
        <div>{audio.trackTitle}}</div>
        <button class="pure-button pure-button-primary"
            (click)="addToPlaylist.emit(audio)"
        </button>
    </li>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioItem{
    @Input() audio: IAudio;
    @Output() addToPlaylist: EventEmitter<IAudio> = new EventEmitter<IAudio>();
}
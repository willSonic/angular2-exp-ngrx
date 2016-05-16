import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";

import {AudioItem} from "./audio-item";
import {IAudiodata} from "../reducers/audioReducer";

@Component({
    selector: 'audio-list',
    template: `
        <h1 class="brand-label">Track</h1>
        <ul  *ngIf="audioList" class="audio-list">
            <audio-item
                *ngFor="let audioItem of audioList"
                [audioItem]="audioItem"
                [audioBuffer]="audioItem.artistAudioBuffer"
                (fetchAudio)="fetchAudio.emit($event)">
            </audio-item>
        </ul>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [AudioItem]
})
export class AudioList  {
    @Input() audioList: IAudiodata[];
    @Input() audioBuffer:any;
    @Output() fetchAudio = new EventEmitter<IAudiodata>();
}
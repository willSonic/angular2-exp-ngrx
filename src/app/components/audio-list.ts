import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";
import { Subject, Observable } from 'rxjs';
import {Store, Action} from "@ngrx/store";

import {AudioItem} from "./audio-item";
import {IAudiodata} from "../reducers/audioReducer";
import {IPlaylist} from "../reducers/playlistReducer";

@Component({
    selector: 'audio-list',
    template: `
        <h1 class="brand-label">Track</h1>
        <ul  *ngIf="audioList.length > 0" >
            <audio-item
                *ngFor="let audioItem of audioList"
                [audioItem]="audioItem"
                (playAudio)="playAudio.emit($event)">
            </audio-item>
        </ul>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [AudioItem]
})
export class AudioList {
    @Input() audioList: IPlaylist[];
    @Output() playAudio = new EventEmitter<IAudiodata>();
}
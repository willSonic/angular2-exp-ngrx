import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";
import { Subject, Observable } from 'rxjs';
import {Store, Action} from "@ngrx/store";

import {AudioItem} from "./audio-item";
import {IAudio} from "../reducers/audioReducer";

@Component({
    selector: 'audio-list',
    template: `
        Tracks 
        <ul>
            <audio-item
                *ngFor="let audio of audios"
                [audio]="audio"
                (playAudio)="playAudio.emit($event)">
            </audio-item>
        </ul>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [AudioItem]
})
export class AudioList {
    @Input() audios: IAudio[];
    @Output() playAudio = new EventEmitter<IAudio>();
}
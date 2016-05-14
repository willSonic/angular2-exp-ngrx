import {Component, ChangeDetectionStrategy, Output, OnChanges, SimpleChange, Input, EventEmitter} from "@angular/core";
import{ NgClass} from "@angular/common";
import {IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";


@Component({
    selector: 'audio-item',
    directives: [NgClass],
    template: `
    <li class="margin-t-20">
        <button class="pure-button pure-button-primary"
            (click)="playAudio.emit(audioItem)">{{audioItem.trackTitle}}
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
    @Output() playAudio: EventEmitter<IArtist> = new EventEmitter<IArtist>();

    ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
		console.log('Change detected:', changes['audioItem'].currentValue);
	}
}
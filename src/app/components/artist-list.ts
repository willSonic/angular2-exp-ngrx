import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";
import { Observable, Subject } from 'rxjs';
import {Store, Action} from "@ngrx/store";

import {ArtistItem} from "./artist-item";
import {IArtist} from "../reducers/artistsReducer";
import {IAudio} from "../reducers/audioReducer";

@Component({
    selector: 'artist-list',
    template: `
        Cart
        <ul *ngIf="artistList">
            <artist-item
                *ngFor="let artistItem of artistList"
                [artistItem]="artistItem">
            </artist-item>
        </ul>
        <button class="pure-button pure-button-primary"
            (click)="artistList.emit($event)">
            Checkout
         </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ArtistItem]
})
export class ArtistList {
    @Input() artistList: any;
    @Output() checkout = new EventEmitter<any>();
}
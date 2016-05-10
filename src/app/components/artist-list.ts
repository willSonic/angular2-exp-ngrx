import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";

import {ArtistItem} from "./artist-item";

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
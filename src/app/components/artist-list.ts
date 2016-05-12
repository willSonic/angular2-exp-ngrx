import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from "@angular/core";

import {ArtistItem} from "./artist-item";
import {IArtist} from "../reducers/artistsReducer";
import {IPlaylist} from "../reducers/playlistReducer";


@Component({
    selector: 'artist-list',
    template: `
        <h1 class="brand-label">Artist</h1>
        <ul *ngIf="artistList" class="pure-menu-list">
            <artist-item
                (addArtistToPlaylist)="addArtistToPlaylist.emit($event)"
                *ngFor="let artistItem of artistList"
                [artistItem]="artistItem"
                >
            </artist-item>
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ArtistItem]
})
export class ArtistList {
    @Input() artistList: IArtist[];
    @Output() addArtistToPlaylist = new EventEmitter<IArtist>();
}
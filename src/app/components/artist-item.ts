import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";
import {IArtist} from "../reducers/artistsReducer";


@Component({
    selector: 'artist-item',
    template: `
    <li class="margin-t-20 pure-menu-item">
          <div class="media conversation">
            <div class="media-body">
              <h3 class="media-heading contact-name">{{artistItem.artistName}}
                <span *ngIf="selected">&bull;</span>
                <small class="">{{artistItem.trackTitle}}</small>
              </h3>
            </div>
            <div class="pull-left">="addToCart.emit(product)"
                  <a (click)="clicked($event)" class="video-thumbnail">
                      <img class="media-object avatar video-mask"  src="{{artistItem.albumImgSrc}}">
                      
                      <div class="play-icon"></div>
                   </a>
            </div>
          </div>
    </li>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistItem {
    @Input() artistItem: IArtist;
    @Output() addToPlaylist: EventEmitter<IArtist> = new EventEmitter<IArtist>();
}
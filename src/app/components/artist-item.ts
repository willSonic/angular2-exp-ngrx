import {Component, ChangeDetectionStrategy, Output, Input, EventEmitter} from "@angular/core";

@Component({
    selector: 'artist-item',
    template: `
    <li class="margin-t-20">
          <div class="media conversation">
            <div class="pull-left">
              <img class="media-object avatar" 
                   src="{{artistItem.albumImgSrc}}">
            </div>
            <div class="media-body">
              <h5 class="media-heading contact-name">{{artistItem.artistName}}
                <span *ngIf="selected">&bull;</span>
              </h5>
              <small class="message-preview">{{artistItem.trackTitle}}</small>
            </div>
            <a (click)="clicked($event)" class="div-link">Select</a>
          </div>
    </li>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistItem {
    @Input() artistItem: any;
}
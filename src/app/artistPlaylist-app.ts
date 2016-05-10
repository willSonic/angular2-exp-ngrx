import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ArtistList} from "./components/artist-list";
import {getArtists, addToPlaylist} from "./actions/artistsAction";
import {artistSelector, artistAsArraySelector} from "./selectors/artist.selector";
import {IArtist} from "./reducers/artistsReducer";
import {AsyncPipe} from "@angular/common";
import {Observable, Subject } from 'rxjs';
import {Store, Action} from "@ngrx/store";

@Component({
    selector: `artist-playlist-app`,
    template: `
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">Audio Artist NGRX Store</h1>
				<h2 class="brand-tagline">Wiki Audio</h2>
			</div>
		</div>
		<div class="content pure-u-1 pure-u-md-3-4">
			<artist-list
				[artist]="(artists | async)"
                (addToPlaylist)="actions$.next(addArtistToPlaylist($event))">
			</artist-list>
		</div>
	</div>
	`,
    directives: [ArtistList],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistPlaylistApp {

    artists: any;
    actions$ = new Subject<Action>();

    addArtistToPlaylist = addToPlaylist;

    constructor(public store: Store<any>) {
        this.artists  = store.let(artistAsArraySelector);

        this.actions$.subscribe(store);
        this.actions$.next(getArtists());
    }
    
    ngOnDestroy() {
        this.store.unsubscribe();
    }
}
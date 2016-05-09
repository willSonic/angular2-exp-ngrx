import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ArtistList} from "./components/artist-list";
import {AudioList} from "./components/audio-list";

import {getArtists, addToPlaylist} from "./actions/artistsAction";
import {downloadAudio} from "./actions/audioAction";
import {IAudio} from "./reducers/audioReducer";

import {artistSelector, artistAsArraySelector} from "./selectors/artist.selector";
import {cartSelector, calculatedCartList} from "./selectors/cart.selector";
import {AsyncPipe} from "@angular/common";
import {Devtools} from '@ngrx/devtools';
import { Observable, Subject } from 'rxjs';
import {Store, Action} from "@ngrx/store";

@Component({
    selector: `artist-playlist-app`,
    template: `
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">NgRx Store</h1>
				<h2 class="brand-tagline">Example #5 - Shopping Cart</h2>
			</div>
		</div>
		<div class="content pure-u-1 pure-u-md-3-4">
			<artist-list
				[artist]="(artists | async)"
                (addToPlaylist)="actions$.next(addArtistToPlaylist($event))">
			</artist-list>
            <audio-list
				[audioList]="(audioList | async)"
                (downloadAudio)="actions$.next(downloadArtistAudio($event))">
			</audio-list>
		</div>
	</div>
	`,
    directives: [AudioList, ArtistList, Devtools],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartApp {

    cartList: any;
    a: any;
    actions$ = new Subject<Action>();

    addArtistToPlaylist = addToPlaylist;
    downloadArtistAudio = downloadAudio;

    constructor(public store: Store<any>) {
        this.artists = store.let(productAsArraySelector);
        this.cartList = store.let(calculatedCartList);

        this.actions$.subscribe(store);
        this.actions$.next(getArtists());
    }
    
    ngOnDestroy() {
        this.store.unsubscribe();
    }
}
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ArtistList} from "./components/artist-list";
import {getArtists} from "./actions/artistsAction";
import {addArtistToPlaylist} from "./actions/playlistAction";
import {fetchAudio, playArtistTrack} from "./actions/audioAction";
import {artistSelector, artistAsArraySelector} from "./selectors/artist.selector";
import {playlistSelector} from "./selectors/playlist.selector";
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
		      <div class="pure-u-1-2 custom-restricted-width">
                    <artist-list
                        [artistList]="(artistList | async)"
                        (addToPlaylist)="actions$.next(addArtistToPlaylist($event))">
                    </artist-list>
              </div>
		      <div class="pure-u-1-2 custom-restricted-width">
                    <audio-list
                        [audioList]="(audioList | async)"
                        (playArtistTrack)="actions$.next(playArtistInPlayList($event))">
                    </audio-list>
              </div>
		</div>
	</div>
	`,
    directives: [ArtistList],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistPlaylistApp {

    artistList: any;
    audioList: any;
    audioItem:any;


    actions$ = new Subject<Action>();

    addArtistToPlaylist = addArtistToPlaylist;
    playArtistInPlayList = playArtistTrack;

    constructor(public store: Store<any>) {
        this.artistList = store.let(artistAsArraySelector);
        this.audioList = store.let(playlistSelector);
        
        
        this.actions$.subscribe(store);
        this.actions$.next(getArtists());
    }
    
    ngOnDestroy() {
        this.store.unsubscribe();
    }
}
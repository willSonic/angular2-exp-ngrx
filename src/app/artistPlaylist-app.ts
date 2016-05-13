import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ArtistList} from "./components/artist-list";
import {AudioList} from "./components/audio-list";
import {getArtists} from "./actions/artistsAction";
import {addArtistToPlaylist} from "./actions/playlistAction";
import {fetchAudio, playArtistTrack} from "./actions/audioAction";
import {artistSelector, artistAsArraySelector} from "./selectors/artist.selector";
import {playlistArraySelector} from "./selectors/playlist.selector";
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
		<div class="content pure-u-1">
		   <div class="pure-g">
		      <div class="pure-u-1-3">
                    <artist-list
                        [artistList]="(artistList | async)"
                        (addArtistToPlaylist)="actions$.next(addToPlaylistAction($event))">
                    </artist-list>
              </div>
		      <div class=" pure-u-1-3 custom-restricted-width">
                    <audio-list
                        [audioList]="(audioList | async)"
                        (playArtistTrack)="actions$.next(playArtistInPlayList($event))">
                    </audio-list>
              </div>
		    </div>
		</div>
	</div>
	`,
    directives: [ArtistList, AudioList],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistPlaylistApp {

    artistList: any;
    audioList: any;
    audioItem:any;


    actions$ = new Subject<Action>();

    addToPlaylistAction  = addArtistToPlaylist;
    playArtistInPlayList = playArtistTrack;

    constructor(public store: Store<any>) {
        this.artistList = store.let(artistAsArraySelector);
        this.audioList = store.let(playlistArraySelector);

        this.actions$.subscribe(store);
        this.actions$.next(getArtists());
    }

    ngOnDestroy() {
        this.store.unsubscribe();
    }
}
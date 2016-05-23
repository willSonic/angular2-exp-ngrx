import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ArtistList} from "./components/artist-list";
import {AudioList} from "./components/audio-list";
import {getArtists} from "./actions/artistsAction";
import {playAudioItem} from "./actions/audioplayerAction";
import {addArtistToPlaylist} from "./actions/playlistAction";
import {AudioServiceAction} from "./actions/audioServiceAction";
import {audioSelector} from "./selectors/audio.selector";
import {artistSelector, artistAsArraySelector} from "./selectors/artist.selector";
import {playlistArraySelector, constructedPlaylistItem} from "./selectors/playlist.selector";
import {IArtist} from "./reducers/artistsReducer";
import {audioItem} from "./reducers/audioReducer";
import {AsyncPipe} from "@angular/common";
import {Observable, Subject } from 'rxjs';
import {Store, Action, Dispatcher} from "@ngrx/store";

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
                        (createPlaylistItem)="audioServiceActions.createPlaylistItem($event)" 
                        >
                    </artist-list>
              </div>
		      <div class=" pure-u-1-3 custom-restricted-width">
                    <audio-list
                        [audioList]="(audioList | async)"
                        (playAudioItem)="actions$.next(playArtistAction($event))"
                        >
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


   // public  artists;
    private subscription;


    actions$ = new Subject<Action>();
   // template -- needs (createPlaylistItem)="addToPlaylistRequest($event)">
    // template -- needs   (createPlaylistItem)="actions$.next(addArtistToPlaylistAction($event))"
   // addArtistToPlaylistAction  = this.audioServiceAction.createPlaylistItem;
    playArtistAction = playAudioItem;

    constructor(public store: Store<any>,  private audioServiceActions:AudioServiceAction) {
        this.artistList   = store.let(artistAsArraySelector);
        this.audioList    = store.let(constructedPlaylistItem);
      //  this.subscription   = store.select('artists').subscribe( artists =>  {this.artists = artists});
        this.actions$.subscribe(store);
        this.actions$.next(getArtists());


       /* this.audioBuffer.subscribe(function(){
              var audioItemState  = store.getState();
              console.log("[ArtistPlaylistApp] OUTSIDE audioBuffer audioItemState =", audioItemState);
              if(audioItemState.audioItem && audioItemState.audioItem.artistAudioBuffer){
                //  store.dispatch(playAudioItem())
                  console.log("[ArtistPlaylistApp] INSIDE  audioBuffer audioItemState =", audioItemState);
                  console.log("[ArtistPlaylistApp] INSIDE  audioBuffer rtistAudioBuffer.byteLength ="+audioItemState.audioItem.artistAudioBuffer.byteLength);
                  store.dispatch(playAudioItem(audioItemState.audioItem))
              }
        });*/
    }

   /* addToPlaylistRequest(event:any):void{
              console.log("[ArtistPlaylistApp] addToPlaylistRequest =", event);
                console.log("[ArtistPlaylistApp] tsubscription = ",   this.artists);
                console.log("[ArtistPlaylistApp] this.store.value.artists' =", this.store.value.artists)
                var artists:IArtist = this.store.getState().artists;
                console.log("[ArtistPlaylistApp] this.store.select('playlist')=",  Object.keys(artists).filter(x  => {return artists[x] }).map( x => artists[x].trackURL) );
                 this.store.dispatch(audioServiceAction.createPlaylistItem(event))
    }*/

    ngOnDestroy() {
        this.store.unsubscribe();
    }

}
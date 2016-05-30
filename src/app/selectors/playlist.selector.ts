let STORE_SLICE_NAME = 'playlist';
import { Observable } from 'rxjs';
import {artistSelector } from './artist.selector';

import { audioSelector} from './audio.selector';


const getAudioItem = (store: any) => store.select(STORE_SLICE_NAME)
           .map(state => state.audioList).map(audioItem =>audioItem.isPlaying).distinctUntilChanged(function(x){
               console.log("[playlist.selector] --getAudioItem x = ",x);
               return x;
               });

export const playlistArraySelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => res.audioList);

export const playlistSelector = (store: any) => store.select(STORE_SLICE_NAME);

export const constructedPlaylistItem = (store: any) => Observable
    .combineLatest(store.let(playlistSelector),
                   store.let(artistSelector),
                   store.let(audioSelector),
                   store.let(playlistArraySelector))
    .map((res: any) => {
        console.log("[playlist.selector] --constructedPlaylistItem- playlistArraySelector --res[0] ", res[0]);
         // console.log("[playlist.selector] --constructedPlaylistItem- artistSelector --res[1] ", res[1]);
         // console.log("[playlist.selector] --constructedPlaylistItem- audioSelector --res[2] ", res[2]);

        var playlist =  Object.assign({}, res[0]);
        console.log("[playlist.selector] --constructedPlaylistItem- playlistArraySelector --res[0].length "+ res[0].length);
        console.log("[playlist.selector] --constructedPlaylistItem- playlistArraySelector --playlist.audioList.length = "+ playlist.audioList.length);

        if(playlist.audioList.length>0 ){
            var artistAudioItem =  Object.keys(res[1]) .filter( x =>  {
                                      return res[1][x].id  ===  res[2].artistId})
                                     .map(x => {return res[1][x]})[0];

            var newResult = Object.keys(playlist.audioList).map(key => ({key:key, playlistItem:playlist.audioList[key]})).map( value =>{
              // obj = res[0][value.key];
              console.log("playlist.selector] --constructedPlaylistItem --value ",value);
               console.log("playlist.selector] --constructedPlaylistItem --value.playlistItem.artistId", value.playlistItem.artistId);
             // console.log("playlist.selector] --constructedPlaylistItem --artistAudioItem.id", artistAudioItem.id);
               if(value.playlistItem.artistId === artistAudioItem.id){
                  playlist.audioList[value.key] =  Object.assign({}, value.playlistItem, {artist:artistAudioItem} );
                  //console.log("playlist.selector] --constructedPlaylistItem --   playList[value.key] =",  playList[value.key]);
               }
            });
            console.log("playlist.selector] --constructedPlaylistItem --valueer --playlist.audioList ", playlist.audioList);
            return playlist.audioList;
        }else{
        console.log("[playlist.selector] -- constructedPlaylistItem -- DEFAULT");
           return res[3];
        }
    });

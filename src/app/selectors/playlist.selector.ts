let STORE_SLICE_NAME = 'playlist';
import { Observable } from 'rxjs';
import {artistSelector } from './artist.selector';

import { audioSelector} from './audio.selector';


export const playlistArraySelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => res.audioList);


export const constructedPlaylistItem = (store: any) => Observable
    .combineLatest(store.let(playlistArraySelector), store.let(artistSelector), store.let(audioSelector))
    .map((res: any) => {
       // console.log("[playlist.selector] --constructedPlaylistItem- playlistArraySelector --res[0] ", res[0]);
      //  console.log("[playlist.selector] --constructedPlaylistItem- artistSelector --res[1] ", res[1]);
       // console.log("[playlist.selector] --constructedPlaylistItem- audioSelector --res[2] ", res[2]);
        if(res[0].length>0 ){
          var artistAudioItem =  Object.keys(res[1]) .filter( x =>  {
                                      return res[1][x].id  ===  res[2].artistId})
                                     .map(x => {return res[1][x]})[0];

          var newResult = Object.keys(res[0]).map(key => res[0][key]).map ( value =>{
              var obj;
             //  console.log("playlist.selector] --constructedPlaylistItem --value.artistId", value.artistId);
             //  console.log("playlist.selector] --constructedPlaylistItem --value.artistId", artistAudioItem.id);
               if(value.artistId === artistAudioItem.id){
                    obj =  Object.assign({}, value, {artist:artistAudioItem} )
               }
               return obj;
            });
         //   console.log("playlist.selector] --constructedPlaylistItem --valueer --newResult ", newResult);
            return newResult
        }else{
           return res[0]
        }
    });

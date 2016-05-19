import {Action} from "@ngrx/store";
import {ADD_ARTIST_TO_PLAYLIST, ADD_AUDIOITEM_TO_PLAYLIST} from "../reducers/playlistReducer";
import {IArtist} from "../reducers/artistsReducer";



export const addArtistToPlaylist = (artist: IArtist) => {
     console.log(" playlistAction -- artist =", artist);
     return <Action>{ type: ADD_ARTIST_TO_PLAYLIST, payload: artist };
}


export const addArtistToPlaylist = (artist: IArtist) => {
    console.log(" playlistAction -- artist =", artist);
    return <Action>{ type:ADD_AUDIOITEM_TO_PLAYLIST, payload: artist };
import {Action} from "@ngrx/store";
import {ADD_TO_PLAYLIST, REQUEST_ARTISTS, IArtist} from "../reducers/artistsReducer";


export const getArtists = () => {
    return <Action>{ type: REQUEST_ARTISTS };
}

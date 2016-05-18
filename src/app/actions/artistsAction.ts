import {Action} from "@ngrx/store";
import { REQUEST_ARTISTS, IArtist} from "../reducers/artistsReducer";

export const getArtists = () => {
    return <Action>{ type: REQUEST_ARTISTS };
}

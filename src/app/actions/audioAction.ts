import {Action} from "@ngrx/store";
import {artists, ADD_TO_PLAYLIST, IArtist} from "../reducers/artistsReducer";
import {AUDIODOWNLOAD_REQUEST} from "../reducers/audioReducer";

export const downloadAudio = (artist: IArtist) => {
    return <Action>{ type: AUDIODOWNLOAD_REQUEST, payload: artist };
}
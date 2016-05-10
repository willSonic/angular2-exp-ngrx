import {Action} from "@ngrx/store";
import {ADD_TO_PLAYLIST, REQUEST_AUDIODATA, IAudiodata} from "../reducers/audioReducer";


export const fetchAudio = () => {
    return <Action>{ type: REQUEST_AUDIODATA };
}

export const addToPlaylist = (IAudiodata: IAudiodata) => {
    return <Action>{ type: ADD_TO_PLAYLIST, payload: IAudiodata };
}
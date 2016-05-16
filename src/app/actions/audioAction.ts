import {Action} from "@ngrx/store";
import {ADD_TO_PLAYLIST, REQUEST_AUDIODATA, IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";


export const fetchAudio = (audiodataItem: IAudiodata) => {
     console.log(" audioAction -- fetchAudio =", audiodataItem);
    return <Action>{ type: REQUEST_AUDIODATA, payload: audiodataItem  };
}

export const playArtistTrack = (artist: IArtist) => {
    return <Action>{ type: REQUEST_AUDIODATA, payload: artist };
}
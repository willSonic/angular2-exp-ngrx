import {Action} from "@ngrx/store";
import {CREATE_AUDIODATA,ADD_TO_PLAYLIST, REQUEST_AUDIODATA, IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";


export const fetchAudio = (audiodataItem: IAudiodata) => {
     console.log(" audiodataAction -- fetchAudio =", audiodataItem);
    return <Action>{ type: REQUEST_AUDIODATA, payload: audiodataItem  };
}

export const createPlaylistItem = (artist: IArtist) => {
     console.log(" audiodataAction -- createPlaylistItem =", artist);
    return <Action>{ type: CREATE_AUDIODATA, payload: artist };
}
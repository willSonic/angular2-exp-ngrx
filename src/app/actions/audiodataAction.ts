import {Store, Action} from "@ngrx/store";
import {CREATE_AUDIODATA,ADD_TO_PLAYLIST, REQUEST_AUDIODATA, IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


const _actions$: BehaviorSubject<Action> = new BehaviorSubject({type: null, payload: null});
export const artistSelector = (store: any) => store.select('artists');

export const fetchAudio = (audiodataItem: IAudiodata) => {
     console.log(" audiodataAction -- fetchAudio =", audiodataItem);
    return <Action>{ type: REQUEST_AUDIODATA, payload: audiodataItem  };
}

export const createPlaylistItem = (artist: IArtist) => {
   //var latestStuff = _store.select('artists')

    console.log(" audiodataAction -- latestStuff ="+artistSelector );
    console.log(" audiodataAction -- createPlaylistItem =", artist);
    return <Action>{ type: CREATE_AUDIODATA, payload: artist };
}
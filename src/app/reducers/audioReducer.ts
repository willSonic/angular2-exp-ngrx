import {Reducer, Action} from "@ngrx/store";
import {IArtist} from "./artistsReducer";

export const ADD_TO_PLAYLIST= 'ADD_TO_PLAYLIST';
export const REQUEST_AUDIODATA = 'REQUEST_AUDIODATA';
export const RECEIVED_AUDIODATA = 'RECEIVED_AUDIODATA';


export interface IAudiodata {
    artist:IArtist;
    artistAudioBuffer: ArrayBuffer;
    downloadComplete:boolean;
}

export const audiobytes: Reducer<{}> = (state: any = {}, action: Action) => {
    switch (action.type) {
        case RECEIVED_AUDIODATA:
             console.log("audiobytes - action -", action);
             console.log("audiobytes - state -", state);
            return Object.assign({},
                state,
                Object.assign({}, action.payload, {downloadComplete:true})
                );

        default:
            return state;
    }
};


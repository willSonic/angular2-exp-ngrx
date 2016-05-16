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

const initalAudioData: IAudiodata = {
            artist:null,
            artistAudioBuffer:null,
            downloadComplete:false
     }

export const audioItem: Reducer<IAudiodata> = (state: IAudiodata = initalAudioData, action: Action) => {
    switch (action.type) {
        case RECEIVED_AUDIODATA:
             console.log("audioItem - action -", action);
             console.log("audioItem - state -", state);
            return Object.assign({},
                state,
                action.payload
                );
        case ADD_TO_PLAYLIST:
             return state;


        default:
            return state;
    }
};


import {Reducer, Action} from "@ngrx/store";
import {IArtist} from "./artistsReducer";

export const ADD_TO_PLAYLIST= 'ADD_TO_PLAYLIST';
export const REQUEST_AUDIODATA = 'REQUEST_AUDIODATA';
export const RECEIVED_AUDIODATA = 'RECEIVED_AUDIODATA';


export interface IAudiodata {
    artist:IArtist;
    audiobuffer: ArrayBuffer;
}

export const audiobytes: Reducer<{}> = (state: any = {}, action: Action) => {
    switch (action.type) {
        case RECEIVED_AUDIODATA:
            return Object.assign({},
                state,
                action.payload.reduce((obj, audiodata ) => {
                    console.log("audiobytes - -", audiodata);
                    obj[audiodata.id] = audiodata;
                    return obj;
                }, {})
            );
        default:
            return state;
    }
};


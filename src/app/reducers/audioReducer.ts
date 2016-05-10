import {Reducer, Action} from "@ngrx/store";

export const ADD_TO_PLAYLIST= 'ADD_TO_PLAYLIST';
export const REQUEST_AUDIODATA = 'REQUEST_AUDIODATA';
export const RECEIVED_AUDIODATA = 'RECEIVED_AUDIODATA';


export interface IAudiodata {
    id:number;
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
        case ADD_TO_PLAYLIST:
            return Object.assign({}, state, {
                [action.payload]: Object.assign({}, state[action.payload], {
                    inventory: state[action.payload].inventory - 1
                })
            });
        default:
            return state;
    }
};


import {Reducer, Action} from "@ngrx/store";
import {uuid} from "../../util/uuid"
import {IArtist} from "./artistsReducer";

export const ADD_TO_PLAYLIST= 'ADD_TO_PLAYLIST';
export const CREATE_AUDIODATA= 'CREATE_AUDIODATA'
export const REQUEST_AUDIODATA = 'REQUEST_AUDIODATA';
export const RECEIVED_AUDIODATA = 'RECEIVED_AUDIODATA';


export interface IAudiodata {
    id:string;
    artistId:number;
    artistAudioBuffer: ArrayBuffer;
    downloadComplete:boolean;
    isPlaying:boolean;
    currentPosition:number;
}

const initalAudioData: IAudiodata = {
            id:undefined,
            artistId:null,
            artistAudioBuffer:null,
            downloadComplete:false,
            isPlaying:false,
            currentPosition:0
     }

export const audioItem: Reducer<IAudiodata> = (state: IAudiodata = initalAudioData, action: Action) => {
    switch (action.type) {
        case CREATE_AUDIODATA:
             console.log("audioItem - CREATE_AUDIODATA -", action.payload);
             return Object.assign({},
                                  state,
                                  action.payload = Object.assign({},{
                                         id:uuid(),
                                         artistId:action.payload.id,
                                         artistAudioBuffer:null,
                                         downloadComplete:false,
                                         isPlaying:false,
                                         currentPosition:0
                                     }));

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


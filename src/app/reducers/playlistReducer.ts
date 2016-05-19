import {Reducer, Action} from "@ngrx/store";
import {audioItem, IAudiodata} from "./audioReducer";
export const ADD_ARTIST_TO_PLAYLIST= 'ADD_ARTIST_TO_PLAYLIST';
export const ADD_AUDIOITEM_TO_PLAYLIST = 'ADD_AUDIOITEM_TO_PLAYLIST';


export interface IPlaylist { audioList:IAudiodata[] }

const initialState: IPlaylist = { audioList:[] }


export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ARTIST_TO_PLAYLIST:
            let t = state;
            if(state.audioList.indexOf(action.payload)  < 0){
                t = Object.assign({},
                    state,
                    {audioList:[ ...state.audioList, Object.assign({}, {artist:action.payload,
                                                                               artistAudioBuffer:[],
                                                                               downloadComplete:false})]});
             }
            return t;
        
        case ADD_AUDIOITEM_TO_PLAYLIST:
            let t = state;
            if(state.audioList.indexOf(action.payload)  < 0){
                t = Object.assign({},
                    state,
                    {audioList:[ ...state.audioList, action.payload]});
            }
            return t;

        default:
           // console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};


import {Reducer, Action} from "@ngrx/store";
import {audioItem, IAudiodata} from "./audioReducer";
export const ADD_ARTIST_TO_PLAYLIST= 'ADD_ARTIST_TO_PLAYLIST';
export const ADD_AUDIOITEM_TO_PLAYLIST = 'ADD_AUDIOITEM_TO_PLAYLIST';


export interface IPlaylist { audioList:IAudiodata[] }

const initialState: IPlaylist = { audioList:[] }


export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ARTIST_TO_PLAYLIST:
            let z = state;
            if(state.audioList.indexOf(action.payload)  < 0){
                z = Object.assign({},
                    state,
                    {audioList:[ ...state.audioList, Object.assign({}, {artist:action.payload,
                                                                               artistAudioBuffer:[],
                                                                               downloadComplete:false})]});
             }
            return z;
        
        case ADD_AUDIOITEM_TO_PLAYLIST:
            let t = state;
                console.log("playlistReducer   =--ADD_AUDIOITEM_TO_PLAYLIST-- state,",state);
            if(state.audioList.indexOf(action.payload)  < 0){
                console.log("playlistReducer   =--ADD_AUDIOITEM_TO_PLAYLIST--action.payload,",action.payload)
                t = Object.assign({},
                    state,
                    {audioList:[ ...state.audioList, Object.assign({},action.payload)]});
            }
                console.log("playlistReducer   =--ADD_AUDIOITEM_TO_PLAYLIST--t,",t)
            return t;

        default:
           // console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};


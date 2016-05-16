import {Reducer, Action} from "@ngrx/store";
import {audioItem, IAudiodata} from "./audioReducer";
export const ADD_ARTIST_TO_PLAYLIST= 'ADD_ARTIST_TO_PLAYLIST';


export interface IPlaylist { audioList:IAudiodata[] }

const initialState: IPlaylist = { audioList:[] }


export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ARTIST_TO_PLAYLIST:
                //console.log("playlistReducer -- ADD_ARTIST_TO_PLAYLIST  action.payload = ", action.payload);
                //console.log("playlistReducer -- tate.audioList.indexOf(action.payload) "+state.audioList.indexOf(action.payload) );
                let t = state;
                if(state.audioList.indexOf(action.payload)  < 0){
                    t = Object.assign({},
                        state,
                        {audioList:[ ...state.audioList, Object.assign(audioItem, {artist:action.payload,
                                                                                   artistAudioBuffer:[],
                                                                                   downloadComplete:false})]});
                 }
                //console.log("playlistReducer -- ADD_ARTIST_TO_PLAYLIST  t = ",  t)
                return t;
        default:
           // console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};


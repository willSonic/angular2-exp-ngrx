import {Reducer, Action} from "@ngrx/store";
import {IArtist} from "./artistsReducer";
export const ADD_ARTIST_TO_PLAYLIST= 'ADD_ARTIST_TO_PLAYLIST';


export interface IPlaylist { audioList:any[] }

const initialState: IPlaylist = { audioList:[] }

export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ARTIST_TO_PLAYLIST:
                console.log("playlistReducer -- ADD_ARTIST_TO_PLAYLIST  action.payload = ", action.payload);
                let t = Object.assign({},
                                 state,
                                 state.audioList = [ ...state.audioList, action.payload]);
                console.log("playlistReducer -- ADD_ARTIST_TO_PLAYLIST  t = ",  t)
                return t;
        default:
            console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};


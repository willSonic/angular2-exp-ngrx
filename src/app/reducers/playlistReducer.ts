import {Reducer, Action} from "@ngrx/store";
import {IAudiodata} from "./audioReducer";
export const ADD_AUDIOITEM_TO_PLAYLIST = 'ADD_AUDIOITEM_TO_PLAYLIST';


export interface IPlaylist { audioList:IAudiodata[] }

const initialState: IPlaylist = { audioList:[] }


export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        
        case ADD_AUDIOITEM_TO_PLAYLIST :
            let t = state;
            if(state.audioList.indexOf(action.payload)  < 0){
                //console.log("playlistReducer   =--ADD_AUDIOITEM_TO_PLAYLIST--action.payload,",action.payload)
                t = Object.assign({},
                    state,
                    {audioList:[ ...state.audioList, Object.assign({},action.payload)]});
            }
            return t;

        default:
            console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};


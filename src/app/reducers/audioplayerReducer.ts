import {Reducer, Action} from "@ngrx/store";
import {audioItem, IAudiodata} from "./audioReducer";
export const PLAY_INITIATED = 'PLAY_INITIATED';
export const PLAY_START = 'PLAY_START';
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const VOLUME = 'VOLUME';


export interface IAudioPlayer {
                  elapsedTime:number,
                  audioItem:IAudiodata,
                  isPlaying:boolean,
                  volume:number
                 }

const initialState: IAudioPlayer = {
                  elapsedTime:0,
                  audioItem:null,
                  isPlaying:false,
                  volume:0.8
                 }


export const audioPlayer: Reducer<IAudioPlayer> = (state: IAudioPlayer = initialState, action: Action) => {
    switch (action.type) {
        case PLAY_INITIATED:
                return state;
        case PLAY_START:
                return state;
        case TOGGLE_PLAY_PAUSE:
                return state;
        case UPDATE_TIME:
                return state;
        case VOLUME:
                return state;
        default:
            console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};

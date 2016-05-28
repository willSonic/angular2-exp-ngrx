import {Reducer, Action} from "@ngrx/store";
import {IAudiodata} from "./audioReducer";
export const ADD_AUDIOITEM_TO_PLAYLIST = 'ADD_AUDIOITEM_TO_PLAYLIST';
export const UPDATE_AUDIOITEM_IN_PLAYLIST ='UPDATE_AUDIOITEM_IN_PLAYLIST';

export interface IPlaylist { audioList:any[] }

const initialState: IPlaylist = { audioList:[] }


export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        case ADD_AUDIOITEM_TO_PLAYLIST :
            if(state.audioList.indexOf(action.payload)  < 0){

                state = Object.assign({},
                    state,
                    {audioList:[ ...state.audioList, Object.assign({},action.payload)]});

               state => state.audioList.map(audioItem=> audioItem.isPlaying).distinctUntilChanged();

            }
            console.log("playlistReducer   =--ADD_AUDIOITEM_TO_PLAYLIST--state,",state);

            return state;

        case UPDATE_AUDIOITEM_IN_PLAYLIST :
              /*state.audioList =  state.audioList.map((audioItem) => {
                if (audioItem.id === action.payload.id) {
                  // Copy the object before mutating
                     console.log("[playlistReducer] UPDATE_AUDIOITEM_IN_PLAYLIST --- audioItem.isPlaying = "+audioItem.isPlaying);
                     return Object.assign({}, audioItem, { isPlaying:action.payload.isPlaying });
                }
                return audioItem;
              });
              console.log("[playlistReducer] --UPDATE_AUDIOITEM_IN_PLAYLIST--state.audioList,",state);
              return  state;*/

              return Object.assign({}, state, {
                          audioList: state.audioList.map(audioItem => {
                            if (audioItem.id === action.payload.id) {
                              return Object.assign({}, audioItem, {
                                        isPlaying: action.payload.isPlaying
                                      });
                            }

                            return audioItem
                          })
                          });
        default:
            console.log("playlistReducer -- defaults  state = ", state);
            return state;
    }
};


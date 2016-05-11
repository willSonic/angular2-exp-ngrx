import {Reducer, Action} from "@ngrx/store";

export const ADD_ARTIST_TO_PLAYLIST= 'ADD_ARTIST_TO_PLAYLIST';


export interface IPlaylist { artistIds:any[] }

const initialState: IPlaylist = { artistIds:[] }

export const playlist: Reducer<IPlaylist> = (state: IPlaylist = initialState, action: Action) => {
    switch (action.type) {
        case ADD_ARTIST_TO_PLAYLIST:
            return Object.assign({},
                    state,
                    { artistIds: [...state.artistIds, action.payload] }
                );
        default:
            return state;
    }
};


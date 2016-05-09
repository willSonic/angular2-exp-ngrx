import {Reducer, Action} from "@ngrx/store";
import {IArtist, ADD_TO_PLAYLIST} from './artistsReducer';

export const AUDIODOWNLOAD_REQUEST = 'AUDIODOWNLOAD_REQUEST'
export const AUDIODOWNLOAD_SUCCESS = 'AUDIODOWNLOAD_SUCCESS'
export const AUDIODOWNLOAD_FAILURE = 'AUDIODOWNLOAD_FAILURE'

export interface IAudio {
    id:string;
    artist:IArtist;
    binaryBuffer:ArrayBuffer;
}


export const audio: Reducer<{}> = (state: any = {}, action: Action) => {
    switch (action.type) {
        case AUDIODOWNLOAD_REQUEST:
            if (state.audioArtistIds.indexOf(action.payload) !== -1) {
                return Object.assign({},
                    state,
                    { loadedById:
                        Object.assign({}, state.loadedById,
                            {[action.payload]: (state.loadedById[action.payload] || 0) + 1}
                        )
                    }
                );
            }
            return Object.assign({},
                    state,
                    { artistIds: [...state.audioArtistIds, action.payload],
                        quantityById:
                            Object.assign({}, state.loadedById,
                                {[action.payload]: (state.loadedById[action.payload] || 0) + 1}
                            )
                    }
                );
        case AUDIODOWNLOAD_SUCCESS:
            return ;
        default:
            return state;
    }
};


import {Reducer, Action} from "@ngrx/store";

export const ADD_TO_PLAYLIST  = 'ADD_TO_PLAYLIST';
export const REQUEST_ARTISTS  = 'REQUEST_ARTISTS';
export const RECEIVED_ARTISTS = 'RECEIVED_ARTISTS';
export const DOWNLOAD_AUDIO   = 'DOWNLOAD_AUDIO';


export interface IArtist {
    id: number;
    artistName: string;
    trackTitle: string;
    albumImgSrc: string;
    trackURL:string;
}

export const artists: Reducer<{}> = (state: any = {}, action: Action) => {
    switch (action.type) {
        case REQUEST_ARTISTS:
            return Object.assign({},
                state,
                action.payload.reduce((obj, artist) => {
                    obj[artist.id] = artist;
                    return obj;
                }, {})
            );
        case ADD_TO_PLAYLIST:
            return Object.assign({}, state, {
                [action.payload]: Object.assign({}, state[action.payload], {
                    inventory: state[action.payload].inventory - 1
                })
            });
        default:
            return state;
    }
};


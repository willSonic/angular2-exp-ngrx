import {artistSelector} from './artist.selector';
import { Observable } from 'rxjs';

let STORE_SLICE_NAME = 'audio';

export const audioSelector = (store: any) => store.select(STORE_SLICE_NAME);

export const addToPlaylist = (store: any) => Observable
    .combineLatest(store.let(audioSelector), store.let(artistSelector))
    .map((res: any) => {
        return res[0].audioArtistIds.map(artistId => {
            return {
                artistName:res[1][artistId].artistName,
                trackTile: res[1][artistId].trackTitle,
                audi: res[1][artistId].price,
                quantity: res[0].quantityById[productId]
            };
        });
    });
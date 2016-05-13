let STORE_SLICE_NAME = 'playlist';
import { Observable } from 'rxjs';

import { audioSelector} from './audio.selector';


export const playlistArraySelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => res.audioList);


/*export const attachAudioData = (store: any) => Observable
    .combineLatest(store.let(playlistArraySelector), store.let(audioSelector))
    .map((res: any) => {
        return res[0].artist.map(productId => {
            return {
                title: res[1][productId].title,
                price: res[1][productId].price,
                quantity: res[0].quantityById[productId]
            };
        });
    });*/

let STORE_SLICE_NAME = 'playlist';
import { Observable } from 'rxjs';

export const playlistArraySelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => Object.keys(res).map(key => res[key]));
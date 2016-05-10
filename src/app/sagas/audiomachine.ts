import {Http} from '@angular/http';
import {createSaga, Saga, whenAction, toPayload} from 'store-saga';
import {REQUEST_ARTISTS, RECEIVED_ARTISTS, RECEIVED_ERROR} from '../reducers/artistsReducer';
import {REQUEST_AUDIODATA, RECEIVED_AUDIODATA}from '../reducers/audioReducer';
import  * as ArtistAPI from  '../../api/artistAPI';
import  * as AudioAPI  from  '../../api/audioAPI';
import { Observable } from 'rxjs/Observable';

const artistFetch =() => {
    return saga$ => saga$
         .filter(whenAction(REQUEST_ARTISTS))
         .mergeMap(()  => ArtistAPI.default.getArtists(300))
         .map(res => {
                return {
                    type: RECEIVED_ARTISTS,
                    payload: res
               };
         });
};


const fetchAudio = () => {
    return saga$ => saga$
        .filter(whenAction(REQUEST_AUDIODATA))
        .mergeMap(() => AudioAPI.default.getTrack("https://upload.wikimedia.org/wikipedia/en/d/db/Rapper%27s_Delight_sample.ogg"))
        .map(res => {
                return {
                    type: RECEIVED_AUDIODATA,
                    payload: res
                };
        });
};

export default [
    artistFetch,
    fetchAudio
].map(effect => createSaga(effect));
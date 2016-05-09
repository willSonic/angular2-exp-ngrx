import {Http} from '@angular/http';
import {createSaga, Saga, whenAction, toPayload} from 'store-saga';
import {REQUEST_ARTISTS, RECEIVED_ARTISTS} from '../reducers/artistsReducer';
import {AUDIODOWNLOAD_REQUEST, AUDIODOWNLOAD_FAILURE, AUDIODOWNLOAD_SUCCESS} from '../reducers/audioReducer';
import * as artists from '../../api/artistRemote';
import  * as audiomachine from '../../api/audiomachineRemote';
import { Observable } from 'rxjs/Observable';


const artistFetch = () => {
    return saga$ => saga$
        .filter(whenAction(REQUEST_ARTISTS))
        .mergeMap(() => artists.default.getArtists(300))
        .map(res => {
            return {
                type: REQUEST_ARTISTS,
                payload: res
            };
        });
};

const audioLoad = () => {
    return saga$ => saga$
        .filter(whenAction(AUDIODOWNLOAD_REQUEST))
        .map(toPayload)
        .mergeMap(payload => audiomachine.getTrack(payload))
        .map(res => {
            return {
                type: AUDIODOWNLOAD_SUCCESS,
                payload: res
            };
        });
};


export default [
    artistFetch,
    audioLoad
].map(effect => createSaga(effect));
import {Http} from '@angular/http';
import {createSaga, Saga, whenAction, toPayload} from 'store-saga';
import {REQUEST_ARTISTS, RECEIVED_ARTISTS, RECEIVED_ERROR} from '../reducers/artistsReducer';
import {REQUEST_AUDIODATA, RECEIVED_AUDIODATA}from '../reducers/audioReducer';
import {ADD_ARTIST_TO_PLAYLIST} from '../reducers/playlistReducer';
import {IAudiodata} from '../reducers/audioReducer';
import  * as ArtistAPI from  '../../api/artistAPI';
import  * as AudioAPI  from  '../../api/audioAPI';
import { Observable } from 'rxjs/Observable';



const artistFetch = createSaga( function(){
    return iteration$ => iteration$
         .filter(whenAction(REQUEST_ARTISTS))
         .mergeMap(()  => ArtistAPI.default.getArtists(300))
         .map(res => {
                return {
                    type: RECEIVED_ARTISTS,
                    payload: res
               };
         });
});


const fetchAudio = createSaga( function(){

    return iteration$ => iteration$
        .filter(whenAction(ADD_ARTIST_TO_PLAYLIST))
        /*

        .map((iteration) => {
                console.log('fetchAudio  === iteration ', iteration)
                return  iteration;
        })
         */
        .mergeMap((iteration) => {
                 return  AudioAPI.default.getTrack(iteration.action.payload.trackURL)
                        .map((res) => {
                                console.log('fetchAudio SAGA  === res ', res);
                                 var audioDataObj = new Object()
                                 Object.assign(audioDataObj,
                                               {artist : iteration.action.payload},
                                               {artistAudioBuffer:res});

                                console.log('fetchAudio SAGA  === audioDataObj ', audioDataObj);
                                 return {
                                    type: RECEIVED_AUDIODATA,
                                    payload: audioDataObj
                                };
                        })

        });
       /* .map((res) => {
                return {
                    type: RECEIVED_AUDIODATA,
                    payload: res
                };
        });*/
      //  .map(res => res)
});

export default [
    artistFetch,
    fetchAudio
];
import {Http} from '@angular/http';
import {createSaga, Saga, whenAction, toPayload} from 'store-saga';
import {REQUEST_ARTISTS, RECEIVED_ARTISTS, RECEIVED_ERROR} from '../reducers/artistsReducer';
import {REQUEST_AUDIODATA, RECEIVED_AUDIODATA}from '../reducers/audioReducer';
import {ADD_ARTIST_TO_PLAYLIST} from '../reducers/playlistReducer';
import {IAudiodata} from '../reducers/audioReducer';
import {PLAY_INITIATED, TOGGLE_PLAY_PAUSE} from '../reducers/audioplayerReducer';
import  * as ArtistAPI from  '../../api/artistAPI';
import  * as DataLoadAPI  from  '../../api/dataloadAPI';
import { WebAudioPlayerAPI } from '../../api/webaudioAPI';
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
    console.log('fetchAudio SAGA  callled');
    return iteration$ => iteration$
        .filter(whenAction(REQUEST_AUDIODATA))
        .mergeMap((iteration) => {
                 return  DataLoadAPI.default.getTrack(iteration.action.payload.artist.trackURL)
                        .map((res) => {
                                 console.log("fetchAudio SAGA res.audiodata audiobuffer.", res);
                                 return {
                                    type: RECEIVED_AUDIODATA,
                                    payload:  Object.assign(iteration.action.payload,
                                               {artist : iteration.action.payload.artist},
                                               {artistAudioBuffer:res},
                                               {downloadComplete:true})
                                };
                        })

        });
});


const playAudioItem = createSaga(

    function sagaFactory(webAudioPlayer: WebAudioPlayerAPI) {

        return function playerServices(iteration$: Observable<any>) {
             console.log('playAudioItem SAGA  callled');
             return iteration$.filter(whenAction(PLAY_INITIATED))
                              .mergeMap((iteration) => {
                 console.log("playAudioItem SAGA iteration.action.payload = ", iteration.action.payload);
                 return  webAudioPlayer.loadAudio(iteration.action.payload)
                        .map((res) => {
                                 console.log("playAudioItem SAGA res.audiodata audiobuffer.", res);
                                 return {
                                    type: TOGGLE_PLAY_PAUSE,
                                    payload:  Object.assign(iteration.action.payload,
                                               {artist : iteration.action.payload.artist},
                                               {artistAudioBuffer:res},
                                               {downloadComplete:true})
                                };
                        })

        });

         };
    }, [WebAudioPlayerAPI] );

export default [
    artistFetch,
    fetchAudio,
    playAudioItem
];
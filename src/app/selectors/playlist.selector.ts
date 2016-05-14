let STORE_SLICE_NAME = 'playlist';
import { Observable } from 'rxjs';

import { audioSelector} from './audio.selector';


export const playlistArraySelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => res.audioList);


export const attachAudioData = (store: any) => Observable
    .combineLatest(store.let(playlistArraySelector), store.let(audioSelector))
    .map((res: any) => {
        console.log("artistReducer --res[0] ", res[0]);
        console.log("artistReducer --res[1] ", res[1]);
        if(res[0].length>0 ){
          var newResult = Object.keys(res[0]).map(key => res[0][key]).map ( value =>{
              var obj;
               console.log("artistReducer --value ", value);
               if(value.id === res[1].artist.id){
                    obj =  Object.assign({}, value, res[1].artistAudioBuffer)
               }
               return obj;
            });
            console.log("artistReducer --newResult ", newResult);
            return newResult
        }else{
           return res[0]
        }
    });

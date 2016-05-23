import {Injectable} from "@angular/core";
import {Store, Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {CREATE_AUDIODATA,ADD_TO_PLAYLIST, REQUEST_AUDIODATA, IAudiodata} from "../reducers/audioReducer";
import {IArtist} from "../reducers/artistsReducer";


@Injectable()
export class AudioServiceAction {

    private sactions$: Subject<Action> = new Subject<Action>();

    constructor(  private _store : Store<any>){

            const fetchAudio = this.sactions$
            .filter((action : Action) => action.type === REQUEST_AUDIODATA);

            const createPlaylistItem =this.sactions$
            .filter((action : Action) => action.type === CREATE_AUDIODATA);


            Observable
            /*
                For more on merge: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35#merge
            */
            .merge(createPlaylistItem, fetchAudio)
            .subscribe(_store);



    }

    fetchAudio = (audiodataItem  : IAudiodata) => {
        this.sactions$.next({type: REQUEST_AUDIODATA, payload: audiodataItem });
    }

    createPlaylistItem = (artist : IArtist) => {
        console.log('createPlaylistItem   = ', artist);
        this.sactions$.next({type: CREATE_AUDIODATA, payload: artist });
    }


}
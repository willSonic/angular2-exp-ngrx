import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser/index';
import {ArtistPlaylistApp} from './artistPlaylist-app';
import {AudioServiceAction} from './actions/audioServiceAction';
import {provideStore, usePreMiddleware, usePostMiddleware, Middleware} from "@ngrx/store";
import {APP_REDUCERS} from "./reducers/reducers";
import {APP_SAGAS} from "./sagas/sagas";
import audiomachineSagas from "./sagas/audiomachine";
import {installSagaMiddleware} from 'store-saga';


import { apiInjectables } from '../api/api.injectable.ts';

/*
*  Customized XHR repsonse to override
*/


import {CustomBrowserXhr} from '../util/custom.xhr';

const actionLog : Middleware = action => {
    return action.do(val => {
        console.warn('DISPATCHED ACTION: ', val)
    });
};

const stateLog : Middleware = state => {
    return state.do(val => {
        console.info('NEW STATE: ', val)
    });
};


export function main() {
  return bootstrap(ArtistPlaylistApp, [
      apiInjectables,
      ELEMENT_PROBE_PROVIDERS,
      HTTP_PROVIDERS,
      AudioServiceAction,
      provide(BrowserXhr, { useClass: CustomBrowserXhr }),
      provideStore(APP_REDUCERS),
      usePreMiddleware(actionLog),
      usePostMiddleware(stateLog),
      installSagaMiddleware(...audiomachineSagas)
  ])
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
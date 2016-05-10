import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS, BrowserXhr} from '@angular/http';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser/index';
import {ArtistPlaylistApp} from './artistPlaylist-app';
import {provideStore} from "@ngrx/store";
import {APP_REDUCERS} from "./reducers/reducers";
import {APP_SAGAS} from "./sagas/sagas";
import audiomachineSagas from "./sagas/audiomachine";
import {installSagaMiddleware} from 'store-saga';


/*
*  Customized XHR repsonse to override
*/


import {CustomBrowserXhr} from '../util/custom.xhr';



export function main() {
  return bootstrap(ArtistPlaylistApp, [
      ELEMENT_PROBE_PROVIDERS,
      HTTP_PROVIDERS,
      provide(BrowserXhr, { useClass: CustomBrowserXhr }),
      provideStore(APP_REDUCERS),
      installSagaMiddleware(...audiomachineSagas)
  ])
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
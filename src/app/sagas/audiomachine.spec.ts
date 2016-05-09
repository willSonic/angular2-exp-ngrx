import '../../test_harness';
import {Injector, Provider, ReflectiveInjector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {provideStore, Store, Action, Dispatcher, usePostMiddleware} from '@ngrx/store';
import {Saga, SagaRunner, schedulerProvider, SagaScheduler, createSaga, whenAction, installSagaMiddleware} from 'store-saga';
import {SagaTester} from 'store-saga/testing';

import {artists, REQUEST_ARTISTS, RECEIVED_ARTISTS} from '../reducers/artistsReducer';
import {AUDIODOWNLOAD_REQUEST, AUDIODOWNLOAD_SUCCESS} from '../reducers/audioReducer';
import {jsonArtists} from '../../api/artistsJSON';

import sagas from './audiomachine';


describe('Audiomachine Effect LOAD', () => {
    let sagaTester: SagaTester;

    beforeEach(() => {
        const injector = ReflectiveInjector.resolveAndCreate([
            SagaTester, schedulerProvider
        ]);

        sagaTester = injector.get(SagaTester);
    });

    it('should dispatch artist list', (done) => {

        sagaTester.run(sagas[0]);
        sagaTester.sendAction({ type: REQUEST_ARTISTS });

        sagaTester.output
            .filter(Boolean)
            .subscribe(last => {
                expect(last).toEqual({ type: REQUEST_ARTISTS, payload: jsonArtists });
                done();
            });
    });

    it('should download audio', (done) => {

        sagaTester.run(sagas[1]);
        sagaTester.sendAction({ type: AUDIODOWNLOAD_REQUEST, payload: [0, 1] });

        sagaTester.output
            .filter(Boolean)
            .subscribe(last => {
                expect(last).toEqual({ type: AUDIODOWNLOAD_SUCCESS, payload: 0 });
                done();
            });
    });
});

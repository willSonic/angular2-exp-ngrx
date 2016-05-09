import {ADD_TO_PLAYLIST} from "./artistsReducer";
import {audio, AUDIODOWNLOAD_SUCCESS} from "./audioReducer";
//had issue with jasmine typing conflicts, this is temporary workaround
declare var it, expect, describe, toBe;

describe('The audio reducer', () => {
    it('should return current state when no valid actions have been made', () => {
        const state = { artistIds: [], loadedById: [] };
        const actual = audio(state, { type: 'INVALID_ACTION', payload: {} });
        const expected = state;
        expect(actual).toBe(expected);
    });

    it('should initialize quantity in audio when ADD_TO_PLAYLIST is dispatched', () => {
        const state = { artistIds: [], loadedById: {} };
        const actual = audio(state, { type: ADD_TO_PLAYLIST, payload: 1 });
        const expected = state;
        expect(1).toBe(actual.artistIds[1]);
        expect(1).toBe(actual.loadedById[0]);
    });

    it('should increase quantity in audio when ADD_TO_PLAYLIST is dispatched', () => {
        const state = { artistIds: [2], loadedById: { 2: 1 } }
        const actual = audio(state, { type: ADD_TO_PLAYLIST, payload: 2 });
        const expected = state;
        expect(state.artistIds[2] + 1).toBe(actual.loadedById[2]);
        expect(2).toBe(actual.artistIds[0]);
    });

    it('should return initial cart when CHECKOUT_SUCCESS is dispatched', () => {
        const state = { artistIds: [2], loadedById: { 2: 1 } }
        const actual = audio(state, { type: AUDIODOWNLOAD_SUCCESS });
        const expected = { artistIds: [], loadedById: {} };
        expect(actual).toEqual(expected);
    });
});

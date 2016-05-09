import {artists, ADD_TO_PLAYLIST, REQUEST_ARTISTS} from "./artistsReducer";
import {jsonArtists} from "../../api/artistsJSON";
//had issue with jasmine typing conflicts, this is temporary workaround
declare var it, expect, describe, toBe;

describe('The artists reducer', () => {
    it('should return current state when no valid actions have been made', () => {
        const state = "Angular 2";
        const actual = artists(state, {type: 'INVALID_ACTION', payload: {}});
        const expected = state;
        expect(actual).toBe(expected);
    });

    it('should return received artists when REQUEST_ARTISTS is dispatched', () => {
        const state = jsonArtists.reduce((obj, artist) => {
                    obj[artist.id] = artist;
                    return obj;
                }, {});
        const actual = artists(state, {type: REQUEST_ARTISTS, payload: jsonArtists});
        const expected = state;
        expect(actual).toEqual(expected);
    });

    it('should decrease inventory when ADD_TO_PLAYLIST is dispatched', () => {
        const state = jsonArtists.reduce((obj, artist) => {
                    obj[artist.id] = artist;
                    return obj;
                }, {});
        const actual = artists(state, {type: ADD_TO_PLAYLIST, payload: 1});
        const expected = state;
        expect(state[1].inventory - 1).toBe(actual[1].inventory);
    });
});

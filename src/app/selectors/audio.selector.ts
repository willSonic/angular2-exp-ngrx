let STORE_SLICE_NAME = 'audiobytes';

export const audioSelector = (store: any) => store.select(STORE_SLICE_NAME);
export const audioAsArraySelector = (store: any) => store.select(STORE_SLICE_NAME).map(res => Object.keys(res).map(key => res[key]));
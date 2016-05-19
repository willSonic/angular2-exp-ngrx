let STORE_SLICE_NAME = 'audioItem';

export const audioBufferSelector = (store: any) => store.select(STORE_SLICE_NAME)
                       .map(res => res.artistAudioBuffer);
                       

export const audioSelector = (store: any) => store.select(STORE_SLICE_NAME)
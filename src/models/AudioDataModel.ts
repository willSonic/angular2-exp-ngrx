import { uuid } from 'util/uuid';
import { Artist } from 'ArtistDataModel';

export class AudioDataModel {
    id:string;
    artist:Artist;
    binaryBuffer:ArrayBuffer;
    constructor(obj?: any){
        this.id              = obj && obj.id              || uuid();
        this.artist          = obj && obj.artist          || null;
        this.binaryBuffer    = obj && obj.binaryBuffer    || null;
    }
}
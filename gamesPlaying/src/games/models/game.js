import {v4 as uuid} from 'uuid';

export class Game {

    constructor(description){
        this.id = uuid();
        this.description = description;
        this.playing = true;
        this.createdAt = new Date();
    }
}
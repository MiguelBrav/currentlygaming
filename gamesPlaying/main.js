import {App} from './src/games/app.js';
import store from './src/storage/game.store.js';

store.initStore();

App("#app");


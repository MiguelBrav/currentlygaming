import { Game } from "../games/models/game";

export const Filters = {
    All: 'all',
    Stop: 'stop',
    Playing: 'playing'
}

const state = {
    games: [
        new Game('Honkai star rail'),
        new Game('Genshin impact'),
        new Game('League of legends') 
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log(state);
    console.log('-- InitStore --');
    
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {games = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.games = games;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state',JSON.stringify(state));
}

const getGames = (filter = Filters.All) => {
   switch(filter){
    case Filters.All:
        return [...state.games];
    case Filters.Playing:
        return state.games.filter( game => game.playing)
    case Filters.Stop:
        return state.games.filter( game => !game.playing)
    default:
        throw new Error('Option filter is not valid');
    }   
}

const addGame = ( description) => {
    if(!description) throw new Error('Description is required');

    state.games.push(new Game(description));

    saveStateToLocalStorage();
}

const toggleGame = (gameId) => {
    state.games = state.games.map(
        game => {
            if(game.id === gameId){
                game.playing = !game.playing;
            }
            return game;
        }
    );
    saveStateToLocalStorage();
}

const deleteGame = (gameId) => {
    state.games =  state.games.filter(game => game.id !== gameId);
    saveStateToLocalStorage();
}

const deleteStoppedGame = () => {
    state.games =  state.games.filter(game => game.playing);
    saveStateToLocalStorage();
}

const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default{
    initStore,
    loadStore,
    getGames,
    addGame,
    toggleGame,
    deleteGame,
    deleteStoppedGame,
    setFilter,
    getCurrentFilter
}
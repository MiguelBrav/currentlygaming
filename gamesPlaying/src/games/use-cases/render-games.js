import { createGamesHTML } from "./";

let element;

export const renderGames = (elementId, games = []) => {

    if(!element){
        element = document.querySelector(elementId);
    }


    if(!element){
        throw new Error('Element not found');
    }

    element.innerHTML = '';


    games.forEach(game => {
        element.append( createGamesHTML(game))
    });
}
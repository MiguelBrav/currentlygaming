import gameStore from "../../storage/game.store";

let element;

export const renderCounter = (elementId,games = []) => {

    if(!element){
        element = document.querySelector(elementId);
    }

    if(!element){
        throw new Error('Element not found');
    }

    element.innerHTML = games.length;
}
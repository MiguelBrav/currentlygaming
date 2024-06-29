export const createGamesHTML = (game) => {
    
    if(!game) throw new Error('Game object is required');

    const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${game.playing ? 'checked' : ''}>
                    <label>${game.description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
           `;

    const liElement = document.createElement('li');
    liElement.setAttribute('data-id', game.id);

    if(!game.playing){
        liElement.classList.add('completed');
    }

    liElement.innerHTML = html;

    return liElement;

}
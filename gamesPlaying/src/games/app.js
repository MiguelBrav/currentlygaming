import gameStore, { Filters } from '../storage/game.store';
import html from './app.html?raw';
import { renderGames, renderCounter } from './use-cases/index'

export const App = (elementId) => {
  document.addEventListener('DOMContentLoaded', () => {
    (() => {
      const ElementIds = {
        GameList: '.todo-list',
        NewGameInput: '#new-todo-input',
        ClearStoppedGames: '.clear-completed',
        FilterSelected: '.filtro',
        CounterTotal: '#pending-count'
      }

      const displayGames = () => {
        const games = gameStore.getGames(gameStore.getCurrentFilter());
        renderGames(ElementIds.GameList, games);

        renderCounter(ElementIds.CounterTotal,games);
      }


      const app = document.createElement('div');
      app.innerHTML = html;
      document.querySelector(elementId).append(app);
      displayGames();

      const newDescriptonInput = document.querySelector(ElementIds.NewGameInput);
      const gameListUL = document.querySelector(ElementIds.GameList);
      const clearStoppedItem = document.querySelector(ElementIds.ClearStoppedGames);
      const filtersUL = document.querySelectorAll(ElementIds.FilterSelected);

      newDescriptonInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;

        if (event.target.value.trim().length === 0) return;

        gameStore.addGame(event.target.value);

        displayGames();

        event.target.value = '';
      });

      gameListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');

        gameStore.toggleGame(element.getAttribute('data-id'));
        displayGames();
      });

      gameListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';

        const element = event.target.closest('[data-id]');

        if (!element || !isDestroyElement) return;

        gameStore.deleteGame(element.getAttribute('data-id'));

        displayGames();
      });

      clearStoppedItem.addEventListener('click', (event) => {

        gameStore.deleteStoppedGame();

        displayGames();
      });

      filtersUL.forEach(element => {
        element.addEventListener('click', (element) => {
          filtersUL.forEach(el => el.classList.remove('selected'))


          element.target.classList.add('selected');

          let filter = element.target.getAttribute('data-translate-key');

          switch (filter) {
            case 'all':
              gameStore.setFilter(Filters.All);
              break;
            case 'playing':
              gameStore.setFilter(Filters.Playing);
              break;
            case 'stop':
              gameStore.setFilter(Filters.Stop);
              break;
            case 'default':
              gameStore.setFilter(Filters.All);
              break;
          }
          displayGames();

        });

      });

    })();

    async function loadLanguage(lang) {
      try {
        const response = await fetch(`/src/languages/${lang}.json`);
        const translations = await response.json();
        return translations;
      } catch (error) {
        console.error("Error loading language:", error);
      }
    }

    function applyTranslations(translations) {
      document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        element.textContent = translations[key] || key;
      });

      const placeholderText = translations["question"];
      document.getElementById('new-todo-input').setAttribute('placeholder', placeholderText);
    }

    async function changeLanguage(lang) {
      const translations = await loadLanguage(lang);
      applyTranslations(translations);
    }

    document.getElementById('language-select').addEventListener('change', (event) => {
      changeLanguage(event.target.value);
    });

    changeLanguage('en');
  });
};
import { Spaceship } from './Spaceship.js';

class Game {
    #htmlElements = {
        spaceship: document.querySelector('[data-spaceship]'),
        container: document.querySelector('[data-container]')
    }

    #ship = new Spaceship(this.#htmlElements.spaceship,
        this.#htmlElements.container);

    init() {
        this.#ship.init();
    }
}

window.onload = () => {
    const game = new Game();
    game.init();
}
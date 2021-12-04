import { Spaceship } from './Spaceship.js';
import { Enemy } from './Enemy.js';

class Game {
    #htmlElements = {
        spaceship: document.querySelector('[data-spaceship]'),
        container: document.querySelector('[data-container]')
    }

    #ship = new Spaceship(this.#htmlElements.spaceship,
        this.#htmlElements.container);

    #checkPositionInterval = null;
    #createEnemyInterval = null;
    #enemies = [];
    #enemiesInterval = null;

    init() {
        this.#ship.init();
        this.#newGame();
    }

    #newGame() {
        this.#enemiesInterval = 30;
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
        this.#createEnemyInterval = setInterval(() => {
            this.#createNewEnemy();
        }, 1000);
    }

    #createNewEnemy() {
        const enemy = new Enemy(this.#htmlElements.container, this.#enemiesInterval, 'enemy');
        enemy.init();
        this.#enemies.push(enemy);
    }


    #checkPosition() {
        this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
            const missilePosition = {
                top: missile.element.offsetTop,
                bottom: missile.element.offsetTop + missile.element.offsetHeight,
                left: missile.element.offsetLeft,
                right: missile.element.offsetLeft + missile.element.offsetWidth
            }
            if (missilePosition.bottom < 0) {
                missile.remove();
                missileArray.splice(missileIndex, 1);
            }
        });
        this.#enemies.forEach((enemy, enemyIndex, enemyArray) => {
            const enemyPosition = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth
            }
            if (enemyPosition.top > window.innerHeight) {
                enemy.remove();
                enemyArray.splice(enemyIndex, 1);
            }
        });
    }
}

window.onload = () => {
    const game = new Game();
    game.init();
}
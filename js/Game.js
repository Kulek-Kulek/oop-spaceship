import { Spaceship } from './Spaceship.js';
import { Enemy } from './Enemy.js';

class Game {
    #htmlElements = {
        spaceship: document.querySelector('[data-spaceship]'),
        container: document.querySelector('[data-container]'),
        score: document.querySelector('[data-score]'),
        lives: document.querySelector('[data-lives]'),
        modal: document.querySelector('[data-modal]'),
        button: document.querySelector('[data-button]'),
        scoreInfo: document.querySelector('[data-score-info]')
    }

    #ship = new Spaceship(this.#htmlElements.spaceship,
        this.#htmlElements.container);

    #checkPositionInterval = null;
    #createEnemyInterval = null;
    #enemies = [];
    #enemiesInterval = null;
    #enemySizeModifier = 5;
    #difficultyLevelUp = 5;
    #lives = null;
    #score = null;

    init() {
        this.#ship.init();
        this.#newGame();
        this.#htmlElements.button.addEventListener('click', () => this.#newGame());
    }

    #newGame() {
        this.#htmlElements.modal.classList.add('hide');
        this.#enemiesInterval = 30;
        this.#lives = 3;
        this.#score = 0;
        this.#updateLivesText();
        this.#updateScoreText();
        this.#ship.element.style.left = '0px';
        this.#ship.setPosition();
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
        this.#createEnemyInterval = setInterval(() => {
            this.#randomNewEnemy();
        }, 1000);
    }

    #endGame() {
        this.#htmlElements.scoreInfo.textContent = 'Game Over. Your score: ' + this.#score + ' points.';
        this.#enemies.forEach(enemy => enemy.explode());
        this.#htmlElements.modal.classList.remove('hide');
        this.#enemies.length = 0;
        clearInterval(this.#createEnemyInterval);
        clearInterval(this.#checkPositionInterval);
    }

    #createNewEnemy(...params) {
        const enemy = new Enemy(...params);
        enemy.init();
        this.#enemies.push(enemy);
    }

    #randomNewEnemy() {
        const randomNumber = Math.floor(Math.random() * this.#enemySizeModifier + 1);
        randomNumber % this.#enemySizeModifier
            ? this.#createNewEnemy(
                this.#htmlElements.container,
                this.#enemiesInterval,
                'enemy',
                'explosion'
            )
            : this.#createNewEnemy(
                this.#htmlElements.container,
                this.#enemiesInterval * 2,
                'enemy--big',
                'explosion--big',
                3
            )
    }


    #checkPosition() {
        this.#enemies.forEach((enemy, enemyIndex, enemyArray) => {
            const enemyPosition = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth
            };
            if (enemyPosition.top > window.innerHeight) {
                enemy.explode();
                enemyArray.splice(enemyIndex, 1);
                this.#updateLives();
            };
            this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
                const missilePosition = {
                    top: missile.element.offsetTop,
                    bottom: missile.element.offsetTop + missile.element.offsetHeight,
                    left: missile.element.offsetLeft,
                    right: missile.element.offsetLeft + missile.element.offsetWidth
                };

                if (missilePosition.bottom >= enemyPosition.top && missilePosition.top <= enemyPosition.bottom && missilePosition.right >= enemyPosition.left && missilePosition.left <= enemyPosition.right) {
                    missile.remove();
                    missileArray.splice(missileIndex, 1);
                    this.#updateScore();
                    enemy.hit();
                    if (!enemy.lives) {
                        enemyArray.splice(enemyIndex, 1);
                    }
                }

                if (missilePosition.bottom < 0) {
                    missile.remove();
                    missileArray.splice(missileIndex, 1);
                };
            });
        });
    }

    #updateScore() {
        this.#score++;
        this.#updateScoreText();
        if (!(this.#score % this.#difficultyLevelUp)) this.#enemiesInterval--;
    }

    #updateScoreText() {
        this.#htmlElements.score.textContent = 'Score: ' + this.#score;
    }

    #updateLives() {
        this.#lives--;
        this.#updateLivesText();
        this.#htmlElements.container.classList.add('hit');
        setTimeout(() => {
            this.#htmlElements.container.classList.remove('hit');
        }, 100);
        if (!this.#lives) this.#endGame();
    }

    #updateLivesText() {
        this.#htmlElements.lives.textContent = 'Lives: ' + this.#lives;
    }
}

window.onload = () => {
    const game = new Game();
    game.init();
}
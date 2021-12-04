export class Enemy {
    constructor(container, enemiesInterval, enemyClass, explosionClass, lives = 1) {
        this.container = container;
        this.enemyClass = enemyClass;
        this.element = document.createElement('div');
        this.interval = null;
        this.enemiesInterval = enemiesInterval;
        this.explosionClass = explosionClass;
        this.lives = lives;
    }

    init() {
        this.#setEnemy();
        this.#updatePosition();
    }

    #setEnemy() {
        this.element.classList.add(this.enemyClass);
        this.element.style.top = '0px';
        this.element.style.left = this.#randomPosition() + 'px';
        this.container.appendChild(this.element);
    }

    #randomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }

    #updatePosition() {
        this.interval = setInterval(() => {
            this.#setNewPosition();
        }, this.enemiesInterval);
    }

    #setNewPosition() {
        this.element.style.top = `${this.element.offsetTop + 1}px`;
    }

    hit() {
        this.lives--;
        if (!this.lives) {
            this.explode();
        }
    }

    explode() {
        this.element.classList.remove(this.enemyClass);
        this.element.classList.add(this.explosionClass);
        clearInterval(this.interval);
        const animationTimeout = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10);
        setTimeout(() => {
            this.element.remove();
        }, animationTimeout);
    }
}
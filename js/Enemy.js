export class Enemy {
    constructor(container, enemiesInterval, enemyClass) {
        this.container = container;
        this.enemyClass = enemyClass;
        this.element = document.createElement('div');
        this.interval = null;
        this.enemiesInterval = enemiesInterval;
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

    remove() {
        clearInterval(this.interval);
        this.element.remove();
    }
}
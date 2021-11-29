export class Missile {
    constructor(x, y, container) {
        this.x = x;
        this.y = y;
        this.container = container;
        this.element = document.createElement('div');
    }

    init() {
        this.element.classList.add('missile');
        this.container.appendChild(this.element);
        this.element.style.left = `${this.x + this.element.offsetWidth / 1.5}px`;
        this.element.style.top = `${this.y - this.element.offsetHeight / 2}px`;

        setInterval(() => {
            this.element.style.top = `${this.element.offsetTop - 1}px`;
        }), 5
    }
}
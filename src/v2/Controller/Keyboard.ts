import * as PIXI from 'pixi.js'

export class Keyboard {

    private keysPressed: { [key: string]: boolean } = {}

    constructor(private document: Document, private container: PIXI.Container) {

        const handleKeyDown = (event: KeyboardEvent) => {
            this.keysPressed[event.code] = true;
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            this.keysPressed[event.code] = false;
        };

        this.document.addEventListener("keydown", handleKeyDown);
        this.document.addEventListener("keyup", handleKeyUp);
    }

    public move() {
        if (!this.keysPressed || Object.keys(this.keysPressed).length === 0) {
            return;
        }
        const speed = 5;

        if (this.keysPressed["KeyA"]) {
            this.container.x -= speed;
        }
        if (this.keysPressed["KeyD"]) {
            this.container.x += speed;
        }
        if (this.keysPressed["KeyW"]) {
            this.container.y -= speed;
        }
        if (this.keysPressed["KeyS"]) {
            this.container.y += speed;
        }
    }
}
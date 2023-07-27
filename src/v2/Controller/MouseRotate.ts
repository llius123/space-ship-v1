import * as PIXI from 'pixi.js'
export class MouseRotate {

    private mousePosition: { x: number; y: number } = { x: 0, y: 0 };

    constructor(private document: Document, private _container: PIXI.Container) {

        const handleMouseMove = (event: MouseEvent) => {
            this.mousePosition = {
                x: event.clientX,
                y: event.clientY,
            };
        };

        this.document.addEventListener("mousemove", handleMouseMove);
    }


    public rotate() {
        // Calculate the angle between the sprite and the mouse position
        // const mousePosition = this.main.renderer.plugins.interaction.mouse.global;
        const dx = this.mousePosition.x - this._container.x;
        const dy = this.mousePosition.y - this._container.y;
        const angle = Math.atan2(dy, dx);
        // Convert the angle from radians to degrees
        const degrees = angle * (180 / Math.PI);

        // Update the rotation of the sprite
        this._container.angle = degrees - 90;
    }
}
import * as PIXI from "pixi.js";

export class KeyboardControl {
  private keysPressed: { [key: string]: boolean } = {};
  private mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  constructor(private document: Document) {
    // Listen to keyboard events
    const handleKeyDown = (event: KeyboardEvent) => {
      this.keysPressed[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      this.keysPressed[event.code] = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    this.document.addEventListener("keydown", handleKeyDown);
    this.document.addEventListener("keyup", handleKeyUp);
    this.document.addEventListener("mousemove", handleMouseMove);
  }

  public move(container: PIXI.Container<PIXI.DisplayObject>) {
    if (!this.keysPressed || Object.keys(this.keysPressed).length === 0) {
      return;
    }
    const speed = 5;

    if (this.keysPressed["KeyA"]) {
      container.x -= speed;
    }
    if (this.keysPressed["KeyD"]) {
      container.x += speed;
    }
    if (this.keysPressed["KeyW"]) {
      container.y -= speed;
    }
    if (this.keysPressed["KeyS"]) {
      container.y += speed;
    }
  }

  public rotate(container: PIXI.Container<PIXI.DisplayObject>) {
    // Calculate the angle between the sprite and the mouse position
    // const mousePosition = this.main.renderer.plugins.interaction.mouse.global;
    const dx = this.mousePosition.x - container.x;
    const dy = this.mousePosition.y - container.y;
    const angle = Math.atan2(dy, dx);
    // Convert the angle from radians to degrees
    const degrees = angle * (180 / Math.PI);

    // Update the rotation of the sprite
    container.angle = degrees - 90;
  }
}

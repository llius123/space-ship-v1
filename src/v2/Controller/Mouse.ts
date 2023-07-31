import * as PIXI from "pixi.js";
import { Ticker } from "../Ticker";
export class Mouse {
  private mousePosition: { x: number; y: number } = { x: 0, y: 0 };

  private mousePositionWhenClick: { x: number; y: number } = { x: 0, y: 0 };
  private clicked = false;

  constructor(private document: Document) {
    const handleMouseMove = (event: MouseEvent) => {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleClick = (event: MouseEvent) => {
      this.clicked = true;
      this.mousePositionWhenClick = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    this.document.addEventListener("mousemove", handleMouseMove);
    this.document.addEventListener("click", handleClick);
  }

  public rotate(container: PIXI.Container) {
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

  public click(
    callback: (angle: number, position: PIXI.ObservablePoint) => void,
    container: PIXI.Container
  ) {
    if (!this.clicked) {
      return;
    }
    callback(container.angle, container.position);

    this.clicked = false;
  }

  public moveToPoint(container: PIXI.Container, ticker: Ticker) {
    const speed = 10;

    // if (!this._readyToMove) {
    //   return;
    // }

    // console.log(this.mousePositionWhenClick, { x: Math.round(container.x), y: Math.round(container.y) });
    // console.log(this.mousePositionWhenClick.x === Math.round(container.x), this.mousePositionWhenClick.y === Math.round(container.y));
    // console.log(this.mousePositionWhenClick.y, Math.round(container.y));
    // console.log(y(this.mousePositionWhenClick.y, Math.round(container.y)));
    //console.log(this.mousePositionWhenClick.x, container.x);

    // if (
    //   normalizePositions(
    //     this.mousePositionWhenClick.x,
    //     Math.round(container.x)
    //   ) &&
    //   normalizePositions(this.mousePositionWhenClick.y, Math.round(container.y))
    // ) {
    //   console.log("done");
    //   callback();
    // }

    const distanceX = this.mousePositionWhenClick.x - container.x;
    const distanceY = this.mousePositionWhenClick.y - container.y;
    const distance = Math.round(
      Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    );
    console.log(distance);

    if (distance <= 3) {
      ticker.stop();
      container.destroy();
    }

    const direction: PIXI.Point = new PIXI.Point();

    direction.x = this.mousePositionWhenClick.x - container.x;
    direction.y = this.mousePositionWhenClick.y - container.y;

    // Normalize the direction vector
    const length = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    direction.x /= length;
    direction.y /= length;

    container.position.x += direction.x * speed;
    container.position.y += direction.y * speed;
  }
}

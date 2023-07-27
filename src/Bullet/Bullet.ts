import * as PIXI from "pixi.js";
import SpriteIcon from "../assets/vite.svg";

export class Bullet {
  private _container: PIXI.Container = new PIXI.Container();
  private _sprite: PIXI.Sprite = new PIXI.Sprite();
  private _graphics: PIXI.Graphics = new PIXI.Graphics();
  private _icon: PIXI.Texture;

  private _readyToMove = false;
  private mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private _direction: PIXI.Point = new PIXI.Point();

  constructor(public document: Document) {
    this.movementConfig();
  }
  private movementConfig() {
    const handleMouseMove = (event: MouseEvent) => {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    this.document.addEventListener("mousemove", handleMouseMove);
  }

  public async setup() {
    this._icon = await PIXI.Assets.load(SpriteIcon);
    this._sprite = PIXI.Sprite.from(this._icon);
    this.addGraphicsToSprite();

    this._container.addChild(this._sprite);
  }

  private addGraphicsToSprite(): void {
    this._graphics.lineStyle(1, 0xff0000);
    this._graphics.drawRect(
      this._sprite.position._x,
      this._sprite.position._y,
      this._sprite.width,
      this._sprite.height
    );
    this._container.addChild(this._graphics);
  }

  public get container() {
    return this._container;
  }

  public move() {
    const speed = 10;
    if (!this._readyToMove) {
      return;
    }

    // Normalize the direction vector
    const length = Math.sqrt(
      this._direction.x * this._direction.x +
      this._direction.y * this._direction.y
    );
    this._direction.x /= length;
    this._direction.y /= length;

    this._container.position.x += this._direction.x * speed;
    this._container.position.y += this._direction.y * speed;
  }

  public readyToMove(angle: number, position: PIXI.ObservablePoint) {
    this._container.position = position;
    this._container.angle = angle;
    this._readyToMove = true;

    this._direction.x = this.mousePosition.x - this._container.x;
    this._direction.y = this.mousePosition.y - this._container.y;

    this.rotateCenterContainer();
  }

  private rotateCenterContainer() {
    this._container.pivot.x = this._container.width / 2;
    this._container.pivot.y = this._container.width / 2;
  }
}

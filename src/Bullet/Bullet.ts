import * as PIXI from "pixi.js";
import SpriteIcon from "../assets/vite.svg";

export class Bullet {
  private _container: PIXI.Container = new PIXI.Container();
  private _sprite: PIXI.Sprite = new PIXI.Sprite();
  private _graphics: PIXI.Graphics = new PIXI.Graphics();
  private _icon: PIXI.Texture;

  private _readyToMove = false;

  constructor() {}
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
    if (!this._readyToMove) {
      return;
    }

    if (Math.sign(this._container.angle) === 1) {
      //Bottom left
      this._container.y += 5;
      this._container.x -= 5;
    } else if (this._container.angle < -90) {
      if (this._container.angle < -180) {
        // Top left
        this._container.y -= 5;
        this._container.x -= 5;
      } else if (this._container.angle > -180) {
        // Top right
        this._container.y -= 5;
        this._container.x += 5;
      }
    } else {
      // Bottom right
      this._container.y += 5;
      this._container.x += 5;
    }

    console.log(this._container.angle);
    // this._container.y += 5;
    // this._container.x += 5;
  }

  public readyToMove(angle: number) {
    this._container.angle = angle;
    this._readyToMove = true;
  }
}

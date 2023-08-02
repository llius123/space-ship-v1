import * as PIXI from "pixi.js";
import SpriteIcon from "../assets/vite.svg";
import { UIHelp } from "../UIHelp/UIHelp";


export class Ship {
  private _container: PIXI.Container = new PIXI.Container();
  private _sprite: PIXI.Sprite = new PIXI.Sprite();
  private _graphics: PIXI.Graphics = new PIXI.Graphics();
  private _icon: PIXI.Texture;

  constructor(private asset: PIXI.Texture, private uiHelp: UIHelp) {
    this._container.name = "ship";
    this._icon = this.asset
    this._sprite = PIXI.Sprite.from(this._icon);
    this.addGraphicsToSprite();
    this._container.addChild(this._sprite);
    this.rotateCenterContainer();
    this.uiHelp.addLog('Ship asset created')
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

  private rotateCenterContainer() {
    this._container.pivot.x = this._container.width / 2;
    this._container.pivot.y = this._container.width / 2;
  }

  public repositionContainer({ x, y }: { x: number; y: number }) {
    this._container.position.x = x;
    this._container.position.y = y;
  }

  public get container(): PIXI.Container<PIXI.DisplayObject> {
    return this._container;
  }
}

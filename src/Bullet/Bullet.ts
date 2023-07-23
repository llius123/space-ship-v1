import * as PIXI from "pixi.js";

export class Bullet {
  private _container: PIXI.Container = new PIXI.Container();
  private _graphics: PIXI.Graphics = new PIXI.Graphics();

  constructor() {}
  public setup(): void {
    this._graphics.beginFill(0xff0000);
    this._graphics.drawRect(425, 430, 15, 15);
    this._graphics.endFill();

    this._container.addChild(this._graphics);
  }

  public get container() {
    return this._container;
  }

  public move() {
    this._container.y += 5;
  }
}

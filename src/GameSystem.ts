import { Bullet } from "./Bullet/Bullet";
import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";
import * as PIXI from "pixi.js";

export class GameSystem {
  private _pixiMain: PixiMain;
  private _ship: Ship;

  constructor(container: HTMLDivElement, public document: Document) {
    this._pixiMain = new PixiMain(container);
    this._ship = new Ship(document);
  }

  public async addShipToGame() {
    await this._ship.setup();
    this._pixiMain.addElementToMainScene(this._ship.container);
  }

  public addShipMovement() {
    this._pixiMain.addListenerToTick(() => {
      this._ship.move()
      this._ship.rotate()
      this._ship.click((angle) => {
        this.addBullet(angle)
      })
    });
  }

  public async addBullet(angle: any) {
    const bullet = new Bullet(this.document)
    await bullet.setup()
    bullet.readyToMove(angle, this._ship.container.position)
    this._pixiMain.addElementToMainScene(bullet.container)
    this._pixiMain.addListenerToTick(() => {
      bullet.move()
    })
  }

}

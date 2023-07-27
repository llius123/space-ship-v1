import { Bullet } from "./Bullet/Bullet";
import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";
import * as PIXI from "pixi.js";
import { UIHelp } from "./UIHelp/UIHelp";

export class GameSystem {
  private _pixiMain: PixiMain;
  private _ship: Ship;

  private _uiHelp: UIHelp

  constructor(container: HTMLDivElement, public document: Document) {
    this._pixiMain = new PixiMain(container);
    this._ship = new Ship(document);

    this._uiHelp = new UIHelp(this._pixiMain.pixi, this.document)
    this._uiHelp.setup()
  }

  public async addShipToGame() {
    await this._ship.setup();
    this._pixiMain.addElementToMainScene(this._ship.container);
  }

  public addShipMovement() {
    this._pixiMain.addListenerToTick(() => {
      this._ship.move()
      this._ship.rotate()
      this._ship.click((angle, position) => {
        this.addBullet(angle, position)
      })
    });
  }

  public async addBullet(angle: number, position: PIXI.ObservablePoint) {
    const bullet = new Bullet(this.document)
    await bullet.setup()
    bullet.readyToMove(angle, position)
    this._pixiMain.addElementToMainScene(bullet.container)
    this._pixiMain.addListenerToTick(() => {
      bullet.move()
    })
  }

}

import { PixiMain } from "./PixiMain";
import { Ship } from "./Ship/Ship";
import * as PIXI from "pixi.js";

export class GameSystem {
  private _pixiMain: PixiMain;
  private _ship: Ship;

  constructor(container: HTMLDivElement, document: Document) {
    this._pixiMain = new PixiMain(container);
    this._ship = new Ship(document);
  }

  public async addShipToGame() {
    await this._ship.setup();
    this._pixiMain.addElementToMainScene(this._ship.container);
  }

  public addShipToTick() {
    this._pixiMain.addListenerToTick(() => {
      this._ship.move()
      this._ship.rotate()
    });
  }

  public get ship(): Ship {
    return this._ship;
  }
}

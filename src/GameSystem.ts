import * as PIXI from "pixi.js";
import ViteIcon from "./assets/vite.svg";
import ReactIcon from "./assets/react.svg";
import { UIHelp } from "./UIHelp/UIHelp";
import { PixiMain } from "./PixiMain";
import { Bullet } from "./Bullet/Bullet";
import { Ticker } from "./Ticker";
import { Ship } from "./Ship/Ship";
import { Keyboard } from "./Controller/Keyboard";
import { Mouse } from "./Controller/Mouse";

export class GameSystem {
  private _assets: { name: string; asset: PIXI.Texture }[] = [];
  private _pixiMain: PixiMain;
  public uiHelp: UIHelp;

  private _ship!: Ship;
  private _keyboard: Keyboard;
  private _mouse: Mouse;
  constructor(private container: HTMLDivElement, public document: Document) {
    this._pixiMain = new PixiMain(this.container);
    this.uiHelp = new UIHelp(this._pixiMain.pixi, this.document);

    this._keyboard = new Keyboard(this.document);
    this._mouse = new Mouse(this.document);
  }

  public loadUIHelp() {
    this.uiHelp.setup();
  }

  public async loadAssets() {
    this._assets.push({
      name: "vite",
      asset: await PIXI.Assets.load(ViteIcon),
    });
    this._assets.push({
      name: "react",
      asset: await PIXI.Assets.load(ReactIcon),
    });
    this.uiHelp.addLog("Assets loaded");
  }

  public loadShip() {
    this._ship = new Ship(this.getAssetByName("vite").asset, this.uiHelp);
    this._ship.repositionContainer({
      x: this._pixiMain.pixi.screen.width / 2,
      y: this._pixiMain.pixi.screen.height / 2,
    });
    this.addElementToMain(this._ship.container);
    this._keyboard = new Keyboard(this.document);
    this._mouse = new Mouse(this.document);
    this.uiHelp.addLog("Keyboard and mouse added to ship");

    const shipTicker = new Ticker("ship");
    shipTicker.add(() => {
      this._keyboard.move(this._ship.container);
      this._mouse.rotate(this._ship.container);
      this._mouse.click(() => {
        this.shootBullet();
      }, this._ship.container);
    });
  }

  private shootBullet() {
    const bullet = new Bullet(this.getAssetByName("react").asset, this.uiHelp);
    bullet.repositionContainer({
      x: this._ship.container.position.x,
      y: this._ship.container.position.y,
    });
    const bulletTicker = new Ticker("bullet");
    bulletTicker.add(() => {
      this._mouse.moveToPoint(bullet.container, bulletTicker);
    });
    this.addElementToMain(bullet.container);
  }

  private getAssetByName(name: string) {
    return (
      this._assets.find((element) => {
        if (element.name === name) {
          return element;
        }
      }) || this._assets[0]
    );
  }

  private addElementToMain(container: PIXI.Container) {
    this._pixiMain.pixi.stage.addChild(container);
    this.uiHelp.addLog(container.name + " added to main");
  }
}

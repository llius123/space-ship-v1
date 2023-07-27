import * as PIXI from "pixi.js";
import SpriteIcon from "../assets/vite.svg";
import { UIHelp } from "../../UIHelp/UIHelp";

export class Ship {
  private _container: PIXI.Container = new PIXI.Container();
  private _sprite: PIXI.Sprite = new PIXI.Sprite();
  private _graphics: PIXI.Graphics = new PIXI.Graphics();
  private _icon: PIXI.Texture;

  private keysPressed: { [key: string]: boolean } = {};
  private mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private clicked = false;



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

  // private movementConfig() {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     this.keysPressed[event.code] = true;
  //   };

  //   const handleKeyUp = (event: KeyboardEvent) => {
  //     this.keysPressed[event.code] = false;
  //   };

  //   const handleMouseMove = (event: MouseEvent) => {
  //     this.mousePosition = {
  //       x: event.clientX,
  //       y: event.clientY,
  //     };
  //   };

  //   const handleClick = (event: MouseEvent) => {
  //     this.clicked = true;
  //   };

  //   this.document.addEventListener("keydown", handleKeyDown);
  //   this.document.addEventListener("keyup", handleKeyUp);
  //   this.document.addEventListener("mousemove", handleMouseMove);
  //   this.document.addEventListener("click", handleClick);
  // }

  // public move() {

  //   if (!this.keysPressed || Object.keys(this.keysPressed).length === 0) {
  //     return;
  //   }
  //   const speed = 5;

  //   if (this.keysPressed["KeyA"]) {
  //     this._container.x -= speed;
  //   }
  //   if (this.keysPressed["KeyD"]) {
  //     this._container.x += speed;
  //   }
  //   if (this.keysPressed["KeyW"]) {
  //     this._container.y -= speed;
  //   }
  //   if (this.keysPressed["KeyS"]) {
  //     this._container.y += speed;
  //   }
  // }

  // public rotate() {
  //   // Calculate the angle between the sprite and the mouse position
  //   // const mousePosition = this.main.renderer.plugins.interaction.mouse.global;
  //   const dx = this.mousePosition.x - this._container.x;
  //   const dy = this.mousePosition.y - this._container.y;
  //   const angle = Math.atan2(dy, dx);
  //   // Convert the angle from radians to degrees
  //   const degrees = angle * (180 / Math.PI);

  //   // Update the rotation of the sprite
  //   this._container.angle = degrees - 90;
  // }

  // public click(callback: (angle: number, position: PIXI.ObservablePoint) => void) {
  //   if (!this.clicked) {
  //     return;
  //   }
  //   callback(this._container.angle, this._container.position);

  //   this.clicked = false;
  // }
}

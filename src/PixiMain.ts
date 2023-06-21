import * as PIXI from "pixi.js";

export class PixiMain {
  private _app: PIXI.Application<HTMLCanvasElement>;
  private container: HTMLElement | null;
  constructor(container: HTMLDivElement) {
    this.container = container;

    this._app = new PIXI.Application<HTMLCanvasElement>({
      background: "#1099bb",
      resizeTo: window,
    });
    this._app.view.id = "Game";

    this.container.appendChild(this._app.view);
  }

  public get pixi(): PIXI.Application<HTMLCanvasElement> {
    return this._app;
  }

  public addListenerToTick(listener: () => void) {
    this._app.ticker.add(listener);
  }
}

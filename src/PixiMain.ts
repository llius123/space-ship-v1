import * as PIXI from "pixi.js";

export class PixiMain {
  private _app: PIXI.Application<HTMLCanvasElement>;
  private _container: HTMLElement | null;
  constructor(container: HTMLDivElement) {
    this._container = container;

    this._app = new PIXI.Application<HTMLCanvasElement>({
      background: "#1099bb",
      resizeTo: window,
    });
    this._app.view.id = "Game";

    this._container.appendChild(this._app.view);
  }

  public get pixi(): PIXI.Application<HTMLCanvasElement> {
    return this._app;
  }

  public addListenerToTick(listener: () => void) {
    this._app.ticker.add(listener);
  }

  public addElementToMainScene(childContainer: PIXI.Container): void {
    childContainer.position.x = this._app.screen.width / 2;
    childContainer.position.y = this._app.screen.height / 2;
    this._app.stage.addChild(childContainer);
  }
}

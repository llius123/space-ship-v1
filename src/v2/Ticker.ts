import * as PIXI from 'pixi.js'
export class Ticker {

    private _ticker: PIXI.Ticker

    constructor(name: string) {
        this._ticker = new PIXI.Ticker()
        this._ticker.autoStart = true
    }

    public add(callback: () => void) {
        this._ticker.add(callback)
    }

    public stop() {
        this._ticker.destroy()
    }
}
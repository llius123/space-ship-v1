import * as PIXI from 'pixi.js'
import ViteIcon from "../assets/vite.svg";
import ReactIcon from "../assets/react.svg";
import { UIHelp } from '../UIHelp/UIHelp';
import { PixiMain } from '../PixiMain';
import { Ship } from './Ship/Ship';
import { Keyboard } from './Controller/Keyboard';
import { MouseRotate } from './Controller/MouseRotate';

export class GameSystem {
    private _assets: { name: string, asset: PIXI.Texture }[] = []
    private _pixiMain: PixiMain;
    public uiHelp: UIHelp

    private _ship!: Ship
    private _shipMoveKeyboard!: Keyboard;
    private _shipMouseRotate!: MouseRotate;
    constructor(private container: HTMLDivElement, public document: Document) {
        this._pixiMain = new PixiMain(this.container);
        this.uiHelp = new UIHelp(this._pixiMain.pixi, this.document)
    }

    public loadUIHelp() {
        this.uiHelp.setup()
    }

    public async loadAssets() {
        this._assets.push({ name: 'vite', asset: await PIXI.Assets.load(ViteIcon) })
        this._assets.push({ name: 'react', asset: await PIXI.Assets.load(ReactIcon) })
        this.uiHelp.addLog('Assets loaded')
    }

    public loadShip() {
        this._ship = new Ship(this.getAssetByName('vite').asset, this.uiHelp)
        this._ship.repositionContainer({
            x: this._pixiMain.pixi.screen.width / 2,
            y: this._pixiMain.pixi.screen.height / 2,
        })
        this._pixiMain.pixi.stage.addChild(this._ship.container)
        this.uiHelp.addLog('Ship added to main')
        this._shipMoveKeyboard = new Keyboard(this.document, this._ship.container)
        this._shipMouseRotate = new MouseRotate(this.document, this._ship.container)
        this.uiHelp.addLog('Keyboard and mouse added to ship')
        this._pixiMain.addListenerToTick(() => {
            this._shipMoveKeyboard.move()
            this._shipMouseRotate.rotate()
        })
    }

    private getAssetByName(name: string) {
        return this._assets.find(element => {
            if (element.name === name) {
                return element
            }
        }) || this._assets[0]
    }
}
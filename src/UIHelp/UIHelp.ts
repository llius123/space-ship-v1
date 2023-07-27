import * as PIXI from "pixi.js";

export class UIHelp {

    private _container: PIXI.Container = new PIXI.Container();
    private _graphics: PIXI.Graphics = new PIXI.Graphics();
    private _log: PIXI.Text = new PIXI.Text('Logs:', { fontSize: '15px' })

    private _mousePosition: PIXI.Text = new PIXI.Text('', { fontSize: '15px' })

    constructor(private main: PIXI.Application, private document: Document) { }
    public setup() {
        this.addGraphicsToContainer()
        this.initializeText()
        this.showMousePosition()




        this.document.addEventListener('mousemove', (event) => this.updateMousePosition(event))

        this.main.stage.addChild(this._container)
    }

    public a = (event: MouseEvent) => {
        console.log('hola')
    }

    private addGraphicsToContainer(): void {
        this._graphics.lineStyle(1, 0xff0000);
        this._graphics.drawRect(
            this._container.position._x,
            this._container.position._y,
            this.main.screen.width * 0.25,
            this.main.screen.height
        );
        this._container.addChild(this._graphics);
    }

    private initializeText() {
        this._container.addChild(this._log)
    }

    public addLog(text: string) {
        this._log.text = this._log.text + '\n' + text
        this._container.addChild(this._log)
    }

    private showMousePosition(): void {
        this._mousePosition.text = this._mousePosition.text + '\n' + 'x: ' + 1 + ' | ' + 'y: ' + 2
        this._mousePosition.position.set(0, this._log.getBounds().height + this._mousePosition.getBounds().height)
        this._container.addChild(this._mousePosition)
    }

    public updateMousePosition(event: MouseEvent) {
        if (!this._mousePosition) {
            return
        }

        this._mousePosition.position.set(0, this._log.getBounds().height + this._mousePosition.getBounds().height)
        this._mousePosition.text = 'MousePosition:\n' + 'x: ' + event.clientX + ' | ' + 'y: ' + event.clientY
    }
}
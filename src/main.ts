// @ts-ignore
import './style.css'
import {Capacitor, Pile, Resistance} from "./classes/Components.ts";
import { TextureStyle } from 'pixi.js';
import {App} from "./classes/App.ts";

(async () => {

    TextureStyle.defaultOptions.scaleMode = 'nearest';
    await App.create()

    let app = App.instance

    let com1 = new Resistance(0, 0, app.stage)
    await com1.load()
    let com2 = new Pile(100, 0, app.stage)
    await com2.load()
    let com3 = new Capacitor(100, 0, app.stage)
    await com3.load()

    com1.draw()
    com2.draw()
    com3.draw()

    app.canvas.onpointerup = (e) => {
        e.preventDefault()
        App.selected = undefined;
    }

    app.canvas.onwheel = (e) => {
        e.preventDefault()
        App.zoom(App.scale - e.deltaY / 1000)
    }

    app.canvas.onpointermove = (e) => {
        if (App.selected) {
            App.selected.move(e.movementX / App.scale, e.movementY / App.scale)
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Delete") {
            app.stage.removeChild(App.pressed!.content)
        } else if (e.key === "r") {
            App.pressed!.rotate()
        }
    });

})();



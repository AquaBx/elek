import * as PIXI from "pixi.js";
import {Application} from "pixi.js";
import {Component} from "./Component.ts";
import {Anchor} from "./Objets.ts";

export class App {
    static instance: PIXI.Application<PIXI.Renderer>

    public static pressed: Component | undefined = undefined;
    public static selected: Component | undefined = undefined
    public static anchor_selected: Anchor | undefined = undefined
    public static scale = 1

    static async create() {
        this.instance = new Application();
        await this.instance.init({background: '#1099bb', resizeTo: window});
        document.body.appendChild(this.instance.canvas);
    }

    static move(x: number, y: number) {
        this.instance.stage.position.x += x;
        this.instance.stage.position.y += y;
    }

    static zoom(scale: number) {
        this.scale = scale;
        this.instance.stage.scale.x = this.scale;
        this.instance.stage.scale.y = this.scale;
    }

}
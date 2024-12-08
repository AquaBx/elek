import * as PIXI from "pixi.js";
import {Assets, Sprite} from "pixi.js";
import {Component} from "./Component.ts";

export class Resistance extends Component {
    constructor(x: number, y: number, scene: PIXI.Container) {
        super(x, y, 38, 10, scene);
    }

    async load(){
        let texture = await Assets.load("./picto/resistance.png")
        let sprite = new Sprite(texture)
        this.content.addChild(sprite)
    }
}

export class Pile extends Component {
    constructor(x: number, y: number, scene: PIXI.Container) {
        super(x, y, 38, 38, scene);
    }

    async load() {
        let texture = await Assets.load("./picto/pile.png")
        let sprite = new Sprite(texture)
        this.content.addChild(sprite)    }
}

export class Capacitor extends Component {
    constructor(x: number, y: number, scene: PIXI.Container) {
        super(x, y, 22, 18, scene);
    }

    async load() {
        let texture = await Assets.load("./picto/capacitor.png")
        let sprite = new Sprite(texture)
        this.content.addChild(sprite)
    }
}
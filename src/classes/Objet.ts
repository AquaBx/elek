import * as PIXI from "pixi.js";

export abstract class Objet {
    content = new PIXI.Graphics();

    constructor(protected scene: PIXI.Container) {
        this.content.eventMode = "static";
    }
}
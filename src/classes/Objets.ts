import * as PIXI from "pixi.js";
import {Objet} from "./Objet.ts";
import {update} from "./config.ts";
import {App} from "./App.ts";

export class Anchor {
    listeners: EventTarget;

    constructor(public x: number, public y: number, private parent: PIXI.Container, private scene: PIXI.Container) {

        this.listeners = new EventTarget();
    }

    move(x: number, y: any) {

        this.x = x;
        this.y = y;
        this.listeners.dispatchEvent(update);

    }

    draw(x: number, y: number) {
        let gra = new PIXI.Graphics().circle(x, y, 2).fill(0xffffff)

        gra.on("pointerdown", () => {
            if (App.anchor_selected === this) {
                App.selected = undefined;
            } else if (App.anchor_selected) {
                gra.tint = 0x00ff00;
                (new Line(App.anchor_selected, this, this.scene)).draw();
                App.anchor_selected = undefined;
            } else {
                gra.tint = 0xff0000;
                App.anchor_selected = this;
            }
        });

        gra.eventMode = "static";
        this.parent.addChild(gra);
    }
}

export class Line extends Objet {
    anchor1: Anchor
    anchor2: Anchor

    constructor(anchor1: Anchor, anchor2: Anchor, scene: PIXI.Container) {
        super(scene)

        this.anchor1 = anchor1;
        this.anchor2 = anchor2;

        this.anchor1.listeners.addEventListener("updated", () => {
            this.draw();
        });

        this.anchor2.listeners.addEventListener("updated", () => {
            this.draw();
        });

        this.content.on("pointerdown", () => alert)

        this.update();
    }

    draw() {
        this.update();
        this.scene.addChild(this.content);
    }

    update() {
        this.content.clear()
        this.content.moveTo(this.anchor1.x, this.anchor1.y);
        this.content.lineTo(this.anchor2.x, this.anchor2.y);
        this.content.stroke({width: 2, color: 0x000000});
    }
}


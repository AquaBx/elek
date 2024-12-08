import * as PIXI from "pixi.js";
import {Objet} from "./Objet.ts";
import {Anchor} from "./Objets.ts";
import {App} from "./App.ts";

export abstract class Component extends Objet {
    private readonly width: number;
    private readonly height: number;
    private anchor1: Anchor
    private anchor2: Anchor

    constructor(x: number, y: number, width: number, height: number, scene: PIXI.Container) {
        super(scene)

        this.content.on("pointerdown", () => {
            App.selected = this;
            App.pressed = this;
        });

        this.width = width;
        this.height = height;

        this.content.pivot.set(this.width / 2, this.height / 2);
        this.content.x = x;
        this.content.y = y;

        this.anchor1 = new Anchor(this.content.x - this.width / 2, this.content.y, this.content, scene);
        this.anchor2 = new Anchor(this.content.x + this.width / 2, this.content.y, this.content, scene);
    }

    move(x: number, y: number) {
        this.content.x += x;
        this.content.y += y;
        this.moveAnchors();
    }

    rotate() {
        this.content.angle = (this.content.angle + 45) % 360
        this.moveAnchors();
    }

    draw() {
        this.anchor1.draw(0, this.height / 2);
        this.anchor2.draw(this.width, this.height / 2);
        this.scene.addChild(this.content);
    }

    moveAnchors() {
        let t = this.content.angle * Math.PI / 180

        let x1 = this.content.x - Math.cos(t) * this.width / 2
        let x2 = this.content.x + Math.cos(t) * this.width / 2

        let y1 = this.content.y - Math.sin(t) * this.width / 2
        let y2 = this.content.y + Math.sin(t) * this.width / 2

        this.anchor1.move(x1, y1);
        this.anchor2.move(x2, y2);
    }
}

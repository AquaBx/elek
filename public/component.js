export class App {
  constructor() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    this.app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0xa7afbe,
    });
    PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = false;
    PIXI.settings.RESOLUTION = 1;
    window.devicePixelRatio = 1;
    document.body.appendChild(this.app.view);

    this.scene = new PIXI.Container();
    this.view = this.app.view;
  }
  move(x, y) {
    this.app.stage.position.x += x;
    this.app.stage.position.y += y;
  }
  draw() {
    this.app.stage.addChild(this.scene);
  }
  zoom(scale) {
    this.app.stage.scale.x = scale;
    this.app.stage.scale.y = scale;
  }
}

class Anchor {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.listeners = new EventTarget();
  }

  move(x, y) {
    this.listeners.dispatchEvent(moving);

    this.x = x;
    this.y = y;
  }

  draw(scene, appscene, x, y) {
    let cir = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawCircle(x, y, 2)
      .endFill();

    cir.on("pointerdown", () => {
      if (anchor_selected == this) {
        selected = null;
      } else if (anchor_selected) {
        cir.tint = 0x00ff00;
        new Line(anchor_selected, this).draw(appscene);
        anchor_selected = null;
      } else {
        cir.tint = 0xff0000;
        anchor_selected = this;
      }
    });

    cir.eventMode = "static";
    scene.addChild(cir);
  }
}

export class Resistance {
  constructor(x, y) {
    this.content = new PIXI.Graphics();

    this.content.pivot.set(19,5)

    this.content.addChild(PIXI.Sprite.from("./picto/resistance.png"));
    this.content.eventMode = "static";

    this.content.on("pointerdown", () => {
      selected = this;
      pressed = this;
    });

    this.content.x = x;
    this.content.y = y;

    this.anchor1 = new Anchor(this.content.x, this.content.y + 5);
    this.anchor2 = new Anchor(this.content.x + 38, this.content.y + 5);
  }
  move(x, y) {
    this.content.x += x / scale;
    this.content.y += y / scale;
    this.moveAnchors();
  }
  rotate() {
    this.content.angle += 45
    this.moveAnchors();
  }
  draw(scene) {
    this.anchor1.draw(this.content, scene, 0, 5);
    this.anchor2.draw(this.content, scene, 38, 5);
    scene.addChild(this.content);
  }
  moveAnchors() {
    this.anchor1.move(this.content.x, this.content.y + 5);
    this.anchor2.move(this.content.x + 38, this.content.y + 5);
  }
}

export class Pile {
    constructor(x, y) {
      this.content = new PIXI.Graphics();
      this.content.addChild(PIXI.Sprite.from("./picto/pile.png"));
      this.content.pivot.set(19,19)
      this.content.eventMode = "static";
  
      this.content.on("pointerdown", () => {
        selected = this;
        pressed = this;
      });
  
      this.content.x = x;
      this.content.y = y;
  
      this.anchor1 = new Anchor(this.content.x, this.content.y + 19);
      this.anchor2 = new Anchor(this.content.x + 38, this.content.y + 19);
    }
    move(x, y) {
      this.content.x += x / scale;
      this.content.y += y / scale;
      this.moveAnchors();
    }
    rotate() {
        this.content.angle += 45
        this.moveAnchors();
      }
    draw(scene) {
      this.anchor1.draw(this.content, scene, 0, 19);
      this.anchor2.draw(this.content, scene, 38, 19);
      scene.addChild(this.content);
    }
    moveAnchors() {
      this.anchor1.move(this.content.x, this.content.y + 19);
      this.anchor2.move(this.content.x + 38, this.content.y + 19);
    }
  }

  export class Capacitor {
    constructor(x, y) {
      this.content = new PIXI.Graphics();
      this.content.addChild(PIXI.Sprite.from("./picto/capacitor.png"));
      this.content.pivot.set(11,9)
      this.content.eventMode = "static";
  
      this.content.on("pointerdown", () => {
        selected = this;
        pressed = this;
      });
  
      this.content.x = x;
      this.content.y = y;
  
      this.anchor1 = new Anchor(this.content.x, this.content.y + 9);
      this.anchor2 = new Anchor(this.content.x + 22, this.content.y + 9);
    }
    move(x, y) {
      this.content.x += x / scale;
      this.content.y += y / scale;
      this.moveAnchors();
    }
    rotate() {
      this.content.angle += 45
      this.moveAnchors();
    }
    draw(scene) {
      this.anchor1.draw(this.content, scene, 0, 9);
      this.anchor2.draw(this.content, scene, 22, 9);
      scene.addChild(this.content);
    }
    moveAnchors() {
      this.anchor1.move(this.content.x, this.content.y + 9);
      this.anchor2.move(this.content.x + 22, this.content.y + 9);
    }
  }

export class Line {
  constructor(anchor1, anchor2) {
    this.anchor1 = anchor1;
    this.anchor2 = anchor2;

    this.anchor1.listeners.addEventListener("moving", () => {
      this.move();
    });
    this.anchor2.listeners.addEventListener("moving", () => {
      this.move();
    });

    this.content = new PIXI.Graphics();
    this.content.lineStyle(2, 0x000000);

    this.content.moveTo(anchor1.x, anchor1.y);
    this.content.lineTo(anchor2.x, anchor2.y);

    this.content.eventMode = "static";

    this.content.on("mouseover", () => {
        selected = this;
        pressed = this;
        console.log(this)
      });
  }
  draw(scene) {
    scene.addChild(this.content);
  }
  move() {
    this.content.clear();
    this.content.lineStyle(2, 0x000000);
    this.content.moveTo(this.anchor1.x, this.anchor1.y);
    this.content.lineTo(this.anchor2.x, this.anchor2.y);
  }
}

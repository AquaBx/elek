export class App {
  constructor() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    this.app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0xa7afbe,
    });
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
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
      .lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
      .drawCircle(x, y, 3)
      .endFill();

    cir.on("pointerdown", () => {
      if (line_target == this) {
        line_target = null;
      } else if (line_target) {
        cir.tint = 0x00ff00;
        new Line(line_target, this).draw(appscene);
        line_target = null;
      } else {
        cir.tint = 0xff0000;
        line_target = this;
      }
    });

    cir.eventMode = "static";
    scene.addChild(cir);
  }
}

export class Resistance {
  constructor(x, y) {
    this.content = new PIXI.Graphics();
    this.content.addChild(PIXI.Sprite.from("./picto/g1087.svg"));
    this.content.eventMode = "static";

    this.content.on("pointerdown", () => {
      move = this;
    });

    this.content.x = x;
    this.content.y = y;

    this.anchor1 = new Anchor(this.content.x, this.content.y + 9);
    this.anchor2 = new Anchor(this.content.x + 66, this.content.y + 9);
  }
  move(x, y) {
    this.content.x += x / scale;
    this.content.y += y / scale;
    this.moveAnchors();
  }
  draw(scene) {
    this.anchor1.draw(this.content, scene, 0, 9);
    this.anchor2.draw(this.content, scene, 66, 9);
    scene.addChild(this.content);
  }
  moveAnchors() {
    this.anchor1.move(this.content.x, this.content.y + 9);
    this.anchor2.move(this.content.x + 66, this.content.y + 9);
  }
}

export class Pile {
    constructor(x, y) {
      this.content = new PIXI.Graphics();
      this.content.addChild(PIXI.Sprite.from("./picto/g1558.svg"));
      this.content.eventMode = "static";
  
      this.content.on("pointerdown", () => {
        move = this;
      });
  
      this.content.x = x;
      this.content.y = y;
  
      this.anchor1 = new Anchor(this.content.x, this.content.y + 30);
      this.anchor2 = new Anchor(this.content.x + 60, this.content.y + 30);
    }
    move(x, y) {
      this.content.x += x / scale;
      this.content.y += y / scale;
      this.moveAnchors();
    }
    draw(scene) {
      this.anchor1.draw(this.content, scene, 0, 30);
      this.anchor2.draw(this.content, scene, 60, 30);
      scene.addChild(this.content);
    }
    moveAnchors() {
      this.anchor1.move(this.content.x, this.content.y + 30);
      this.anchor2.move(this.content.x + 60, this.content.y + 30);
    }
  }

  export class Capacitor {
    constructor(x, y) {
      this.content = new PIXI.Graphics();
      this.content.addChild(PIXI.Sprite.from("./picto/g1579.svg"));
      this.content.eventMode = "static";
  
      this.content.on("pointerdown", () => {
        move = this;
      });
  
      this.content.x = x;
      this.content.y = y;
  
      this.anchor1 = new Anchor(this.content.x, this.content.y + 16);
      this.anchor2 = new Anchor(this.content.x + 37, this.content.y + 16);
    }
    move(x, y) {
      this.content.x += x / scale;
      this.content.y += y / scale;
      this.moveAnchors();
    }
    draw(scene) {
      this.anchor1.draw(this.content, scene, 0, 16);
      this.anchor2.draw(this.content, scene, 37, 16);
      scene.addChild(this.content);
    }
    moveAnchors() {
      this.anchor1.move(this.content.x, this.content.y + 16);
      this.anchor2.move(this.content.x + 37, this.content.y + 16);
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
    this.content.lineStyle(4, 0x000000);

    this.content.moveTo(anchor1.x, anchor1.y);
    this.content.lineTo(anchor2.x, anchor2.y);

    this.content.eventMode = "static";
  }
  draw(scene) {
    scene.addChild(this.content);
  }
  move() {
    this.content.clear();
    this.content.lineStyle(4, 0x000000);
    this.content.moveTo(this.anchor1.x, this.anchor1.y);
    this.content.lineTo(this.anchor2.x, this.anchor2.y);
  }
}

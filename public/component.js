export class App {
  constructor() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    this.app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0x3057e1,
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

export class Component {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;

    this.content = new PIXI.Graphics();
    this.content.pivot.set(this.width / 2, this.height / 2);
    this.content.eventMode = "static";
    this.content.x = x;
    this.content.y = y;

    this.content.on("pointerdown", () => {
      selected = this;
      pressed = this;
    });

    this.anchor1 = new Anchor(this.content.x - this.width / 2, this.content.y);
    this.anchor2 = new Anchor(this.content.x + this.width / 2, this.content.y);
  }
  move(x, y) {
    this.content.x += x / scale;
    this.content.y += y / scale;
    this.moveAnchors();
  }
  rotate() {
    this.content.angle += 45;
    this.moveAnchors();
  }
  draw(scene) {
    this.anchor1.draw(this.content, scene, 0, this.height / 2);
    this.anchor2.draw(this.content, scene, this.width, this.height / 2);
    scene.addChild(this.content);
  }
  moveAnchors() {
    let t = this.content.angle*Math.PI/180
    let x1 = this.content.x - Math.cos(t) * this.width / 2
    let x2 = this.content.x + Math.cos(t) * this.width / 2

    let y1 = this.content.y - Math.sin(t) * this.width / 2
    let y2 = this.content.y + Math.sin(t) * this.width / 2

    this.anchor1.move(x1, y1);
    this.anchor2.move(x2, y2);
  }
}

export class Resistance extends Component {
  constructor(x, y) {
    super(x, y, 38, 10);
    this.content.addChild(PIXI.Sprite.from("./picto/resistance.png"));
  }
}

export class Pile extends Component {
  constructor(x, y) {
    super(x, y, 38, 38);

    this.content.addChild(PIXI.Sprite.from("./picto/pile.png"));
  }
}

export class Capacitor extends Component {
  constructor(x, y) {
    super(x, y, 22, 18);
    this.content.addChild(PIXI.Sprite.from("./picto/capacitor.png"));
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
      console.log(this);
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

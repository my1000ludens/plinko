import Atom from '@/components/Atom';
import Coin from '@/components/Coin';
import PhysicsAtom from '@/components/PhysicsAtom';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class GameEngine {
  atomList: Atom[];
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.atomList = [];
    this.ctx = ctx;
  }

  run() {
    const DELTA_MAX = 200;
    let lastTime = performance.now();

    const loop = async () => {
      const now = performance.now();
      const delta = Math.min(now - lastTime, DELTA_MAX);
      lastTime += delta;

      this.update(delta / 1000);
      this.render(this.ctx);

      // if (Math.random() < 0.01) {
      //   await sleep(3000);
      // }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  add(atom: Atom) {
    this.atomList.push(atom);
  }

  sub(atom: Atom) {
    this.atomList = this.atomList.filter((a) => a !== atom);
  }

  update(delta: number) {
    const pinBoard = this.atomList.find((atom) => atom instanceof PhysicsAtom) as PhysicsAtom;
    const coinList = this.atomList.filter((atom) => atom instanceof Coin) as Coin[];
    coinList.forEach((coin) => pinBoard.collideWith(delta, coin));

    this.atomList.forEach((atom) => atom.update(delta));
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.atomList.forEach((atom) => atom.render(ctx));
  }
}

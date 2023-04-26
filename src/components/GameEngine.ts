import Atom from '@/components/Atom';
import Coin from '@/components/Coin';
import CoinPocketBox from '@/components/CoinPocketBox';
import PhysicsAtom from '@/components/PhysicsAtom';
import PinBoard from '@/components/PinBoard';

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

      for (let i = 0; i < delta / 5; i++) {
        this.update(5 / 1000);
      }
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
    // Remove dead atoms
    this.atomList = this.atomList.filter((atom) => atom.alive);

    const pinBoard = this.atomList.find((atom) => atom instanceof PinBoard) as PinBoard;
    const coinPocketBox = this.atomList.find((atom) => atom instanceof CoinPocketBox) as CoinPocketBox;
    const coinList = this.atomList.filter((atom) => atom instanceof Coin) as Coin[];

    // Coin·Pin Collision
    coinList.forEach((coin) => pinBoard.collideWith(delta, coin));

    // Coin·CoinPocket Collision
    coinList.forEach((coin) => coinPocketBox.collideWith(delta, coin));

    this.atomList.forEach((atom) => atom.update(delta));

    this.atomList = this.atomList.filter((atom) => !atom.isOutOfScreen(this.ctx.canvas.width, this.ctx.canvas.height));
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.atomList.forEach((atom) => atom.render(ctx));
  }
}

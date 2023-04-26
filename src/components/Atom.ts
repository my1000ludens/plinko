export default class Atom {
  x: number;
  y: number;
  alive: boolean = true;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isOutOfScreen(width: number, height: number) {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }

  update(delta: number) {
    throw new Error('Not implemented');
  }

  render(ctx: CanvasRenderingContext2D) {
    throw new Error('Not implemented');
  }

  destroy() {
    this.alive = false;
  }
}

export default class Atom {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(delta: number) {
    throw new Error('Not implemented');
  }

  render(ctx: CanvasRenderingContext2D) {
    throw new Error('Not implemented');
  }
}

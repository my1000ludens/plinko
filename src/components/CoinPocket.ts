import PhysicsAtom from '@/components/PhysicsAtom';

export default class CoinPocket extends PhysicsAtom {
  count: number;
  size: number;

  constructor(x: number, y: number, size: number) {
    super(x, y);

    this.count = 0;
    this.size = size;
  }

  collideWith(delta: number, atom: PhysicsAtom): this {
    if (this.willCollideWith(delta, atom)) {
      this.count += 1;
      atom.destroy();
    }

    return this;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.x - this.size * 0.5, this.y - this.size * 0.5, this.size, this.size);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(this.count.toString(), this.x, this.y + this.size, this.size);
    ctx.closePath();
  }
}

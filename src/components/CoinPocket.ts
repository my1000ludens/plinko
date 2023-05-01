import PhysicsAtom from '@/components/PhysicsAtom';

export default class CoinPocket extends PhysicsAtom {
  count: number;
  size: number;
  audio: HTMLAudioElement;

  constructor(x: number, y: number, size: number) {
    super(x, y);

    this.count = 0;
    this.size = size;
    this.audio = new Audio('./AA.wav');
  }

  willCollideWith(delta: number, atom: PhysicsAtom): boolean {
    return (
      atom.x + atom.radius > this.x - this.size * 0.5 &&
      atom.x - atom.radius < this.x + this.size * 0.5 &&
      atom.y + atom.radius > this.y - this.size * 0.5 &&
      atom.y - atom.radius < this.y + this.size * 0.5
    );
  }

  collideWith(delta: number, atom: PhysicsAtom): this {
    if (this.willCollideWith(delta, atom) && this.audio.readyState === 4) {
      // this.audio.load();
      // this.audio.play();
      this.count += 1;
      atom.destroy();
    }

    return this;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.roundRect(this.x - this.size * 0.5, this.y - this.size * 0.5, this.size, this.size, Math.sqrt(this.size));
    ctx.fillStyle = '#999999';
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(this.count.toString(), this.x, this.y + this.size, this.size);
    ctx.closePath();
  }
}

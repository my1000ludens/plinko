import PhysicsAtom from '@/components/PhysicsAtom';

export default class Coin extends PhysicsAtom {
  constructor(x: number, y: number, radius: number = 10) {
    super(x, y, 0, 0, 0, 0, radius);
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
    ctx.fill();
    ctx.closePath();
  }
}

import PhysicsAtom from '@/components/PhysicsAtom';

export default class Pin extends PhysicsAtom {
  radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y, 0, 0, 0, 0, radius);

    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  render(ctx: CanvasRenderingContext2D) {
    // draw circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
}

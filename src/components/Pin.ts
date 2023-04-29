import PhysicsAtom from '@/components/PhysicsAtom';

export default class Pin extends PhysicsAtom {
  radius: number;
  audio: HTMLAudioElement;
  duration: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y, 0, 0, 0, 0, radius);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.audio = new Audio('./B.wav');
    this.audio.volume = 0.1;
    this.duration = 0;
  }

  collideWith(delta: number, atom: PhysicsAtom): this {
    if (this.willCollideWith(delta, atom) && this.audio.readyState === 4) {
      // this.audio.load();
      // this.audio.play();
      this.duration = 1;
    }
    return super.collideWith(delta, atom);
  }

  update(delta: number) {
    super.update(delta);

    this.duration -= delta;
    if (this.duration < 0) {
      this.duration = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = '#cccccc';
    ctx.arc(this.x, this.y, this.radius + this.radius * this.duration * this.duration, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

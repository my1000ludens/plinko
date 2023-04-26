import Atom from '@/components/Atom';

export default class PhysicsAtom extends Atom {
  dx: number;
  dy: number;
  ddx: number;
  ddy: number;
  radius: number;

  constructor(x: number, y: number, dx: number = 0, dy: number = 0, ddx: number = 0, ddy: number = 0, radius: number = 10) {
    super(x, y);

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ddx = ddx;
    this.ddy = ddy;
    this.radius = radius;
  }

  force(ddx: number, ddy: number) {
    this.ddx += ddx;
    this.ddy += ddy;
    return this;
  }

  willCollideWith(delta: number, atom: PhysicsAtom) {
    const postX = this.x + this.dx * delta;
    const postY = this.y + this.dy * delta;
    const postAtomX = atom.x + atom.dx * delta;
    const postAtomY = atom.y + atom.dy * delta;
    const postDistance = Math.sqrt((postX - postAtomX) ** 2 + (postY - postAtomY) ** 2);
    return postDistance <= this.radius + atom.radius;
  }

  collideWith(delta: number, atom: PhysicsAtom) {
    if (this.willCollideWith(delta, atom)) {
      const distance = Math.sqrt((this.x - atom.x) ** 2 + (this.y - atom.y) ** 2);
      // 방향벡터
      const [dx, dy] = [this.x - atom.x, this.y - atom.y];
      // 단위벡터
      const [ux, uy] = [dx / distance, dy / distance];
      // 충돌 방향
      const [x1, y1] = [this.dx, this.dy];
      const [x2, y2] = [atom.dx, atom.dy];
      // 내적
      const dot1 = (x1 * ux + y1 * uy) * 0.8;
      const dot2 = (x2 * ux + y2 * uy) * 0.8;
      // 투영 벡터
      const [tx1, ty1] = [dot1 * ux, dot1 * uy];
      const [tx2, ty2] = [dot2 * ux, dot2 * uy];
      // 반사 벡터
      const [rx1, ry1] = [x1 - tx1 * 2, y1 - ty1 * 2];
      const [rx2, ry2] = [x2 - tx2 * 2, y2 - ty2 * 2];

      this.dx = rx1;
      this.dy = ry1;
      atom.dx = rx2;
      atom.dy = ry2;
    }
    return this;
  }

  update(delta: number) {
    this.x += this.dx * delta;
    this.y += this.dy * delta;
    this.dx += this.ddx * delta;
    this.dy += this.ddy * delta;
  }

  render(ctx: CanvasRenderingContext2D) {
    throw new Error('Not implemented');
  }
}

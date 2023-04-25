import PhysicsAtom from '@/components/PhysicsAtom';
import Pin from '@/components/Pin';

export default class PinBoard extends PhysicsAtom {
  rows: number;
  pinList: Pin[];
  radius: number;

  constructor(x: number, y: number, rows: number, maxWidth: number) {
    super(x, y);

    this.rows = rows;
    this.pinList = [];

    const numberOfPins = getNumberOfPins(rows);
    const gap = maxWidth / (rows + 1);

    this.radius = gap * 0.125;

    let numberOfPinsInLine = 3;
    let count = numberOfPinsInLine;
    let [pinX, pinY] = [x - gap, y];
    for (let i = 0; i < numberOfPins; i++) {
      this.pinList.push(new Pin(pinX, pinY, this.radius));
      pinX += gap;
      count -= 1;

      if (count === 0) {
        numberOfPinsInLine++;
        count = numberOfPinsInLine;
        pinX = pinX - gap * numberOfPinsInLine + gap / 2;
        pinY = pinY + (gap * Math.sqrt(3)) / 2;
      }
    }
  }

  collideWith(delta: number, atom: PhysicsAtom) {
    this.pinList.forEach((pin) => pin.collideWith(delta, atom));
    return this;
  }

  update(delta: number): void {
    this.pinList.forEach((pin) => pin.update(delta));
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.pinList.forEach((pin) => pin.render(ctx));
  }
}

const getNumberOfPins = (rows: number) => {
  if (rows < 0) {
    throw new Error('Rows must be positive');
  }

  return ((rows + 5) * rows) / 2;
};

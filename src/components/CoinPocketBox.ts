import CoinPocket from '@/components/CoinPocket';
import PhysicsAtom from '@/components/PhysicsAtom';
import { PIN_RADIUS_RATIO } from '@/constant';

export default class CoinPocketBox extends PhysicsAtom {
  count: number;
  coinPocketList: CoinPocket[];

  constructor(x: number, y: number, width: number, numberOfPockets: number) {
    super(x, y);

    this.count = 0;
    this.coinPocketList = [];

    const size = width * (1 - PIN_RADIUS_RATIO * 2);
    const pinRadius = width * PIN_RADIUS_RATIO;

    let [coinPocketX, coinPocketY] = [x - (width * numberOfPockets) / 2 + pinRadius + size / 2, y];
    for (let i = 0; i < numberOfPockets; i++) {
      this.coinPocketList.push(new CoinPocket(coinPocketX, coinPocketY, size));
      coinPocketX += width;
    }
  }

  collideWith(delta: number, atom: PhysicsAtom): this {
    this.coinPocketList.forEach((coinPocket) => coinPocket.collideWith(delta, atom));
    return this;
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.coinPocketList.forEach((coinPocket) => coinPocket.render(ctx));
  }
}

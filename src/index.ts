import PinBoard from '@/components/PinBoard';
import GameEngine from '@/components/GameEngine';
import Coin from '@/components/Coin';
import CoinPocketBox from '@/components/CoinPocketBox';

const resize = (canvas: HTMLCanvasElement) => {
  const { width, height } = window.getComputedStyle(canvas);

  canvas.width = parseInt(width) * 2;
  canvas.height = parseInt(height) * 2;
};

(() => {
  const canvas = document.getElementById('app') as HTMLCanvasElement;

  resize(canvas);

  const width = canvas.width;
  const height = canvas.height;

  const ctx = canvas.getContext('2d')!;

  const gameEngine = new GameEngine(ctx);

  gameEngine.run();

  const pinBoard = new PinBoard(width * 0.5, height * 0.3, 10, width * 0.8);
  const coinPocketBox = new CoinPocketBox(width * 0.5, pinBoard.pinList.slice(-1)[0].y + pinBoard.gap / 2, pinBoard.gap, pinBoard.rows + 1);

  gameEngine.add(pinBoard);
  gameEngine.add(coinPocketBox);

  new Array(1000)
    .fill('')
    .forEach((_, i) =>
      gameEngine.add(new Coin(width * 0.5 + pinBoard.gap * (i / 1000 - 0.5), pinBoard.pinList[0].y - pinBoard.gap, pinBoard.radius * 2).force(0, Math.pow(pinBoard.radius, 3)))
    );

  // 인터페이스
  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      const [x, y] = [width * 0.5 + (Math.random() - 0.5) * width * 0.05, height * 0.27];
      // gameEngine.add(new Coin(x, y, pinBoard.radius * 2).force(0, Math.pow(pinBoard.radis,2 )));
      gameEngine.add(new Coin(width * 0.5 + -0.45 * width * 0.05, height * 0.27, pinBoard.radius * 2).force(0, Math.pow(pinBoard.radius, 3)));
      gameEngine.add(new Coin(width * 0.5 + 0.45 * width * 0.05, height * 0.27, pinBoard.radius * 2).force(0, Math.pow(pinBoard.radius, 3)));
    }
  });
})();

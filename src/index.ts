import PinBoard from '@/components/PinBoard';
import GameEngine from '@/components/GameEngine';
import Coin from '@/components/Coin';

const resize = (canvas: HTMLCanvasElement) => {
  const { width, height } = window.getComputedStyle(canvas);

  canvas.width = parseInt(width) * 2;
  canvas.height = parseInt(height) * 2;
};

(() => {
  const canvas = document.getElementById('app') as HTMLCanvasElement;

  resize(canvas);
  window.addEventListener('resize', () => resize(canvas));

  const width = canvas.width;
  const height = canvas.height;

  const ctx = canvas.getContext('2d')!;

  const gameEngine = new GameEngine(ctx);

  gameEngine.run();

  const pinBoard = new PinBoard(width * 0.5, height * 0.3, 20, width * 0.8);

  gameEngine.add(pinBoard);

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      // const [x, y] = [width * 0.5 + (Math.random() - 0.5) * width * 0.05, height * 0.25];
      const [x, y] = [width * 0.5 + width * 0.02, height * 0.25];
      gameEngine.add(new Coin(x, y, pinBoard.radius * 2).force(0, 1000));
    }
  });
})();

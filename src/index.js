(() => {
  const minRadius = 3;
  const maxRadius = 50;
  const circlesCount = 800;
  const debug = true;
  const id = 'canvas1';
  const loggerName = 'CanvasAnimation';

  const logger = new Logger(loggerName);

  const randomColor = new RandomColor({
    tag: 'RandomColor',
    debug,
    logger,
  });

  const canvas = new Canvas({
    id,
    tag: 'Canvas',
    debug,
    logger,
  });

  const mouse = new Mouse({
    tag: 'Mouse',
    debug,
    logger,
  });

  const canvasAnimation = new CanvasAnimation({
    minRadius,
    maxRadius,
    circlesCount,
    tag: 'CanvasAnimation',
    debug,
    logger,
    randomColor,
    canvas,
    mouse,
  });

  canvasAnimation.init();
})();

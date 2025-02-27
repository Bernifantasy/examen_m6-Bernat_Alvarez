export const configGame = {
  ROWS:15,
  COLUMNS:10,
  IMAGE_SIZE:32,
  SPEED:32,
  map :[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1, 0, 0, 0, 4, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 2, 1],
    [1, 0, 1, 0, 4, 0, 1, 0, 0, 1],
    [1, 0, 5, 0, 1, 0, 6, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 2, 5, 0, 1, 5, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 5, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],

};
configGame.WIDTH_CANVAS = configGame.IMAGE_SIZE * configGame.COLUMNS;
configGame.HEIGHT_CANVAS = configGame.IMAGE_SIZE * configGame.ROWS;

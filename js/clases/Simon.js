import { gameObject } from "./gameObject.js";
import {configGame} from "../configGame.js";
const { IMAGE_SIZE,SPEED} = configGame;

export class Simon extends gameObject {

  constructor(row, column, sound) {
    super(row, column);
    this.direction = 1;
    this.speed = SPEED;
    this.scoreSimon = 0;
    this.powerUp=0;
  }

  /**
   * Mueve a Simon hacia la derecha si es posible.
   */
  moveRight() {
    let newCol = this.coordXpixel + this.speed;
    if (newCol >= 0) {
      this.direction = 1;
      this.coordXpixel = newCol;
    }
  }

  /**
   * Mueve a Simon hacia la izquierda si es posible.
   */
  moveLeft() {
    let newCol = this.coordXpixel - this.speed;
    if (newCol >= 0) {
      this.direction = 3;
      this.coordXpixel = newCol;
    }
  }

  /**
   * Mueve a Simon hacia arriba si es posible.
   */
  moveUp() {
    let newRow = this.coordYpixel - this.speed;
    if (newRow >= 0) {
      this.direction = 4;
      this.coordYpixel = newRow;
    }
  }

  /**
   * Mueve a Simon hacia abajo si es posible.
   */
  moveDown() {
    let newRow = this.coordYpixel + this.speed;
    if (newRow >= 0) {
      this.direction = 2;
      this.coordYpixel = newRow;
    }
  }

  /**
   * Verifica si Simon colisiona con una roca.
   * Si la colisión ocurre, Simon vuelve a su posición inicial.
   *
   * @param {Object} roca - Objeto que representa la roca en el mapa.
   */
  testCollideRock(roca) {
    let distancia = dist(this.coordXpixel, this.coordYpixel, roca.coordXpixel, roca.coordYpixel);
    if (distancia <  IMAGE_SIZE) {
      this.spawnSimon();
    }
  }

  /**
   * Verifica si Simon recoge una comida.
   *
   * @param {Object} food - Objeto que representa la comida en el mapa.
   * @returns {boolean} `true` si Simon ha recogido la comida, `false` en caso contrario.
   */
    testCollideAjo(food) {
        let distancia = dist(this.coordXpixel, this.coordYpixel, food.coordXpixel, food.coordYpixel);
        return distancia < IMAGE_SIZE;
    }

    testCollideZombie(zombie){
        let distancia = dist(this.coordXpixel, this.coordYpixel, zombie.coordXpixel, zombie.coordYpixel);
        if (distancia <  IMAGE_SIZE) {
            this.spawnSimon();
          }
    }

    testCollideAigua(aigua){
        let distancia = dist(this.coordXpixel, this.coordYpixel, aigua.coordXpixel, aigua.coordYpixel);
        return distancia < IMAGE_SIZE;
    }

    testCollideDracula(dracula){
        let distancia = dist(this.coordXpixel, this.coordYpixel, dracula.coordXpixel, dracula.coordYpixel);
        return distancia < IMAGE_SIZE;
    }




  /**
   * Restablece la posición de Simon a la inicial en el mapa.
   */
  spawnSimon() {
    this.coordXpixel = 32;
    this.coordYpixel = 32;
  }
}

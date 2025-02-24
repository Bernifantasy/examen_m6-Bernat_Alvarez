import {gameObject} from "./gameObject.js";

/**
 * Clase que representa el menjar al joc.
 * Extiende `gameObject` y define el valor en puntos de la comida.
 *
 * @extends gameObject
 * @author moi
 */

export class Aigua extends gameObject{
  /**
   * Crea una instancia de Aigua.
   *
   * @param {number} row - La fila donde se coloca la comida en la cuadrícula.
   * @param {number} column - La columna donde se coloca la comida en la cuadrícula.
   */
  constructor(row,column) {
    super(row,column);
  }
}

import {Ajo} from "./clases/Ajo.js";
import {Aigua} from "./clases/Aigua.js";
import {Dracula} from "./clases/Dracula.js";
import {Zombie} from "./clases/Zombie.js";
import {Simon} from "./clases/Simon.js";
import {Roca} from "./clases/Roca.js";
import {ErrorSimon} from "./clases/errorSimon.js";
import {configGame} from "./configGame.js";

let gameStarted = false;
let gameFinished = false;


let imgRock;
let imgAjo;
let imgSimonUp;
let imgSimonRIGHT;
let imgSimonLEFT;
let imgSimonDown;
let imgzombie;
let imgdracula;
let imgaigua;
let mySimon;
let key=0;
let startTimeGame=0;
let timer=0;
const max_time = 90 * 1000;
let gameStartTime = 0;

const arrRocks = [];
const arrAjos = [];
const arrzombie = [];
const arraigua = [];
const arrdracula = [];


function preload() {
  imgRock = loadImage("../img/roca.png", handleImage, handleError);
  imgAjo = loadImage("../img/all.png", handleImage, handleError);
  imgSimonUp = loadImage("../img/simonUp.png", handleImage, handleError);
  imgSimonLEFT = loadImage("../img/simonLeft.png", handleImage, handleError);
  imgSimonRIGHT = loadImage("../img/simonRight.png", handleImage, handleError);
  imgSimonDown = loadImage("../img/simonDown.png", handleImage, handleError);
  imgzombie = loadImage("../img/zombie.png", handleImage, handleError);
  imgdracula = loadImage("../img/dracula.png", handleImage, handleError);
  imgaigua = loadImage("../img/aigua.png", handleImage, handleError);
}

function handleError() {
  let error = new ErrorSimon(10, "Imatge no carregada");
  error.showError();

}

function handleImage() {
  //No fico res, per no mostrar coses a la consola, per a que el public no ho vegi.

}

function setup() {
  if (gameStarted) {
    createCanvas(configGame.WIDTH_CANVAS, configGame.HEIGHT_CANVAS).parent("sketch-pacman");
    for (let filaActual = 0; filaActual < configGame.ROWS; filaActual++) {
      for (let columnActual = 0; columnActual < configGame.COLUMNS; columnActual++) {
        let mapa = configGame.map[filaActual][columnActual];
        if (mapa === 1) {
          const roca = new Roca(filaActual, columnActual);
          arrRocks.push(roca);
        } else if (mapa=== 2) {
          const ajo = new Ajo(filaActual, columnActual);
          arrAjos.push(ajo);
        } else if (mapa === 3) {
          mySimon = new Simon(filaActual, columnActual);
        } else if (mapa=== 4) {
          const aigua = new Aigua(filaActual, columnActual);
          arraigua.push(aigua);
        } else if (mapa=== 5) {
          const zombie = new Zombie(filaActual, columnActual);
          arrzombie.push(zombie);
        } else if (mapa=== 6) {
          const dracula = new Dracula(filaActual, columnActual);
          arrdracula.push(dracula);
        }else if (mapa !== 1 && mapa !== 2 && mapa !== 3  && mapa !== 4 && mapa !== 5 && mapa !== 6 && mapa !== 0) {
          let error = new ErrorSimon(1, "Objecte no definit");
          error.showError();
        }
      }
    }
  }
  startTimeGame = millis();
}

function draw() {

  if (gameStarted) {
    background(220);
    arrRocks.forEach(rock => rock.showObject(imgRock));
    arrAjos.forEach(ajo => ajo.showObject(imgAjo));
    arrzombie.forEach(zombie => zombie.showObject(imgzombie));
    arrdracula.forEach(dracula => dracula.showObject(imgdracula));
    arraigua.forEach(aigua => aigua.showObject(imgaigua));


    arrRocks.forEach(rock => mySimon.testCollideRock(rock));

    for (let i = arrAjos.length - 1; i >= 0; i--) {
      if (mySimon.testCollideAjo(arrAjos[i])) {
        arrAjos.splice(i, 1);
        mySimon.scoreSimon = mySimon.scoreSimon + 5;
      }
    }
    if (arrAjos.length === 0) {
      FinishGame(); 
    }
    if (key === 1 && millis() - mySimon.powerUpTime > 10000) {
      key = 0;
    }
    
    
    arrzombie.forEach(zombie => mySimon.testCollideZombie(zombie));
    for(let i = arraigua.length - 1; i >= 0; i--){
      if(mySimon.testCollideAigua(arraigua[i])){
        arraigua.splice(i, 1);
        key=1;
        if (!mySimon.powerUpTime) {
          mySimon.powerUpTime = millis();
        }
        
      }
    }
    for (let i = arrdracula.length - 1; i >= 0; i--) {
      if (mySimon.testCollideDracula(arrdracula[i])) {
        if (key === 1) {
          arrdracula.splice(i, 1); 
          key = 0; 
          FinishGame();
        }else{
          FinishGame();
        }
      }
      if (millis() - gameStartTime > max_time) {
        FinishGame();
      }
    }

    textSize(20);
    textAlign(CENTER, CENTER);
    timer = parseInt( millis() - startTimeGame);
    text("Score: " + mySimon.scoreSimon, configGame.WIDTH_CANVAS/2, configGame.HEIGHT_CANVAS -50 );
    text("Time: " + timer, configGame.WIDTH_CANVAS/2, configGame.HEIGHT_CANVAS -20 );

    if (key === 1) {
      let remainingTime = 10 - Math.floor((millis() - mySimon.powerUpTime) / 1000);
      
      remainingTime = Math.max(remainingTime, 0);
    
      textSize(20);
      textAlign(CENTER, CENTER);
      text("Power-up actiu: " + remainingTime + "s", configGame.WIDTH_CANVAS / 2, configGame.HEIGHT_CANVAS - 80);
      
      if (remainingTime === 0) {
        key = 0;
        mySimon.powerUpTime = null;
      }
    }


    switch (mySimon.direction) {
      case 1: //Move right
        mySimon.showObject(imgSimonRIGHT);
        break;
      case 2: //Move up
        mySimon.showObject(imgSimonDown);
        break;
      case 3: //Move left
        mySimon.showObject(imgSimonLEFT);
        break
      case 4: //Move down
        mySimon.showObject(imgSimonUp);
        break;
      default :
        mySimon.showObject(imgSimonUp);
    }

  }
}

function keyPressed() {
  if (gameStarted) {
    if (keyCode === RIGHT_ARROW) {
      mySimon.moveRight();
    } else if (keyCode === LEFT_ARROW) {
      mySimon.moveLeft();
    } else if (keyCode === UP_ARROW) {
      mySimon.moveUp();
    } else if (keyCode === DOWN_ARROW) {
      mySimon.moveDown();
    } else {
      let error = new ErrorSimon(11, "Tecla no valida");
      error.showError();
    }
  }
}

function FinishGame() {
  if(gameFinished) return;
  gameFinished = true;
  noLoop();
  let message

  const finalDiv = document.getElementById("final");
  const finalMessage = document.getElementById("final_message");
  message = arrdracula.length === 0 ? "Has guanyat" : "Has perdut";
  if(arrAjos.length === 0){
    message = arrAjos.length === 0 ? "Has guanyat" : "Has perdut";
  }
    
  

  finalMessage.textContent = message;
  finalDiv.style.display = "block";

  document.getElementById("exitBtn").addEventListener("click", () => {window.location.href = "../index.html";});
}

function startGame() {
  console.log("Iniciando juego...")
  document.getElementById("info").style.display = "none";
  gameStarted = true;
  setup();
  loop();
}


globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed= keyPressed;
globalThis.startGame = startGame;

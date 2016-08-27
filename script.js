"use strict";

const ALIVE = 1;
const DYING = 10;
const DEAD = 0;
const CELLSIZE = 10;

function Grid(width, height){
  this.width = width;
  this.height = height;
  this.paused = false;
  this.pause = function(){
    this.paused = ! this.paused;
  };
  this.reset = function(){
      var new_grid = [];
      for (var x = 0; x < this.width; x++){
        new_grid[x] = [];
        for (var y = 0; y < this.height; y++){
          var c = (Math.random() < 0.25) ? ALIVE : (Math.random() < 75) ? DEAD : DYING;
          new_grid[x][y] = c;
        }
      };
      this._grid = new_grid;
  };
  this._grid = [];
  this.reset();

  this.next = function(x, y){
    if (this._grid[x][y] == DEAD){
        var xMp = (x == this.width - 1) ? 0 : x + 1;
        var xMm = (x == 0) ? this.width - 1 : x - 1;
        var yMp = (y == this.height -1) ? 0 : y + 1;
        var yMm = (y == 0) ? this.height - 1 : y - 1;
        var sum = 0;
        if (this._grid[xMp][y] == ALIVE) sum++;
        if (this._grid[xMp][yMp]== ALIVE) sum++;
        if (this._grid[xMp][yMm]== ALIVE) sum++;
        if (this._grid[x][yMp]== ALIVE) sum++;
        if (this._grid[x][yMm]== ALIVE) sum++;
        if (this._grid[xMm][y]== ALIVE) sum++;
        if (this._grid[xMm][yMp]== ALIVE) sum++;
        if (this._grid[xMm][yMm]== ALIVE) sum++;
        if (sum === 2) {
          return ALIVE;
        } else {
          return DEAD;
        }
    } else if (this._grid[x][y] == DYING) {
      return DEAD;
    } else if (this._grid[x][y] == ALIVE) {
      return DYING
    }
  };
  this.update = function(){
    if (! this.paused ){
      var new_grid = [];
      for (var x = 0; x < this.width; x++){
        new_grid[x] = [];
        for (var y = 0; y < this.height; y++){
          new_grid[x][y] = this.next(x, y);
        }
      }
      for (var x = 0; x < this.width; x++){
        for (var y = 0; y < this.height; y++){
          this._grid[x][y] = new_grid[x][y];
        }
      }

    } else {
      if ( mouseIsPressed ){
          var x = Math.floor(mouseX / CELLSIZE);
          var y = Math.floor(mouseY / CELLSIZE);
          if (x < 0 || x > this.width) return;
          if (y < 0 || y > this.height) return;
          if (this._grid[x] == undefined) return;
          this._grid[x][y] = ALIVE;
      }
    }
  };

  this.show = function(){
    for (var x = 0; x < this.width; x++){
      for (var y = 0; y < this.height; y++){
        switch( this._grid[x][y] ){
          case DEAD:
            break;
          case ALIVE:
            fill(255, 255, 255);
            rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);
            break;
          case DYING:
            fill(0,  0,  255);
            rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE);
            break;
        }
      }
    }
  };
}

var grid;
var width;
var height;
var resetButton;
var pauseButton;

function setup(){
  width = 800;
  height = 600;
  grid = new Grid(80, 60);
  createCanvas(800,600).parent('canvasHere');
  resetButton = createButton('reset');
  resetButton.parent('reset')
  resetButton.mousePressed(function(){ grid.reset(); });
  pauseButton = createButton('pause');
  pauseButton.parent('pause');
  pauseButton.mousePressed(function(){ grid.pause(); });
}

function draw(){
  background(0);
  grid.show();
  grid.update();

}

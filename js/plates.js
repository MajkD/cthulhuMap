var myCanvasContainer = null;
var myCanvas = null;
var myContext = null;

var myCurrentSelectedImage = -1;
var myClickedOffsetX = -1;
var myClickedOffsetY = -1;

Plate = function (path, xPos, yPos) {
  this.myImage = new Image();
  this.myImage.src = path;
  this.myXPos = xPos;
  this.myYPos = yPos;
  this.myPath = path;
};

var myPlates = [new Plate("./img/buttonRed.jpg", 100, 100),
                new Plate("./img/buttonWhite.jpg", 110, 110),
                new Plate("./img/testIconYellow.png", 210, 210)];

var initializeCanvas = function () {

  myCanvasContainer = document.createElement('div');
  document.body.appendChild(myCanvasContainer);
  myCanvasContainer.style.position = "absolute";
  myCanvasContainer.style.left = "0px";
  myCanvasContainer.style.top = "0px";
  myCanvasContainer.style.width = "100%";
  myCanvasContainer.style.height = "100%";
  myCanvasContainer.style.zIndex = "1000";

  myCanvas = document.createElement('canvas');
  myCanvas.style.width = myCanvasContainer.scrollWidth + "px";
  myCanvas.style.height = myCanvasContainer.scrollHeight + "px";
  myCanvas.width = myCanvasContainer.scrollWidth;
  myCanvas.height = myCanvasContainer.scrollHeight;
  myCanvas.style.overflow = "visible";
  myCanvas.style.position = "absolute";
  myCanvas.style.backgroundColor = "#171717";
  // myCanvas.style.backgroundColor = "gray";
  myCanvasContainer.appendChild(myCanvas);

  myContext = myCanvas.getContext('2d');

  updateDimensions();
}

var updateCanvasSize = function () {
  myCanvasContainer.scrollWidth = window.innerWidth;
  myCanvasContainer.scrollHeight = window.innerHeight;
  myCanvas.style.width = window.innerWidth + "px";
  myCanvas.style.height = window.innerHeight + "px";
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  updateDimensions();
}

var updateDimensions = function () {
}

var draw = function () {
  myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
  var numPlates = myPlates.length;
  for(index = 0; index < numPlates; index++){
    var curPlate = myPlates[index];
    myContext.drawImage(curPlate.myImage, curPlate.myXPos, curPlate.myYPos, curPlate.myImage.width, curPlate.myImage.height);
  }
}

var tick = function (){
  draw();
}

var handleMouseMoved = function (event) {
  myCurMouseX = event.x;
  myCurMouseY = event.y;
  if(myCurrentSelectedImage != -1){
    myPlates[myCurrentSelectedImage].myXPos = myCurMouseX - myClickedOffsetX;
    myPlates[myCurrentSelectedImage].myYPos = myCurMouseY - myClickedOffsetY;
  }
}

var handleResize = function (event) {
  updateCanvasSize();
}

var handleMouseDown = function (event) {
  var numPlates = myPlates.length;
  for(index = numPlates-1; index >= 0; index--){
    var curPlate = myPlates[index];
    if(myCurMouseX > curPlate.myXPos && myCurMouseX <= curPlate.myXPos + curPlate.myImage.width){
      if(myCurMouseY > curPlate.myYPos && myCurMouseY <= curPlate.myYPos + curPlate.myImage.height){
        selectPlate(curPlate, index);
        break;
      }
    }
  }
}

var selectPlate = function(selectedPlate, index){
  myClickedOffsetX = myCurMouseX - selectedPlate.myXPos;
  myClickedOffsetY = myCurMouseY - selectedPlate.myYPos;
  var temp = myPlates[index];
  myPlates.splice(index, 1);
  myPlates.push(temp);
  myCurrentSelectedImage = myPlates.length-1;
}

var handleMouseUp = function (event) {
  myCurrentSelectedImage = -1;
}

initializeCanvas();

document.onmousemove = handleMouseMoved;
document.onmousedown = handleMouseDown;
document.onmouseup = handleMouseUp;
window.onresize = handleResize;

setInterval(tick, 1000 / 50);
var myCanvasContainer = null;
var myCanvas = null;
var myContext = null;

var myCurrentSelectedImage = -1;
var myClickedOffsetX = -1;
var myClickedOffsetY = -1;

var imgScale = 1.0;

Plate = function (path, xPos, yPos) {
  this.myImage = new Image();
  this.myImage.src = path;
  this.myXPos = xPos;
  this.myYPos = yPos;
  this.myPath = path;
};

var myPlates = [new Plate("./img/1.png", 10, 10),
                new Plate("./img/2.png", 30, 30),
                new Plate("./img/3.png", 50, 50),
                new Plate("./img/4.png", 70, 70),
                new Plate("./img/5.png", 90, 90),
                new Plate("./img/6.png", 110, 110),
                new Plate("./img/7.png", 130, 130),
                new Plate("./img/map.png", 400, 10)];

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
    var width = curPlate.myImage.width * imgScale;
    var height = curPlate.myImage.height * imgScale;
    myContext.drawImage(curPlate.myImage, curPlate.myXPos, curPlate.myYPos, width, height);
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
    var width = curPlate.myImage.width * imgScale;
    var height = curPlate.myImage.height * imgScale;
    if(myCurMouseX > curPlate.myXPos && myCurMouseX <= curPlate.myXPos + width){
      if(myCurMouseY > curPlate.myYPos && myCurMouseY <= curPlate.myYPos + height){
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
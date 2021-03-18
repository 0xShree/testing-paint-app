//Initialize variables
let canvas;
let ctx;
let savedImageData;

let dragging = false;
let strokeColor = 'black';
let fillColor;
let letters = '0123456789ABCDEF';

let line_Width = 2;
let rectangle;
let rectangles = [];
let dragIndexMove;
let draggingMove;

var dragIndex;
let index;
var dragX;
var dragY;
var offsetX;
var offsetY;

// Event listener for DOM loading
document.addEventListener('DOMContentLoaded', setupCanvas);

// Setup function
function setupCanvas(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var boxShape=canvas.getBoundingClientRect();
    offsetX=boxShape.left;
    offsetY=boxShape.top;

    canvas.addEventListener("mousedown", ReactToMouseDown);
    
    canvas.addEventListener("mousemove", ReactToMouseMove);
    
    canvas.addEventListener("mouseup", ReactToMouseUp);
    canvas.addEventListener('dblclick', deleteRectangle);

}

//Get mouse position
function GetMousePosition(x,y){
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
    };
}
 
function SaveCanvasImage(){
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}
 
function RedrawCanvasImage(){
    ctx.putImageData(savedImageData,0,0);
}

//Update Shape values
function UpdateShapeSizeData(loc){
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);

    if(loc.x > mousedown.x){
        shapeBoundingBox.left = mousedown.x;
    } else {
        shapeBoundingBox.left = loc.x;
    }

    if(loc.y > mousedown.y){
        shapeBoundingBox.top = mousedown.y;
    } else {
        shapeBoundingBox.top = loc.y;
    }
}

//Events for draw button
function drawingEvent(){
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);

    canvas.removeEventListener("mousedown", mouseDown);

}

//Events for drag button
function movingEvent(){
    canvas.addEventListener("mousedown", mouseDown);


    canvas.removeEventListener("mousedown", ReactToMouseDown);
    canvas.removeEventListener("mousemove", ReactToMouseMove);
    canvas.removeEventListener("mouseup", ReactToMouseUp);
}

// Pick random color
function getRandomColor(){
    let color = '#';
    for(var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()  * 16)];
    }
    return color;
}

// Download the screenshot of canvas
function downloadCanvas(){
    var image = canvas.toDataURL();
    var tmpLink = document.createElement('a');
    tmpLink.download = 'image.png';
    tmpLink.href = image;

    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}

// Clear the screen and set option to draw
function clearCanvas(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    rectangles = [];
    drawingEvent();
}
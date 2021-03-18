// Events for drawing rectangle
function ReactToMouseDown(e){
    loc = GetMousePosition(e.clientX, e.clientY);
   
    SaveCanvasImage();
   
    mousedown.x = loc.x;
    mousedown.y = loc.y;

    dragging = true;
    fillColor = getRandomColor();
}
 
function ReactToMouseMove(e) {
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    if(dragging){
        var index;
        RedrawCanvasImage();
        UpdateShapeSizeData(loc);
        drawRectangle(); 
    }
}
 
function ReactToMouseUp(e) {
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateShapeSizeData(loc);
    drawRectangle(); 

    dragging = false;
    usingBrush = false;
    rectangle = {x: shapeBoundingBox.left, y: shapeBoundingBox.top, 
                width: shapeBoundingBox.width, height: shapeBoundingBox.height,
                color: fillColor};
    rectangles.push(rectangle)
}

// Events for dragging the shape
function mouseDown(e) {
	var i;
	var highestIndex = -1;		

    var m = GetMousePosition(e.clientX, e.clientY);

	for (i=0; i < rectangles.length; i++) {
        var r = rectangles[i];
		if	(m.x>r.x && m.x<r.x+r.width && m.y>r.y && m.y<r.y+r.height) {
			draggingMove = true;
            index = i;
			if (i > highestIndex) {
				dragX = m.x - r.x;
				dragY = m.y - r.y;
				highestIndex = i;
			}				
		}
	}
	if (draggingMove) {
		canvas.addEventListener("mousemove", mouseMove);
	}
	canvas.removeEventListener("mousedown", mouseDown);
	canvas.addEventListener("mouseup", mouseUp);   
}

function mouseMove(e) {	
    var posX;
    var posY;
    
    loc = GetMousePosition(e.clientX, e.clientY);
    
    posX = loc.x - dragX;
    posY = loc.y - dragY;
    
    rectangles[index].x = posX;
    rectangles[index].y = posY;
    RedrawCanvasImage();
    drawMovingRectangle();
}
function mouseUp(e) {

    canvas.addEventListener("mousedown", mouseDown);
    canvas.removeEventListener("mouseup", mouseUp);
    if (draggingMove) {
        draggingMove = false;
        canvas.removeEventListener("mousemove", mouseMove);
    }
    RedrawCanvasImage();
    drawMovingRectangle();
}

// Delete rectangle on double click
function deleteRectangle(e) 
{		
    var bRect = canvas.getBoundingClientRect();

    var m = GetMousePosition(e.clientX, e.clientY);
		for (var i=0; i < rectangles.length; i++) {
            var r = rectangles[i];
			if	((m.x>r.x && m.x<r.x+r.width && m.y>r.y && m.y<r.y+r.height)) {
				dragIndexDelete = i;		
			}
		}
		//Remove the rectangle from the array
		if ( dragIndexDelete> -1 ){
			rectangles.splice(dragIndexDelete,1)[0];
		}
		
		if (e.preventDefault) {
			e.preventDefault();
		} 
		else if (eveent.returnValue) {
			e.returnValue = false;
		} 
	drawMovingRectangle();				
}
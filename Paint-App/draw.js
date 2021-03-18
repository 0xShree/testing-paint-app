function drawRectangle(){
    ctx.fillStyle =  fillColor;
    ctx.fillRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width,
        shapeBoundingBox.height);
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width,
        shapeBoundingBox.height);
}

function drawMovingRectangle(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < rectangles.length; i++){
    var r = rectangles[i];
    ctx.fillStyle = r.color;
    ctx.fillRect(r.x, r.y, r.width, r.height);
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    ctx.strokeRect(r.x, r.y, r.width, r.height);
    }
}
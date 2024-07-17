document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let usingEraser = false;
    let strokeColor = document.getElementById('colorPicker').value;
    let lineWidth = document.getElementById('thicknessSlider').value;
    const toolStatus = document.getElementById('toolStatus');
    const eraserButton = document.getElementById('eraserTool');

    // Set the canvas size dynamically or fixed, as needed
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Update the tool status display
    function updateToolStatus(toolName) {
        toolStatus.textContent = `Current Tool: ${toolName}`;
    }

    // Handle color change
    document.getElementById('colorPicker').addEventListener('change', function() {
        if (!usingEraser) { // Update stroke color only if not in eraser mode
            strokeColor = this.value;
        }
    });

    // Handle thickness change
    document.getElementById('thicknessSlider').addEventListener('input', function() {
        lineWidth = this.value;
    });

    // Toggle eraser tool
    eraserButton.addEventListener('click', function() {
        usingEraser = !usingEraser;
        if (usingEraser) {
            ctx.globalCompositeOperation = 'destination-out';
            eraserButton.classList.remove('drawingMode'); // Change to eraser visual indication
            eraserButton.textContent = 'Drawing';
            updateToolStatus('Eraser');
        } else {
            ctx.globalCompositeOperation = 'source-over';
            eraserButton.classList.add('drawingMode'); // Change to drawing visual indication
            eraserButton.textContent = 'Eraser';
            updateToolStatus('Pencil');
        }
    });

    // Clear the canvas
    document.getElementById('clearCanvas').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Start drawing
    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    // Draw
    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = usingEraser ? 'white' : strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    });

    // Stop drawing
    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mouseleave', () => drawing = false);
});
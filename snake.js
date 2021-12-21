
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let radius = 100;

draw();

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height );
    ctx.fillStyle = 'white';
    ctx.fillRect(130,170,30-2,30-2)
    ctx.fillRect(160,170,30-2,30-2)

    ctx.fillStyle = 'green';
    ctx.arc( 250, 250, 50, 0, Math.PI * 2, false);
    ctx.stroke();
    
}

function gameLoop() {

}


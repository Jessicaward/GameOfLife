document.addEventListener("DOMContentLoaded", () => {
    init();
});

var context;
var board;
var properties = {
    boardWidth: 250,
    boardHeight: 250,
    colours: ["#000000", "#ffffff"]
};

function init() {
    var canvas = document.getElementById("gameCanvas");

    if(canvas.getContext){
        context = canvas.getContext("2d");
        initBoard(properties.boardWidth, properties.boardHeight);
        setInterval(gameLoop, 1);
    }
    else{
        alert("Couldn't find canvas.")
    }
}

function initBoard(width, height){
    board = Array.from(Array(width), () => new Array(height));
    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            board[x][y] = Math.floor(Math.random() * 2);
        }
    }
}

function drawBoard(){
    for(var x = 0; x < properties.boardWidth; x++){
        for(var y = 0; y < properties.boardHeight; y++){
            context.fillStyle = properties.colours[board[x][y]];
            context.fillRect(x, y, 2, 2);
        }
    }
}

function gameLoop(){
    drawBoard();
}
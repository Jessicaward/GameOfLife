document.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById("reset").addEventListener("click", () => {
        initBoard(properties.boardWidth, properties.boardHeight);
    });
    document.getElementById("togglePlay").addEventListener("click", () => {
        document.getElementById("togglePlay").innerText = playing ? "Play" : "Pause";
        playing = !playing;
    });
    document.getElementById("randomSeed").addEventListener("click", () => {
        for(var x = 0; x < properties.boardWidth; x++){
            for(var y = 0; y < properties.boardHeight; y++){
                //todo: add some sort of chance to this, it just ends in weird tubey static
                board[x][y] = Math.floor(Math.random() * 2);
            }
        }
    });
    canvas.addEventListener("mousemove", (event) => {
        if(event.buttons == 1 && event.button == 0){
            var rect = canvas.getBoundingClientRect();
            drawOnCanvas(
                Math.round((event.clientX - rect.left) / properties.scale),
                Math.round((event.clientY - rect.top) / properties.scale)
            );
        }
    });
});

var context;
var board;
var canvas;
var playing = true;
var properties = {
    boardWidth: 250,
    boardHeight: 250,
    scale: 3,
    colours: ["#000000", "#ffffff"]
};

function init() {
    canvas = document.getElementById("gameCanvas");

    if(canvas.getContext){
        context = canvas.getContext("2d");
        initBoard(properties.boardWidth, properties.boardHeight);
        setInterval(gameLoop, 1);
    }
    else{
        alert("Couldn't find canvas.")
    }
}

function drawOnCanvas(x, y){
    board[x][y] = 1 ^ board[x][y];
}

function initBoard(width, height){
    board = Array.from(Array(width), () => new Array(height));
    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            board[x][y] = 0;
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

function updateBoard(){
    for(var x = 0; x < properties.boardWidth; x++){
        for(var y = 0; y < properties.boardHeight; y++){
            var numberOfNeighbours = getNumberOfNeighbours(x, y);
            if(numberOfNeighbours < 2){
                //cell dies due to underpopulation
                board[x][y] = 0;
            }
            else if(board[x][y] == 0 && numberOfNeighbours == 3){
                //cell is born
                board[x][y] = 1;
            }
            else if(numberOfNeighbours > 3){
                //cell dies due to overpopulation
                board[x][y] = 0;
            }
        }
    }
}

function getNumberOfNeighbours(x, y){
    var numberOfNeighbours = 0;
    for(var row = x - 1; row <= x + 1; row++){
        for(var col = y - 1; col <= y + 1; col++){
            if(row < 0 || row >= properties.boardWidth || col < 0 || col >= properties.boardHeight){
                //neighbouring cell is out of bounds.
                continue;
            }
            else if(row == x && col == y){
                //cell shouldn't count itself.
                continue;
            }
            else if(board[row][col] == 0){
                //neighbouring cell is dead.
                continue;
            }

            numberOfNeighbours++;
        }
    }

    return numberOfNeighbours;
}

function gameLoop(){
    if(playing){
        updateBoard();
    }

    //we still want to draw the board as the player may draw on screen while paused.
    drawBoard();
}
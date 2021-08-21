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
        for(var y = 0; y < properties.height; y++){
            var numberOfNeighbours = getNumberOfNeighbours(x, y);
            if(numberOfNeighbours < 2){
                //cell dies due to underpopulation
                board[x][y] = 0;
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
    drawBoard();
    updateBoard();
}

function invertPixel(){
    board[x][y] = 1 ^ board[x][y];
}
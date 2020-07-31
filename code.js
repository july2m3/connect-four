var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var grid = new Array();
var cells = new Array();
var gameContainer = document.querySelector('game-container');
var isYellowTurn = true;
var canClick = true;
var rows = __spreadArrays(document.querySelectorAll('.row'));
rows.forEach(function (row) {
    var columnsList = new Array();
    var cellsList = new Array();
    for (var _i = 0, _a = row.children; _i < _a.length; _i++) {
        var column = _a[_i];
        columnsList.push(column);
        cellsList.push({ clicked: false, color: 'none' });
    }
    grid.push(columnsList);
    cells.push(cellsList);
});
var _loop_1 = function (r) {
    var _loop_2 = function (c) {
        grid[r][c].addEventListener('click', function () {
            clickedOnCell(r, c);
        });
    };
    for (var c = 0; c < 7; c++) {
        _loop_2(c);
    }
};
for (var r = 0; r < 6; r++) {
    _loop_1(r);
}
/*
  if clicked exit
  if not clicked, show cell, but if can go down, go down
  // and keep going!
*/
function clickedOnCell(r, c) {
    if (!cells[r][c].clicked && canClick) {
        canClick = false;
        dropCell(r, c);
        // gameContainer.style.pointerEvents = 'none';
    }
}
function dropCell(r, c) {
    if (r === 5 || cells[r + 1][c].clicked) {
        if (isYellowTurn) {
            grid[r][c].classList.toggle('yellow');
            cells[r][c].color = 'yellow';
        }
        else {
            grid[r][c].classList.toggle('red');
            cells[r][c].color = 'red';
        }
        isYellowTurn = !isYellowTurn;
        cells[r][c].clicked = true;
        checkIfWinner(r, c);
        updateGameStatus();
        canClick = true;
    }
    else {
        popUpCell(r, c);
        setTimeout(function () {
            dropCell(r + 1, c);
        }, 200);
    }
}
// go through every possible combination of options
function checkIfWinner(r, c) {
    // check up
    // Just realized you never need to check up lol
    // check  right
    if (c < 4 &&
        cells[r][c].color === cells[r][c + 1].color &&
        cells[r][c].color === cells[r][c + 2].color &&
        cells[r][c].color === cells[r][c + 3].color) {
        displayWinningMessage();
    }
    // check left
    if (c > 2 &&
        cells[r][c].color === cells[r][c - 1].color &&
        cells[r][c].color === cells[r][c - 2].color &&
        cells[r][c].color === cells[r][c - 3].color) {
        displayWinningMessage();
    }
    // check down
    if (r < 3 &&
        cells[r][c].color === cells[r + 1][c].color &&
        cells[r][c].color === cells[r + 2][c].color &&
        cells[r][c].color === cells[r + 3][c].color) {
        displayWinningMessage();
    }
    // check down left
    if (r < 3 &&
        c > 2 &&
        cells[r][c].color === cells[r + 1][c - 1].color &&
        cells[r][c].color === cells[r + 2][c - 2].color &&
        cells[r][c].color === cells[r + 3][c - 3].color) {
        displayWinningMessage();
    }
    // check down right
    if (r < 3 &&
        c < 4 &&
        cells[r][c].color === cells[r + 1][c + 1].color &&
        cells[r][c].color === cells[r + 2][c + 2].color &&
        cells[r][c].color === cells[r + 3][c + 3].color) {
        displayWinningMessage();
    }
    // check up left
    console.log(r, c);
    if (r > 2 &&
        c > 2 &&
        cells[r][c].color === cells[r - 1][c - 1].color &&
        cells[r][c].color === cells[r - 2][c - 2].color &&
        cells[r][c].color === cells[r - 3][c - 3].color) {
        displayWinningMessage();
    }
    // check up right
    if (r > 2 &&
        c < 4 &&
        cells[r][c].color === cells[r - 1][c + 1].color &&
        cells[r][c].color === cells[r - 2][c + 2].color &&
        cells[r][c].color === cells[r - 3][c + 3].color) {
        displayWinningMessage();
    }
}
function displayWinningMessage() {
    var message = document.querySelector('.game-over-message');
    var winner = document.querySelector('.winner');
    var winningColor = isYellowTurn ? 'Red Team!' : 'Yellow Team!';
    winner.innerText = winningColor;
    message.style.display = 'flex';
}
function popUpCell(r, c) {
    if (isYellowTurn) {
        grid[r][c].classList.toggle('yellow');
        grid[r][c].classList.toggle('fall');
        setTimeout(function () {
            grid[r][c].classList.toggle('yellow');
            grid[r][c].classList.toggle('fall');
        }, 200);
    }
    else {
        grid[r][c].classList.toggle('red');
        grid[r][c].classList.toggle('fall');
        setTimeout(function () {
            grid[r][c].classList.toggle('red');
            grid[r][c].classList.toggle('fall');
        }, 200);
    }
}
// currently not working lol
function updateGameStatus() {
    var gameStatus = document.querySelector('.game-status');
    var currentPlayer = isYellowTurn ? 'Yellow Turn!' : 'Red Turn!';
    var colorForGameStatus = isYellowTurn ? 'yellow' : 'red';
    gameStatus.style.color = colorForGameStatus;
    gameStatus.innerText = currentPlayer;
}
updateGameStatus();

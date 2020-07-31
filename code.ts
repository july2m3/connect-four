const grid = new Array();
const cells = new Array();
const gameContainer = document.querySelector('game-container') as HTMLElement;
let isYellowTurn = true;
let canClick = true;

const rows = [...document.querySelectorAll('.row')];

rows.forEach((row: any) => {
  const columnsList = new Array();
  const cellsList = new Array();
  for (let column of row.children) {
    columnsList.push(column);
    cellsList.push({ clicked: false, color: 'none' });
  }
  grid.push(columnsList);
  cells.push(cellsList);
});

for (let r = 0; r < 6; r++) {
  for (let c = 0; c < 7; c++) {
    grid[r][c].addEventListener('click', () => {
      clickedOnCell(r, c);
    });
  }
}

/*
  if clicked exit
  if not clicked, show cell, but if can go down, go down
  // and keep going!
*/
function clickedOnCell(r: number, c: number) {
  if (!cells[r][c].clicked && canClick) {
    canClick = false;
    dropCell(r, c);
    // gameContainer.style.pointerEvents = 'none';
  }
}

function dropCell(r: number, c: number) {
  if (r === 5 || cells[r + 1][c].clicked) {
    if (isYellowTurn) {
      grid[r][c].classList.toggle('yellow');
      cells[r][c].color = 'yellow';
    } else {
      grid[r][c].classList.toggle('red');
      cells[r][c].color = 'red';
    }

    isYellowTurn = !isYellowTurn;
    cells[r][c].clicked = true;
    checkIfWinner(r, c);
    updateGameStatus();
    canClick = true;
  } else {
    popUpCell(r, c);
    setTimeout(() => {
      dropCell(r + 1, c);
    }, 200);
  }
}

// go through every possible combination of options
function checkIfWinner(r: number, c: number) {
  // check up
  // Just realized you never need to check up lol

  // check  right
  if (
    c < 4 &&
    cells[r][c].color === cells[r][c + 1].color &&
    cells[r][c].color === cells[r][c + 2].color &&
    cells[r][c].color === cells[r][c + 3].color
  ) {
    displayWinningMessage();
  }

  // check left
  if (
    c > 2 &&
    cells[r][c].color === cells[r][c - 1].color &&
    cells[r][c].color === cells[r][c - 2].color &&
    cells[r][c].color === cells[r][c - 3].color
  ) {
    displayWinningMessage();
  }

  // check down
  if (
    r < 3 &&
    cells[r][c].color === cells[r + 1][c].color &&
    cells[r][c].color === cells[r + 2][c].color &&
    cells[r][c].color === cells[r + 3][c].color
  ) {
    displayWinningMessage();
  }

  // check down left
  if (
    r < 3 &&
    c > 2 &&
    cells[r][c].color === cells[r + 1][c - 1].color &&
    cells[r][c].color === cells[r + 2][c - 2].color &&
    cells[r][c].color === cells[r + 3][c - 3].color
  ) {
    displayWinningMessage();
  }

  // check down right
  if (
    r < 3 &&
    c < 4 &&
    cells[r][c].color === cells[r + 1][c + 1].color &&
    cells[r][c].color === cells[r + 2][c + 2].color &&
    cells[r][c].color === cells[r + 3][c + 3].color
  ) {
    displayWinningMessage();
  }

  // check up left
  console.log(r, c);
  if (
    r > 2 &&
    c > 2 &&
    cells[r][c].color === cells[r - 1][c - 1].color &&
    cells[r][c].color === cells[r - 2][c - 2].color &&
    cells[r][c].color === cells[r - 3][c - 3].color
  ) {
    displayWinningMessage();
  }

  // check up right
  if (
    r > 2 &&
    c < 4 &&
    cells[r][c].color === cells[r - 1][c + 1].color &&
    cells[r][c].color === cells[r - 2][c + 2].color &&
    cells[r][c].color === cells[r - 3][c + 3].color
  ) {
    displayWinningMessage();
  }
}

function displayWinningMessage() {
  const message = document.querySelector('.game-over-message') as HTMLElement;
  const winner = document.querySelector('.winner') as HTMLElement;
  const winningColor = isYellowTurn ? 'Red Team!' : 'Yellow Team!';
  winner.innerText = winningColor;
  message.style.display = 'flex';
}

function popUpCell(r: number, c: number) {
  if (isYellowTurn) {
    grid[r][c].classList.toggle('yellow');
    grid[r][c].classList.toggle('fall');
    setTimeout(() => {
      grid[r][c].classList.toggle('yellow');
      grid[r][c].classList.toggle('fall');
    }, 200);
  } else {
    grid[r][c].classList.toggle('red');
    grid[r][c].classList.toggle('fall');
    setTimeout(() => {
      grid[r][c].classList.toggle('red');
      grid[r][c].classList.toggle('fall');
    }, 200);
  }
}

// currently not working lol
function updateGameStatus() {
  const gameStatus = document.querySelector('.game-status') as HTMLElement;
  const currentPlayer = isYellowTurn ? 'Yellow Turn!' : 'Red Turn!';
  const colorForGameStatus = isYellowTurn ? 'yellow' : 'red';

  gameStatus.style.color = colorForGameStatus;
  gameStatus.innerText = currentPlayer;
}

updateGameStatus();

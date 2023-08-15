const squares = document.querySelectorAll('.square');
const msg = document.querySelector('.status');
const btn = document.querySelector('.btn');

let running = false;
let options = ['','','','','','','','',''];
let wins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,4,8],
  [0,4,8],
  [2,4,6]
];
let currentPlayer = 'X';

initializeGame();

function initializeGame() {
  squares.forEach(square => square.addEventListener('click', squareClicked));
  btn.addEventListener('click', restart);
  msg.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function squareClicked() {
  const squareIndex = this.getAttribute('squareIndex');

  if ( options[squareIndex] != '' || !running ) {
    return;
  } else {
    updateSquare(this, squareIndex);
    checkWin();
  }
}

function updateSquare(square, index) {
  options[index] = currentPlayer;
  square.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
  msg.textContent = `Turn: ${currentPlayer}`;
}

function checkWin() {
  let roundWon = false;
  for (let i = 0; i < wins.length; i++) {
    const condition = wins[i];
    const sqrA = options[condition[0]];
    const sqrB = options[condition[1]];
    const sqrC = options[condition[2]];

    if (sqrA == '' || sqrB == '' || sqrC == '') {
      continue;
    }

    if (sqrA == sqrB && sqrB == sqrC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    msg.textContent = `${currentPlayer} Wins!`;
    running = false;

  } else if (!options.includes('')) {
    msg.textContent = `It's a Draw, Try Again!`;
    running = false;
  }

  else {
    changePlayer();
  }
}

function restart() {
  currentPlayer = 'X';
  options =  ['','','','','','','','',''];
  msg.textContent = `${currentPlayer}'s Turn.`;
  squares.forEach(square => square.textContent = '');
  running = true;
}
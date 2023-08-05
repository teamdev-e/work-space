const X_MARK = 'x';
const CIRCLE_MARK = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');

let circleTurn; 
let currentPlayer = 'X';

function startGame() {
    circleTurn = false;
    statusText.textContent = `${currentPlayer}'s Turn`;
    cellElements.forEach(cell => {
        cell.classList.remove(X_MARK);
        cell.classList.remove(CIRCLE_MARK);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');

}

function handleClick(e) {
    const cell = e.target;
    const currentMark = circleTurn ? CIRCLE_MARK : X_MARK;
    // place mark
    placeMark(cell, currentMark);

    // check for win / draw
    if(checkWin(currentMark)){
        endGame(false); 
    } else if(isDraw()) {
        endGame(true)
    } else {
        // switch turns
        switchTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentMark) {
    cell.classList.add(currentMark);
}

function switchTurns() {
    circleTurn = !circleTurn;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function setBoardHoverClass() {
    board.classList.remove(X_MARK);
    board.classList.remove(CIRCLE_MARK);

    if(circleTurn){
        board.classList.add(CIRCLE_MARK);
    }
    else {
        board.classList.add(X_MARK);
    }
}

function checkWin(currentMark) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentMark)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_MARK) || cell.classList.contains(CIRCLE_MARK);
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`
    }

    winningMessageElement.classList.add('show');
}

startGame();

restartButton.addEventListener('click', startGame);

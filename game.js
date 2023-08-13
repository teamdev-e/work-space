let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const gameSelector = document.getElementById('gameSelector');
let savedGames = [];


const gameModeForm = document.getElementById('gameModeForm');
let isComputerPlayer = false;

const turn = document.getElementById("turn");
turn.innerHTML="X's turn";

let selectedMode = gameModeForm.elements['mode'].value;

window.onload = function() {
const savedGamesJSON = localStorage.getItem('ticTacToeSavedGames');
if (savedGamesJSON) {
    savedGames = JSON.parse(savedGamesJSON);
    updateGameSelector();
}
};

gameModeForm.addEventListener('change', function() {
    selectedMode = gameModeForm.elements['mode'].value;
    isComputerPlayer = (selectedMode === '1');

    if(selectedMode === '3'){
            window.location.href = "ulu_index.html"; 
    }

    resetBoard();
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        makeMove(cell);
    });
});

function makeMove(cell) {
    play();
    updateGameSelector();
    if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
        cell.classList.add(currentPlayer);

            if (checkWin()) {
                setTimeout(() => {
                    alert(currentPlayer + 'の勝利！');
                    resetBoard();
                }, 100);
            } else if (checkDraw()) {
                setTimeout(() => {
                    alert('引き分け');
                    resetBoard();
                }, 100);
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                turn.innerHTML=currentPlayer+"'s turn";
                if (isComputerPlayer && currentPlayer === 'O') {
                    makeComputerMove();

                }
            }
        }
    }
    
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横の勝利条件
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦の勝利条件
        [0, 4, 8], [2, 4, 6] // 斜めの勝利条件
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    for (const cell of cells) {
        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            return false; 
        }
    }
    return true; 
}

function resetBoard() {
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    /*
    if (isComputerPlayer && currentPlayer === 'O') {
        makeComputerMove();
    }
    */
    turn.innerHTML="X's turn";
    //selectedMode = '1';
}

function makeComputerMove() {
    const emptyCells = Array.from(cells).filter(cell => !cell.classList.contains('X') && !cell.classList.contains('O'));
    
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const selectedCell = emptyCells[randomIndex];
        setTimeout(() => {
            makeMove(selectedCell);
        }, 800); 
    }
}


function saveGame() {
    const timestamp = new Date().toLocaleString();
    const gameData = {
        timestamp: timestamp,
        currentPlayer: currentPlayer,
        cellClasses: Array.from(cells).map(cell => cell.className),
        recordIsComputer: isComputerPlayer,
        gameMode: selectedMode, 
    };

    savedGames.push(gameData);
    if (savedGames.length > 5) {
        savedGames.shift();
    }

    updateGameSelector();

    localStorage.setItem('ticTacToeSavedGames', JSON.stringify(savedGames));
}


function loadGame() {
    const selectedIndex = gameSelector.value;
    if (savedGames[selectedIndex]) {
        const gameData = savedGames[selectedIndex];
        currentPlayer = gameData.currentPlayer;
        turn.innerHTML=currentPlayer+"'s turn";
        isComputerPlayer=gameData.recordIsComputer;
        selectedMode=gameData.gameMode;
        if (gameData.gameMode === '1') {
            gameModeForm.elements['mode'].value = '1';
        } else if (gameData.gameMode === '2') {
            gameModeForm.elements['mode'].value = '2';
        }
        for (let i = 0; i < cells.length; i++) {
            cells[i].className = gameData.cellClasses[i];
        }
    }
}

function updateGameSelector() {
    gameSelector.innerHTML = '';
    let option = document.createElement('option');
    option.text = '保存一覧';
    gameSelector.appendChild(option);
    for (let i = savedGames.length - 1; i >= 0; i--) {
    const option = document.createElement('option');
    option.value = i;
    const gameData = savedGames[i];
    option.text = `${savedGames.length - i}:保存日 ${gameData.timestamp}`;
    gameSelector.appendChild(option);
    }
}

gameSelector.addEventListener('change', function() {
    loadGame();
});


function play(){
    const bgm = document.getElementById("bgm");
    bgm.play();
}


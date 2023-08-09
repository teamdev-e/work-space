// 現在のプレイヤーを管理
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
let current_board_index;
let flag=false;
let flag_2=false;
let before;
const boards = document.querySelectorAll('.local_board');

const smallBoards = document.querySelectorAll('.small_board');

const turn = document.getElementById("turn");
turn.innerHTML="X's turn";

const gameSelector = document.getElementById('gameSelector');
let savedGames = [];

window.onload = function() {
    const savedGamesJSON = localStorage.getItem('ultimateTicTacToeSavedGames');
    if (savedGamesJSON) {
        savedGames = JSON.parse(savedGamesJSON);
        updateGameSelector();
    }
};

console.log(smallBoards);
const board1 = document.querySelector('.board1');
const board2 = document.querySelector('.board2');
const board3 = document.querySelector('.board3');
const board4 = document.querySelector('.board4');
const board5 = document.querySelector('.board5');
const board6 = document.querySelector('.board6');
const board7 = document.querySelector('.board7');
const board8 = document.querySelector('.board8');
const board9 = document.querySelector('.board9');

// ローカルボードの勝者を保存する配列
const localBoardWinners = [null, null, null, null, null, null, null, null, null];


// ゲームの進行や結果表示を処理
function makeMove(cell, board) {
    if(board===smallBoards[current_board_index] || !flag){
        if (!cell.classList.contains('X') && !cell.classList.contains('O') &&!cell.classList.contains('D')) {
            if(flag){
                smallBoards[current_board_index].classList.remove('next-board');
            }
            current_board_index = Array.from(cell.parentElement.children).indexOf(cell);
            cell.classList.add(currentPlayer);
            smallBoards[current_board_index].classList.remove('next-board');
            
            //console.log(cell.parentElement.children);
            console.log(boards);

            if (checkWin(board)) {
                alert(currentPlayer+'の勝利');
                fillBoardWithWinner(board, currentPlayer);
                if (!flag_2){
                    localBoardWinners[before] = currentPlayer;
                }else{
                    localBoardWinners[Array.from(boards).indexOf(board)] = currentPlayer;
                }

                console.log('win'+before, current_board_index);
                    
                before = current_board_index;
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                turn.innerHTML=currentPlayer+"'s turn";
                smallBoards[current_board_index].classList.add('next-board');
                flag=true;
                flag_2=false;
                
                console.log('win');
                console.log(localBoardWinners);

            } else if (checkDraw(board)) {
                    alert('引き分け');
                    fillBoardWithWinner(board, 'D');
                    if (!flag_2){
                        localBoardWinners[before] = '/';
                    }else{
                        localBoardWinners[Array.from(boards).indexOf(board)] = '/';
                    }
                    before = current_board_index;
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                    turn.innerHTML=currentPlayer+"'s turn";
                    smallBoards[current_board_index].classList.add('next-board');
                    flag=true;
                    flag_2=false;

                    console.log('draw');
                    console.log(localBoardWinners);
            } else {
                before = current_board_index;
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                turn.innerHTML=currentPlayer+"'s turn";
                smallBoards[current_board_index].classList.add('next-board');
                flag=true;
                flag_2=false;
                
                console.log(before, current_board_index);
                console.log('else');
            }
            
            if (localBoardWinners[current_board_index] !== null){
                smallBoards[before].classList.remove('next-board');
                flag=false;
                flag_2=true;

                console.log(before, current_board_index);
                console.log("abc");
            }
            if(globalCheckWin()){
                alert(currentPlayer+"の勝利！おめでとう！");
                resetBoard();
            }else if(globalCheckDraw()){
                alert("引き分け　お疲れさん！");
                resetBoard();
            }
            console.log(localBoardWinners);
        }
    }else{
        alert('指定のマス内でクリックしてください');
    }
}


function checkWin(board) {
    // boardのセルを取得
    const cells = board.querySelectorAll('.cell');

    // 勝利条件のパターン
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
/*
function checkDraw() {
    for (const cell of cells) {
        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            return false; 
        }
    }
    return true; 
}
*/
function checkDraw(board) {
    const cells = board.querySelectorAll('.cell');
    for (const cell of cells) {
        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            return false; 
        }
    }
    return true; 
}

function resetBoard() {
    cells.forEach(cell => {
        cell.classList.remove('X', 'O','D');
    });
    currentPlayer = 'X';
    smallBoards[current_board_index].classList.remove('next-board');
    flag=false;
    flag_2=false;
    for(let i=0;i<localBoardWinners.length;i++){
        localBoardWinners[i]=null;
    }
}


function fillBoardWithWinner(board, winner) {
    const cells = board.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.classList.add(winner);
    });
}

function globalCheckWin() {
    // boardのセルを取得

    const cells = localBoardWinners;
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    // 勝利条件のパターン
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横の勝利条件
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦の勝利条件
        [0, 4, 8], [2, 4, 6] // 斜めの勝利条件
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a]===currentPlayer &&
            cells[b]===currentPlayer &&
            cells[c]===currentPlayer) {
            return true;
        }
    }
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    return false;
}

function globalCheckDraw(){
    const cells = localBoardWinners;
    for(let i=0;i<cells.length;i++){
        if(cells[i]===null){
            return false;
        }
    }
    return true;
}


function saveGame() {
    const timestamp = new Date().toLocaleString();
    const gameData = {
        timestamp: timestamp,
        currentPlayer: currentPlayer,
        cellClasses: Array.from(cells).map(cell => cell.className),
        nextBoardIndex: current_board_index, 
        recordBoards: smallBoards,
        recordLocalBoardWinners: localBoardWinners,
        recordFlag:flag,
        recordFlag2:flag_2
    };

    savedGames.push(gameData);
    if (savedGames.length > 5) {
        savedGames.shift();
    }

    updateGameSelector();

    localStorage.setItem('ultimateTicTacToeSavedGames', JSON.stringify(savedGames));
}


function loadGame() {
    const selectedIndex = gameSelector.value;
    if (savedGames[selectedIndex]) {
        const gameData = savedGames[selectedIndex];
        flag=gameData.recordFlag;
        flag_2=gameData.flag_2;
        if(flag){
            smallBoards[current_board_index].classList.remove('next-board');
            current_board_index = gameData.nextBoardIndex; 
            smallBoards[current_board_index].classList.add('next-board');
        }else{
            smallBoards[current_board_index].classList.remove('next-board');
            current_board_index = gameData.nextBoardIndex; 
        }
        for (let i = 0; i < cells.length; i++) {
            cells[i].className = gameData.cellClasses[i];
        }
        localBoardWinners = gameData.localBoardWinners; 
        turn.innerHTML = currentPlayer + "'s turn";
        console.log(localBoardWinners);
    }
}

function updateGameSelector() {
    gameSelector.innerHTML = '';
    for (let i = savedGames.length - 1; i >= 0; i--) {
    const option = document.createElement('option');
    const gameData = savedGames[i];
    option.value = i;
    option.text = `${savedGames.length - i}:保存日 ${gameData.timestamp}`;
    gameSelector.appendChild(option);
    }
}

const backButton = document.getElementById("back");
backButton.addEventListener("click", () => {
    window.location.href = "index.html"; // ゲーム画面に遷移
});


gameSelector.addEventListener('change', function() {
    loadGame();
});
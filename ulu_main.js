// 現在のプレイヤーを管理
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
let current_board_index;
let flag=false;

const smallBoards = document.querySelectorAll('.small_board');

console.log(smallBoards)
const board1 = document.querySelector('.board1');
const board2 = document.querySelector('.board2');
const board3 = document.querySelector('.board3');
const board4 = document.querySelector('.board4');
const board5 = document.querySelector('.board5');
const board6 = document.querySelector('.board6');
const board7 = document.querySelector('.board7');
const board8 = document.querySelector('.board8');
const board9 = document.querySelector('.board9');


// ゲームの進行や結果表示を処理
function makeMove(cell, board) {
    if(board===smallBoards[current_board_index] | !flag){
        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            if(flag){
                smallBoards[current_board_index].classList.remove('next-board');
            }
            current_board_index = Array.from(cell.parentElement.children).indexOf(cell);
            console.log(`Clicked cell at row ${current_board_index}`);
            cell.classList.add(currentPlayer);
            smallBoards[current_board_index].classList.remove('next-board');
            if (checkWin(board)) {
                setTimeout(() => {
                    //displayWinner(currentPlayer, board);
                    alert(currentPlayer+'の勝利');
                    resetBoard();
                }, 100);
            } else if (checkDraw(board)) {
                setTimeout(() => {
                    alert('引き分け');
                    resetBoard();
                }, 100);
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                smallBoards[current_board_index].classList.add('next-board');
                flag=true;
            }
        }
    }else{
        alert('指定のマス内でクリックしてください')
    }
}

function displayWinner(player, board) {
    const winnerElement = document.createElement('div');
    winnerElement.classList.add('winner-marker');
    winnerElement.textContent = player;

    board.appendChild(winnerElement);
    board.classList.add('winner-board');
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

function checkDraw() {
    for (const cell of cells) {
        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            return false; 
        }
    }
    return true; 
}
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
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    smallBoards[current_board_index].classList.remove('next-board');
    flag=false;
}

// 現在のプレイヤーを管理
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
let current_board_index;
let flag=false;
let flag_2=false;
let before;

const smallBoards = document.querySelectorAll('.small_board');

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
        if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            if(flag){
                smallBoards[current_board_index].classList.remove('next-board');
            }
            current_board_index = Array.from(cell.parentElement.children).indexOf(cell);
            // console.log(`Clicked cell at row ${current_board_index}`);
            cell.classList.add(currentPlayer);
            smallBoards[current_board_index].classList.remove('next-board');
            if (checkWin(board)) {
                // ローカルボードの勝者を設定
                // setLocalBoardWinner(current_board_index, currentPlayer);
        
                // setTimeout(() => {
                    alert(currentPlayer+'の勝利');
                    fillBoardWithWinner(board, currentPlayer);
                
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                    smallBoards[current_board_index].classList.add('next-board');
                    localBoardWinners[before] = currentPlayer;
                    console.log(before, current_board_index);
                    before = current_board_index;
                    flag=true;
                // }, 100);
            
                console.log('win');
    
                console.log(localBoardWinners);

            } else if (checkDraw(board)) {
                setTimeout(() => {
                    alert('引き分け');
                    
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                    smallBoards[current_board_index].classList.add('next-board');
                    flag=true;
                }, 100);
            } else {
                before = current_board_index;
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                smallBoards[current_board_index].classList.add('next-board');
                flag=true;

                console.log('else');
            }
            
            if (localBoardWinners[current_board_index] !== null){
                console.log("abc");
                smallBoards[before].classList.remove('next-board');
                flag=false;
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

// function setLocalBoardWinner(boardIndex, winner) {
//     localBoardWinners[boardIndex] = winner;
// }

// function displayWinnerOnBoard(board, winner) {
//     const winnerElement = document.createElement('div');
//     winnerElement.classList.add('winner-marker');
//     winnerElement.textContent = winner;

//     board.appendChild(winnerElement);
//     board.classList.add('winner-board');
// }

function fillBoardWithWinner(board, winner) {
    const cells = board.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.classList.add(winner);
    });
}
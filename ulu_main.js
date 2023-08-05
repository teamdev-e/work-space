
// 現在のプレイヤーを管理
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');

const smallBoards = document.querySelectorAll('.small_board');

smallBoards.forEach(board => {
    const cells = board.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => makeMove(cell, board));
    });
});


// ゲームの進行や結果表示を処理
function makeMove(cell, board) {
    if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
        cell.classList.add(currentPlayer);

        if (checkWin(board)) {
            setTimeout(() => {
                alert(currentPlayer + 'の勝利！');
                resetBoard();
            }, 100);
        } else if (checkDraw(board)) {
            setTimeout(() => {
                alert('引き分け');
                resetBoard();
            }, 100);
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
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

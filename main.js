let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');

function makeMove(cell) {
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        
        if (checkWin()) {
            alert(currentPlayer + 'の勝利！');
            resetBoard();
        } else if (checkDraw()) {
            alert('引き分け');
            resetBoard();
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}

function checkWin() {
    // 勝利条件をチェックするロジックを実装する
    // 例: 横・縦・斜めのいずれかで同じ記号が揃ったらtrueを返す
}

function checkDraw() {
    // 引き分け条件をチェックするロジックを実装する
    // 例: 全てのセルが埋まった場合にtrueを返す
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
}

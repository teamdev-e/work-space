let currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');

    function makeMove(cell) {
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
    }
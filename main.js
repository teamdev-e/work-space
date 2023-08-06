let currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');

// ラジオボタンの値の取得
const gameModeForm = document.getElementById('gameModeForm');
const resetButton = document.querySelector('.reset-button');

let isComputerPlayer = false;

gameModeForm.addEventListener('change', function() {
    const selectedMode = gameModeForm.elements['mode'].value;
    isComputerPlayer = (selectedMode === '1');
    resetBoard();
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        makeMove(cell);
    });
});

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
        if (isComputerPlayer && currentPlayer === 'O') {
            makeComputerMove();
        }

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

    resetButton.addEventListener('click', resetBoard);
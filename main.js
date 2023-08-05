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
            // 勝利条件をチェックするロジックを実装する
        }


        function checkDraw() {
            // 引き分け条件をチェックするロジックを実装する
        }

        function resetBoard() {
            cells.forEach(cell => {
                cell.classList.remove('X', 'O');
            });
            currentPlayer = 'X';
        }
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';

const startGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
};

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = currentPlayer.toLowerCase();
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        endGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 10);
        endGame();
    } else {
        swapTurns();
    }
};

const placeMark = (cell, currentClass) => {
    cell.textContent = currentPlayer;
    cell.classList.add(currentClass);
};

const swapTurns = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const endGame = () => {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
};

restartButton.addEventListener('click', startGame);

startGame();

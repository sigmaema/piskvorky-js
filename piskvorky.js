const board = document.getElementById('hra')
const statusText = document.getElementById('status')
const resetButton = document.getElementById('reset')

let currentPlayer = 'X'
let gameActive = true
let gameState = Array(9).fill('')

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function createBoard() {
    board.innerHTML = "";
    gameState = Array(9).fill("");
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
    statusText.textContent = `Hraje hráč: ${currentPlayer}`;
    gameActive = true;
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Vyhrál hráč ${currentPlayer}!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "Remíza!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Hraje hráč: ${currentPlayer}`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        );
    });
}

resetButton.addEventListener("click", () => {
    currentPlayer = "X";
    createBoard();
});

createBoard();
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let currentTurn = 'x';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const pencilSound = new Audio('../pencil.mp3');

    const gameItemEl = document.querySelectorAll('.game__item');
    const turnDisplayElX = document.querySelector('.game__turns .x');
    const turnDisplayElO = document.querySelector('.game__turns .o');

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function changeTurn (value) {
        if (value === 'x') {
            turnDisplayElX.classList.remove('active');
            turnDisplayElO.classList.add('active');
            currentTurn = 'o';
        } else if (value === 'o') {
            turnDisplayElO.classList.remove('active');
            turnDisplayElX.classList.add('active');
            currentTurn = 'x';
        }
    }

    function checkIfWon() {
        return winConditions.some(item => {
            return item.every(value => {
                return gameState[value] === currentTurn;
            });
        });
    }

    function checkIfDraw() {
        return !gameState.includes('');
    }

    function endGame(text) {
        alert(text);
        gameItemEl.forEach(item => {
            item.classList.remove('x', 'o');
            item.textContent = '';
        });
        gameState = ['', '', '', '', '', '', '', '', ''];
        changeTurn('o');
    }

    gameItemEl.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('x') || item.classList.contains('o')) {
                console.log('exist');
                return;
            }

            pencilSound.play();
            gameState[i] = currentTurn;
            item.textContent  = gameState[i];
            item.classList.add(currentTurn);

            if (checkIfWon()) {
                setTimeout(() => {
                    endGame(`GAME OVER!\nPlayer ${currentTurn} won`);
                }, 50);
            } else if (checkIfDraw()) {
                setTimeout(() => {
                    endGame(`GAME OVER!\nNobody won`);
                }, 50);
            } else {
                changeTurn(currentTurn);
            }
        })
    })
});
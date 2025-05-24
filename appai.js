let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let winner = document.querySelector('.winner');

let isGameOver = false;

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box, index) => {
    box.addEventListener('click', function () {
        if (isGameOver || box.innerHTML !== '') return;

        box.innerHTML = "X";
        box.style.color = 'black';

        check("X");
        if (!isGameOver) {
            setTimeout(computerMove, 300); // delay to simulate thinking
        }
    });
});


function computerMove() {
    if (isGameOver) return; // If the game is already over, don't move

    for (let i = 0; i < win.length; i++) {
        let [a, b, c] = win[i];

        let valueA = boxes[a].innerHTML;
        let valueB = boxes[b].innerHTML;
        let valueC = boxes[c].innerHTML;

        
        if ((valueA === "O" && valueB === "O" && valueC === "") ||
            (valueA === "O" && valueC === "O" && valueB === "") ||
            (valueB === "O" && valueC === "O" && valueA === "")) {

            if (valueC === "") {
                boxes[c].innerHTML = "O";
                boxes[c].style.color = "white";
            } else if (valueB === "") {
                boxes[b].innerHTML = "O";
                boxes[b].style.color = "white";
            } else if (valueA === "") {
                boxes[a].innerHTML = "O";
                boxes[a].style.color = "white";
            }

            check("O"); 
            return;
        }
    }

   // blocking the player 
    for (let i = 0; i < win.length; i++) {
        let [a, b, c] = win[i];

        let valueA = boxes[a].innerHTML;
        let valueB = boxes[b].innerHTML;
        let valueC = boxes[c].innerHTML;

     
        if ((valueA === "X" && valueB === "X" && valueC === "") ||
            (valueA === "X" && valueC === "X" && valueB === "") ||
            (valueB === "X" && valueC === "X" && valueA === "")) {

            if (valueC === "") {
                boxes[c].innerHTML = "O";
                boxes[c].style.color = "white";
            } else if (valueB === "") {
                boxes[b].innerHTML = "O";
                boxes[b].style.color = "white";
            } else if (valueA === "") {
                boxes[a].innerHTML = "O";
                boxes[a].style.color = "white";
            }

            check("O"); 
            return;
        }
    }

    let emptyBoxes = [];

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML === "") {
            emptyBoxes.push(boxes[i]);
        }
    }

    if (emptyBoxes.length === 0) return; 

    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let randomBox = emptyBoxes[randomIndex];

    randomBox.innerHTML = "O";
    randomBox.style.color = "white";

    check("O"); 
}


function check(player) {
    for (const pattern of win) {
        let pos0 = boxes[pattern[0]].innerHTML;
        let pos1 = boxes[pattern[1]].innerHTML;
        let pos2 = boxes[pattern[2]].innerHTML;

        if (pos0 === player && pos1 === player && pos2 === player) {
            winner.innerHTML = `${player} is the Winner!`;
            isGameOver = true;

            pattern.forEach(i => {
                boxes[i].style.backgroundColor = "#90ee90";
            });
            return;
        }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerHTML !== '')) {
        winner.innerHTML = "It's a Draw!";
        isGameOver = true;
    }
}

reset.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerHTML = '';
        box.style.backgroundColor = '';
    });
    winner.innerHTML = '';
    isGameOver = false;
});

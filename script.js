// making variables to access the HTML
let boxes = document.querySelectorAll(".box"); // here i am accessing the 9 boxes 
let resetBtn = document.querySelector("#reset-btn"); // for reseting the game
let newGameBtn = document.querySelector("#new-btn"); // new btn after win
let newGameBtnTie = document.querySelector("#new-btn-tie"); // new btn after tie
let msgWin = document.querySelector("#msgW"); // for msg
let msgTie = document.querySelector("#msgT"); // for msg
let msgContainer = document.querySelector(".msg-container"); // for total msg & new-btn to be poped after win
let msgContainerTie = document.querySelector(".msg-container-tie") // for total msg & new-tie-btn msg to be poped after tie

let turnO = true; // for player O 

//the winning patterns 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [2, 4, 5],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainerTie.classList.add("hide");
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#c9d0d7";
    }      
};

const showWinner = (winner) => {
    msgW.innerText = `Congratulation! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// it is bcz after one winner the boxes should not be clicked
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const gameTie = () => {
    msgT.innerText = "It was a tie!";
    msgContainerTie.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isTie = true;// for tie

    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;        
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                isTie = false; 
            }
        } 
        else {
            isTie = false; 
        }
    }
    if(isTie) {
        gameTie(); 
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.style.backgroundColor = "#e5b927";
            box.style.color = "#e61057";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.backgroundColor = "#e61057";
            box.style.color = "#e5b927";
            turnO = true;
        }
        box.disabled = true;

        checkWinner(); // for tracking the score
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
newGameBtnTie.addEventListener("click", resetGame);

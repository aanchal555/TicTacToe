//HTML Elements
const statusDiv = document.querySelector(".status");
const restartDiv = document.querySelector(".restart");
const cellsDiv = document.querySelectorAll(".game-cell");

//constant variables
const xSymbol='×';
const oSymbol='○';

//game variables
let gameIsLive=true;
let xIsNext=true;
let winner=null;

//functions

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) =>{
  gameIsLive= false;
  winner=letter;
  if(winner === 'x'){
    statusDiv.innerHTML= letterToSymbol(winner) + ' is winner!';
  }
  else{
    statusDiv.innerHTML=letterToSymbol(winner) + ' is winner!';
  }
};

const checkGameStatus = () => {
  const topLeft = cellsDiv[0].classList[1];
  const topMiddle = cellsDiv[1].classList[1];
  const topRight = cellsDiv[2].classList[1];
  const middleLeft = cellsDiv[3].classList[1];
  const middleMiddle = cellsDiv[4].classList[1];
  const middleRight = cellsDiv[5].classList[1];
  const bottomLeft = cellsDiv[6].classList[1];
  const bottomMiddle = cellsDiv[7].classList[1];
  const bottomRight = cellsDiv[8].classList[1];

  //check winner
  if(topLeft && topLeft === topMiddle && topLeft === topRight){
    handleWin(topLeft);
  }else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
    handleWin(middleLeft);
  }else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
    handleWin(bottomLeft);
  }else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
    handleWin(topLeft);
  }else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
    handleWin(topMiddle);
  }else if(topRight && topRight === middleRight && topRight === bottomRight){
    handleWin(topRight);
  }else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
    handleWin(topLeft);
  }else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
    handleWin(topRight);
  }else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
    gameIsLive=false;
    statusDiv.innerHTML="<span>It's a tie!</span>";
  }else {
    xIsNext=!xIsNext;
    if(xIsNext){
      statusDiv.innerHTML=xSymbol+ "<span> Turn</span>";
    }
    else{
      statusDiv.innerHTML=oSymbol + "<span> Turn</span>";
    }
  }

};

//event Handlers
const handleRestart = () =>{
  xIsNext=true;
  statusDiv.innerHTML= xSymbol + "<span> Turn</span>";
  winner=null;
  for(const cellDiv of cellsDiv){
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
  }
};

const handleCellClick= (e) =>{
  const classList=e.target.classList;
  if(classList[1] === 'x' || classList[1] === 'o'){
    return;
  }

  if(xIsNext){
    classList.add('x');
    checkGameStatus();
  }
  else{
    classList.add('o');
    checkGameStatus();
  }
}

//event Listeners
restartDiv.addEventListener('click' , handleRestart);

for(const cellDiv of cellsDiv){
  cellDiv.addEventListener('click' , handleCellClick);
}

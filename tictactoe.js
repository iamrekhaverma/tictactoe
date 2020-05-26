var previousTurn = "X";
function checkIfMatrixIsFilled(gameMatrix) {
  let filled = true;
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++) {
      if(gameMatrix[i][j]!== "X" || gameMatrix[i][j]!== "Y") {
        filled = false;
        break;
      }
    }
  }
  return filled;
}

function initialize() {
  var gameMatrix = [
    [00, 01, 02],
    [10, 11, 12],
    [20, 21, 22]
  ];
  return gameMatrix;
}

let elements = document.getElementsByClassName("grid-item");
let gameMatrix = initialize();
var handleMatrixColumnClick = function() {
  let row = this.getAttribute("row");
  let col = this.getAttribute("col");
  // Already occupied
  if(gameMatrix[row][col] === "X" || gameMatrix[row][col] === "Y") {
    return;
  }
  if(previousTurn == "X") {
    previousTurn = "Y";
    currentTurn = "X";
  } else {
    previousTurn = "X";
    currentTurn = "Y"
  }
  this.innerText = currentTurn;
  gameMatrix[row][col]= currentTurn;
  let over = checkForCondition(gameMatrix);
  if(over) {
    alert("Won Player" + currentTurn);
    initialize();
    previousTurn = "X";
  } else {
    let filled = checkIfMatrixIsFilled(gameMatrix);
    console.log("filled",filled)
    if(filled) {
      alert("game over");
      initialize();
      previousTurn = "X";
    }
  }
};

function checkForCondition(gameMatrix) {
  console.log("gameMatrix",gameMatrix)
  console.log("gameMatrix[0][0]",gameMatrix[0][0], gameMatrix[1][1], gameMatrix[2][2])
  let win = false;
    if ((gameMatrix[0][0] == gameMatrix[1][1]) && (gameMatrix[1][1] == gameMatrix[2][2]))
    {
        win = true;
        return win;
    }
    if ((gameMatrix[2][0] == gameMatrix[1][1]) && (gameMatrix[1][1] == gameMatrix[0][2]))
    {
        win = true;
        return win;
    }

    if (checkColumn(gameMatrix) || checkRow (gameMatrix))
    {
        win = true;
        return win;
    }
    console.log("win",win);
    return win;
}

function checkRow()
{
    for (let i = 0; i<3; i++)
    {
        if ((gameMatrix[i][0] == gameMatrix[i][1]) && (gameMatrix[i][1] == gameMatrix[i][2]))
        {
            return true;
        }
    }
    return false;
}
function checkColumn ()
{
    for (let i = 0; i<3; i++)
    {
        if ((gameMatrix[0][i] == gameMatrix[1][i]) && (gameMatrix[1][i] == gameMatrix[2][i]))
        {
            return true;
        }
    }
    return false;
}

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', handleMatrixColumnClick, false);
}
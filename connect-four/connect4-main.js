//-------------start script----------------
  let player1 = new Set();
  let player2 = new Set();

//-------column finder---------
function columnFinder(number){
  columnNumberids = [];
  for(let i = boardSize[0]; i >=0;i--){
    columnNumberids.push((number-(10*i)));
  }
  return columnNumberids
}
//--------------player controller-----------
player = 0;
function playerSwitch() {
  player++;
  document.querySelector("#nextplayer").classList.toggle("player1")
  document.querySelector("#nextplayer").classList.toggle("player2");
}
function whichPlayer() {
  return player % 2;
}


//----------------win Conditions--------
function win(player){
  alert(player +" wins");
  reset(player);
}
function winPlayer1(array) {
  return array.every(function(number){
     return player1.has(number);
  })
}

function winPlayer2(array) {
  return array.every(function(number){
     return player2.has(number);
  })

}
function winCondition(number,player){
  // const columnNumberid = number%10;
  // const rowNumberid = Math.floor(number /10);
  switch(player){
  case 0:
    let tempArray = Array.from(document.querySelectorAll(".player1"));
    tempArray.pop();
    tempArray = tempArray.map(function(values){return Number(values.id)})

    if(player1.size>3){
      for(let i =0; i< 4 ;i++){
        const horizontalNumber = number-i;
        const diagnalNumUp = number-i-(i*10);
        const diagnalNumDown = number+(i*10)-i;
        const verticalNum = number-(i*10);
        const horiz = [horizontalNumber,horizontalNumber+1,horizontalNumber+2,horizontalNumber+3];
        const diagnallUp = [diagnalNumUp,diagnalNumUp+11,diagnalNumUp+22,diagnalNumUp+33];
        const diagnalDown = [diagnalNumDown,diagnalNumDown-9,diagnalNumDown-18,diagnalNumDown-27];
        const vertical = [verticalNum,verticalNum+10,verticalNum+20,verticalNum+30]
        if(winPlayer1(horiz) || winPlayer1(diagnallUp) || winPlayer1(diagnalDown)|| winPlayer1(vertical)){
          win("player1");
        } else if(player === (boardSize[0]*boardSize[1])){
          alert("Game Over! Tie");
          reset();
        }
      } 
    }
    
  
    break;
  case 1:
    let tempArray1 = Array.from(document.querySelectorAll(".player2"));
    tempArray1.pop();
    tempArray1 = tempArray1.map(function(values){return Number(values.id)})

    if(player2.size>3){
      for(let i =0; i< 4 ;i++){
        const horizontalNumber = number-i;
        const diagnalNumUp = number-i-(i*10);
        const diagnalNumDown = number+(i*10)-i;
        const verticalNum = number-(i*10);
        const horiz = [horizontalNumber,horizontalNumber+1,horizontalNumber+2,horizontalNumber+3];
        const diagnallUp = [diagnalNumUp,diagnalNumUp+11,diagnalNumUp+22,diagnalNumUp+33];
        const diagnalDown = [diagnalNumDown,diagnalNumDown-9,diagnalNumDown-18,diagnalNumDown-27];
        const vertical = [verticalNum,verticalNum+10,verticalNum+20,verticalNum+30]
        if(winPlayer2(horiz) || winPlayer2(diagnallUp) || winPlayer2(diagnalDown)|| winPlayer2(vertical)){
          win("player2");
        } else if(player === (boardSize[0]*boardSize[1])){
          alert("Game Over! Tie");
          reset();
        }
      } 
    }

    break;
  }
}



//-------hover event-------------
gameBoard.children[0].children[0].addEventListener("mouseover",function(event){
  const _array = columnFinder(Number(event.target.id));
  _array.forEach(function(number){
    document.getElementById(number).classList.add("hover");
  })
})
gameBoard.children[0].children[0].addEventListener("mouseout",function(event){
  const _array = columnFinder(Number(event.target.id));
  _array.forEach(function(number){
    document.getElementById(number).classList.remove("hover");
  })
})

//------------click events---------------
gameBoard.children[0].children[0].addEventListener("click",function(event){
  
  const _array = columnFinder(Number(event.target.id));
  const tempArray = []
  const columnNumberid = (Number(event.target.id))%10;
  let rowNumberid = 0;
  
  for(let i = boardSize[0] -1; i >=0;i--){
    const _arrayIndex = boardSize[0] -1 -i;    

    if((boardValues[i][columnNumberid]) === null){
      tempArray.push(_array[_arrayIndex]);
    } 

  }
  if(tempArray[0] !== undefined ){
    const boardValuesColumnid = tempArray.length-1;
    boardValues[boardValuesColumnid][columnNumberid] = whichPlayer();
    if(whichPlayer() === 0){
      document.getElementById(tempArray[0]).classList.add("player1")
      player1.add(tempArray[0]);
      winCondition(tempArray[0],0);
    } else {
      document.getElementById(tempArray[0]).classList.add("player2");
      player2.add(tempArray[0]);
      winCondition(tempArray[0],1);
    } 
  } else {
    return
  }
  playerSwitch();
  
})

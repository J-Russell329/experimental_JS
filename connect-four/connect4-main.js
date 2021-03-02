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
let player1 = new Set();
let player2 = new Set();;

//----------------win Conditions--------
function winCondition(number,player){
  // const columnNumberid = number%10;
  // const rowNumberid = Math.floor(number /10);
  switch(player){
  case 0:
    console.log("player1")
    let tempArray = Array.from(document.querySelectorAll(".player1"));
    tempArray.pop();
    tempArray = tempArray.map(function(values){return Number(values.id)})

    for(let i =0; i< 4 ;i++){
      const _number = number-i;
      const horiz = [[player1.has(_number)],[player1.has(_number+1)],[player1.has(_number+2)],[player1.has(_number+3)]]
      console.log(horiz)
      if(horiz.every(function(number){
        return player1.has(number)
      })) {
        win("player1")
      }
    }
  
    break;
  case 1:
    console.log("player2")
    break;
  }
  
  function win(player){
    alert(player +" wins")
  }


  // for (var y = 0; y < HEIGHT; y++) {
  //   for (var x = 0; x < WIDTH; x++) {
  //     var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
  //     var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
  //     var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
  //     var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

  //     if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
  //       return true;
  //     }
  //   }
  // }
  if(player === (boardSize[0]*boardSize[1])){
    alert("Game Over! Tie");
    reset();
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

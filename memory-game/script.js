const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "cyan"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//----------------gobal variables------------
let cardNumber = 0;
const glassScreen = document.querySelector("#glassscreen");

let score = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  const selectedCard = event.target;
  const colorClassID = selectedCard.classList[0];
  

  //-------------if statment to see how many cards are selected----------------
  cardNumber++
  if (cardNumber % 2 === 0 ){
    glassScreen.classList.toggle("glassscreen");
    document.querySelector("#roundcount").innerText = cardNumber /2;
      setTimeout(function(){
        test1 = document.querySelector(".i" + (cardNumber - 1)).classList[0];
        test2 = document.querySelector(".i" + cardNumber).classList[0];
        colorClassID1 = test1;
        colorClassID2 = test2;
       if (colorClassID1 !== colorClassID2){
         hideAgain();
        } else{
          glassScreen.classList.toggle("glassscreen");
          score++;
          document.querySelector("#score").innerText = score;
        };
      },500)
  };

  //--------------------functions that make the fliping magic happen ---------------
  function reveal() {
    selectedCard.classList.toggle("flipper");
      setTimeout(function(){
        selectedCard.classList.toggle("background-" + colorClassID);
        selectedCard.classList.toggle("i"+cardNumber) ;
        document.querySelector(".i" + cardNumber).classList.add("noclicks");
      },10)
  };
  function hideAgain() {
    setTimeout(function(){
      test1 = document.querySelector(".i" + (cardNumber - 1));
      test2 = document.querySelector(".i" + cardNumber);
      test1.classList.toggle("flipper");
      test2.classList.toggle("flipper");

      setTimeout(function(){
        test1.classList.toggle("background-" + colorClassID1);
        test2.classList.toggle("background-" + colorClassID2);
        test1.classList.toggle("i" + (cardNumber -1));
        test2.classList.toggle("i"+ cardNumber);
        test1.classList.toggle("noclicks");
        test2.classList.toggle("noclicks");

        glassScreen.classList.toggle("glassscreen");
      },450);
    },1000);
  };
  reveal();
}

//----------------------create elements when the DOM loads-----------------
createDivsForColors(shuffledColors);

//------------restart game event listner-------------------//
document.querySelector("#restart").addEventListener("click", restartGame);

//------------restart game function-------------------//
function restartGame() {
  const gameBoard = document.querySelector("#game");
  gameBoard.innerHTML = "";
  createDivsForColors(shuffledColors);
  cardNumber = 0;
  score = 0;
  document.querySelector("#roundcount").innerText = 0;
  document.querySelector("#score").innerText = 0;
};
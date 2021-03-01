//---------object destructuring 1----------
  //-1) console.log(numPlanets) = 8
  //-2) console.log(yearNeptuneDiscovered) 1846

//---------object destructuring 2----------
  //-1) console.log(discoveryYears); {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

//---------object destructuring 3----------
  //-1) `Your name is Alejandro and you like purple`;
  //-2) `Your name is Melissa and you like green`;
  //-3) `Your name is undefind and you like undefind`;

//---------array destructuring 1----------
  //-1) Maya
  //-2) Marisa
  //-3) Chi

//---------array destructuring 2----------

  //-1) Raindrops on roses
  //-2) "whiskers on kittens",
  //-3) ["Bright copper kettles","warm woolen mittens","Brown paper packages tied up with strings"]

//---------array destructuring 2----------
  // [10,30,20]

//------------------------------------------------------------------------------------------

//--------------------ES5 Assigning Variables to Object Properties--

var obj = {
  numbers: {
    a: 1,
    b: 2
  }
};

const {numbers: {a,b}} = obj

//--------------------ES5 Array Swap----------
let arr = [1, 2];
[arr[0],arr[1]] = [arr[1],arr[0]];

//--------------------raceResults-----------
const raceResults = ([first,second,third,...rest]) => ({first,second,third,rest});
const test = ["thing 1", "thing 2", "thing 3", "things 4", "things 5"]
const objectTester = {things1: "stuff1",things2: "stuff2",things3: "stuff3"}
const objectTester2 = {morethings1: "even more stuff",aLotoThings: "a loto' stuff"}
function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}
function filterOutOdds2(...nums){
  return nums.filter(num => num % 2 ===0)
}

//----------findMin--------------
function findMin(...numbers){
  return Math.min(...numbers);  
}

//-------------mergeObjects--------------
function mergeObjects(object1,object2){
  return {...object1,...object2}
}
//----------doubleAndReturnArgs---------
function doubleAndReturnArgs(arr,...rest){
  return [...arr,...(rest.map((numbers)=> numbers *2))]
}
//----------slice and Dice!--------------
function removeRandom(arr){
  if(arr.length === 0){
    alert("must input arguments");
    return;
  }
  const _arr = [...arr];
  const randomNumber = Math.floor(Math.random()*arr.length);
  _arr.splice(randomNumber,1)
  return _arr;
}
//--------extend------------------
const extend = (array1, array2) => [...array1,...array2];
//------------addKeyVal----------------
function addKeyVal(object,addKey,addVal){
  const _object = {...object};
  _object[addKey] = addVal;
  return _object;
}
//-----------removeKey-------------
function removeKey(object,objectKey){
  const _object = {...object};
  delete _object[objectKey];
  return _object
}
//----------combine--------------
const combine = (object1, object2) => {return {...object1, ...object2}};
//---------update----------------
function update(object,addKey,addVal){
  const _object = {...object};
  _object[addKey] = addVal;
  return _object;
}
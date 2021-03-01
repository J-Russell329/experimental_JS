//-------question 1-----------
[1,2,3,4]

//-------questino 2---------------
"ref"

//------question 3--------------
// 0: {Array(3) => true}
// key: (3) [1, 2, 3]
// value: true
// 1: {Array(3) => false}
// key: (3) [1, 2, 3]
// value: false

//-----------hasDuplicate--------
function hasDuplicate(arr) {
  const noDup = new Set(arr);
  // console.log(noDup);
  // console.log(arr.length);
  return noDup.size === arr.length ? false : true;
}

//-------vowe lCount-------
function vowelCount(string) {
  const vowels = "aeiou";
  const stringMap = new Map();
  const vowelSet = new Set();
  string.toLowerCase().split("").forEach( (letter) =>{
    setSize = vowelSet.size;
    vowelSet.add(letter);
    if(vowels.includes(letter)){
      if(setSize === vowelSet.size){
        stringMap.set(letter,stringMap.get(letter) +1)
      } else {
        stringMap.set(letter,0)
      }
    }
  })
  return stringMap;
}
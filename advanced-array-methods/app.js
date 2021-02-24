const numbers = [1,2,3,4,5,6,7,8,9,10]
const names = ["judy", "james","brie","charlie"]
const objectArrayOfNames=[
    {first: 'Elie', last:"Schoppik"},
    {first: 'Tim', last:"Garcia", isCatOwner: true},
    {first: 'Matt', last:"Lane"},
    {first: 'Colt', last:"Steele", isCatOwner: true}
  ]

//----------double values--------------


//-----------only evens---------------
function onlyEvenValues(arr){
    return arr.filter(function(num){
        return num % 2 === 0;
    })
};
//--------showFirstAndLast----------
function showFirstAndLast(arr){
    return arr.map(function(string){
        const stringToArray = Array.from(string);
        const firstAndLastOnly = stringToArray.filter(function(letter,i){
            if(i === 0 || i === stringToArray.length-1) return true;
        })
        const arrayToString = firstAndLastOnly.toString();
        return arrayToString.replace(/,/g,"")
    })
}
//------------addKeyAndValue----------
function addKeyAndValue(arr, key, value) {
    arr.forEach(function(val) {
      val[key] = value;
    });
    return arr;
}
//--------vowel counter--------------
function vowelCount(string){
    const lowerCaseString = string.toLowerCase();
    let vowels = [];
    let a = 0;
    let e = 0;
    let i = 0;
    let o = 0;
    let u = 0;
    const tempArray = Array.from(lowerCaseString);
    tempArray.forEach(function(letter){
        if(letter === "a") return a++,vowels.a = a;
        if(letter === "e") return e++,vowels.e = e;
        if(letter === "i") return i++,vowels.i = i;
        if(letter === "o") return o++,vowels.o = o;
        if(letter === "u") return u++,vowels.u = u; 
    })
    return vowels;
}
//-----------doubleValuesWithMap
function doubleValuesWithMap(arr){
    return arr.map(function(num){
        return num * 2;
    })
}
//----------valTimesIndex-----------
function valTimesIndex(arr){
    return arr.map(function(num,i){
        return num *i;
    })
}
//--------extractKey-------------
function extractKey(objectArray,extractedItem){
    return objectArray.map(function(object,i){
        return object[extractedItem];
    })
}
//---------extractFullName----------
function extractFullName(objectArray){
    return objectArray.map(function(object){
        firstName = object.first;
        lastName = object.last;
        return fullName = firstName +" "+ lastName;

    })
}
//------------filterByValue--------------
function filterByValue(objectArray,value){
    return objectArray.filter(function(object){
        // console.log(value);
        // console.log(object);
        try{
            if(object[value].value === true); return true;
        } catch {}
    })
}
//----------------find--------------
function find(arr,value){
    return arr.filter(function(num){
        if(num !== value){
            return false;
        }else {return true}
    })
}
//--------findInObj----------\
function findInObj(objectArray,objectKey,objectValue){
    return objectArray.filter(function(object){
        return object[objectKey] === objectValue;
    });
}
//--------removeVowels-------------
function removeVowels(string){
    const vowels = "aeiou";
    let lowerCaseString= string.toLowerCase();
    stringToArray = Array.from(lowerCaseString);
    const filteredArray= stringToArray.filter(function(letter){
        return vowels.indexOf(letter) === -1;
    })
    const arrayToString = filteredArray.toString();
    return arrayToString.replace(/,/g,"");
}

//-------------doubleOddNumbers-----------
function doubleOddNumbers(arr){
    const _arr = arr.filter(function(num,i){
        return (i+1) % 2 === 0;
    })
    return _arr.map(function(num){
        return num * 2;
    })
};
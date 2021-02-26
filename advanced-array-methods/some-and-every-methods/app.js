const numbers = [1,2,3,4,5,6,7,9,10]
let arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"},
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
        {title: "Instructor", first: 'Matt', last:"Lane"},
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]
//--------hasOddNumber----------
function hasOddNumber(arr){
    return arr.some(function(number){
         if(number % 2 !== 0) return true;
    })
}

//-------------hasAZero------------
function hasAZero(num){
    const numberToArray = Array.from(num.toString());
    return numberToArray.some(function(num){
        if(num === "0") return true;     
    })
}
//-----------hasOnlyOddNumbers-------
function hasOnlyOddNumbers(arr){
    return !arr.some(function(num){
        return (num % 2) === 0;
    })
}
//-----------hasNoDuplicates------------????????? lastIndexOf
function hasNoDuplicates(arr){
    return arr.every(function(num){
        console.log(arr.lastIndexOf(num),arr.indexOf(num))
      return arr.indexOf(num) === arr.lastIndexOf(num);
    });
}
// -------------hasCertainkey------------??????????? key in val
function hasCertainKey(arr,objectKey){
    return arr.every(function(object){
        return object[objectKey] !== undefined;
    })
}
// function hasCertainKey(arr, key){
//     return arr.every(function(val){
//       return key in val
//     })
//   }
//----------hasCertainValue------------------
function hasCertainValue(arr,objectKey,ObjectKeyValue){
    return arr.every(function(object){
        return object[objectKey] === ObjectKeyValue;
    })
}
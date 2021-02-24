const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
const names = [];
//----------extractValue----------
function extractValue(objectArray, objectKey){
    return objectArray.reduce(function(names,nextName){
        names.push(nextName[objectKey]);
        return names;
    },[]);
};
//--------vowelCount---------
function vowelCount(string){
    const vowels = "aeiou";
    lowerCaseString = string.toLowerCase();
    const stringToArray = Array.from(lowerCaseString);
    return stringToArray.reduce(function(acc,next){
        if(vowels.indexOf(next) !== -1){
            if(acc[next]){
                acc[next]++;
            } else acc[next] = 1;
        }
        return acc;
    }, {});
}
//----------addKeyAndValue------
function addKeyAndValue(arr,objectKey,objectValue) {
    return arr.reduce(function(acc,next,index){
        acc[index][objectKey] = objectValue
        return acc;
    },arr)
}
//-----------partition---------
const arr2 = [1,2,3,4,5,6,7,8];
const names2 = ['Elie', 'Colt', 'Tim', 'Matt'];


function isEven(val){
    return val % 2 === 0;
}

function isLongerThanThreeCharacters(val){
    return val.length > 3;
}


function partition(arr, callback){
    return arr.reduce(function(acc,next){
        if(callback(next)){
            acc[0].push(next);
        } else {
            acc[1].push(next);
        }
        return acc;
    },[[],[]]);
}
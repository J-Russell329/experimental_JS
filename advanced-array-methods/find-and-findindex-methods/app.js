const users = [
    {username: 'mlewis'},
    {username: 'akagen'},
    {username: 'msmith'}
  ];
function findUserByUsername(objectArray,username) {
    return objectArray.find(function(object){
        return object["username"] === username; 
    });
};
function removeUser(objectArray,username){
    const userId = objectArray.findIndex(function(object){
        return (object["username"]=== username);
    })
    if(userId !== -1) delete objectArray[userId];
}
let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendTdButton(newTr, "&#88;");

    serverTbody.append(newTr);
  }
}



//Step 3-------------server removal button---------------
serverTbody.addEventListener("click", serverDeleteButton);

function serverDeleteButton(event) {
  event.preventDefault();
  
  if(event.target.tagName === 'BUTTON'){
    _serverName = event.target.parentElement.children[0].innerText;
    for(let index in allServers){
      console.log(_serverName);
      console.log(index);
      console.log(allServers.index)
      if(allServers.index.serverName === _serverName){
        delete allServers.index;
      }
    event.target.parentElement.remove();
    }
  }
}
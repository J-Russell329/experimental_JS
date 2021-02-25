 describe("Servers test (with setup and tear-down)", function() {
  beforeAll(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  afterAll(function() {
    // teardown logic
    allServers = {};
    serverId = 0;
    serverTbody.innerText = "";

  });

});

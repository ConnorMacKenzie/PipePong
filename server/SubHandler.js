var Player = require('./Player.js');
var Leaderboard = require('./Leaderboard.js');
var PubHandler = require('./PubHandler.js');

var leaderboard = new Leaderboard();

module.exports.handleMessage = (topic, payload) => {
  topicToCallback[topic](payload);
};

function handleJoin(payload){
  console.log('Handling join');
  console.log('PAYLOAD: ' + payload);
  let data = JSON.parse(payload);
  var player = new Player(data.name, data.sessionId, data.color);
  leaderboard.addPlayer(player)
  console.log('LEADERBOARD:');
  console.log(leaderboard);
  PubHandler.publishLeaderboard(JSON.stringify(leaderboard));
}

function handleLeave(payload){
  console.log('Handling leave');
  console.log('PAYLOAD: ' + payload);
  let data = JSON.parse(payload);
  var player = new Player(data.name, data.sessionId, data.color);
  leaderboard.removePlayer(player)
  console.log('LEADERBOARD:');
  console.log(leaderboard);
  PubHandler.publishLeaderboard(JSON.stringify(leaderboard));
}

function handleBall(payload){
  console.log('Handling ball');
  console.log('PAYLOAD: ' + payload);
}

function handleTest(payload){
  console.log('Handling test');
  console.log('PAYLOAD: ' + payload);
}

const topicToCallback = {
  join: handleJoin,
  leave: handleLeave,
  ball: handleBall,
  test: handleTest
}

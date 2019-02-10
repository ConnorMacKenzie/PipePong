module.exports.handleMessage = (topic, payload) => {
  topicToCallback[topic](payload);
};

function handleJoin(payload){
  console.log('Handling join');
  console.log('PAYLOAD: ' + payload);
}

function handleLeave(payload){
  console.log('Handling leave');
  console.log('PAYLOAD: ' + payload);
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

var TopicPublisher = require("./TopicPublisher");
var solace = require('solclientjs').debug; // logging supported

// Initialize factory with the most recent API defaults
var factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProfiles.version10;
solace.SolclientFactory.init(factoryProps);

// enable logging to JavaScript console at WARN level
// NOTICE: works only with ('solclientjs').debug
solace.SolclientFactory.setLogLevel(solace.LogLevel.WARN);

module.exports.publishLeaderboard = (payload) => {
  // create the publisher, specifying the name of the subscription topic
  var publisher = new TopicPublisher.TopicPublisher(solace, 'leaderboard', payload);

  // publish message to Solace message router
  publisher.run(process.argv);
}

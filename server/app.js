var TopicSubscriber = require("./TopicSubscriber");

var solace = require('solclientjs').debug; // logging supported

// Initialize factory with the most recent API defaults
var factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProfiles.version10;
solace.SolclientFactory.init(factoryProps);

// enable logging to JavaScript console at WARN level
// NOTICE: works only with ('solclientjs').debug
solace.SolclientFactory.setLogLevel(solace.LogLevel.WARN);

// create the subscriber, specifying the name of the subscription topic
var joinSubscriber = new TopicSubscriber.TopicSubscriber(solace, 'join');
var leaveSubscriber = new TopicSubscriber.TopicSubscriber(solace, 'leave');
var ballSubscriber = new TopicSubscriber.TopicSubscriber(solace, 'ball');
var testSubscriber = new TopicSubscriber.TopicSubscriber(solace, 'test');

// subscribe to messages on Solace message router
joinSubscriber.run(process.argv);
leaveSubscriber.run(process.argv);
ballSubscriber.run(process.argv);
testSubscriber.run(process.argv);

// wait to be told to exit
console.log('Press Ctrl-C to exit');
process.stdin.resume();

process.on('SIGINT', function () {
    'use strict';
    joinSubscriber.exit();
    leaveSubscriber.exit();
    ballSubscriber.exit();
    testSubscriber.exit();
});

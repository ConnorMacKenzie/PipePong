var TopicPublisher = require("./TopicPublisher");
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
var subscriber = new TopicSubscriber(solace, 'test');

// create the publisher, specifying the name of the subscription topic
var publisher = new TopicPublisher(solace, 'test');

// subscribe to messages on Solace message router
subscriber.run(process.argv);

// publish message to Solace message router
//publisher.run(process.argv);

// wait to be told to exit
subscriber.log('Press Ctrl-C to exit');
process.stdin.resume();

process.on('SIGINT', function () {
    'use strict';
    subscriber.exit();
});

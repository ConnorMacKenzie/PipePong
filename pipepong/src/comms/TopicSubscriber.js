
// import solace from 'solclientjs';

var solace = require('solclientjs');

var HOSTURL = "ws://mr4b11zr98z.messaging.mymaas.net:80";
var USERNAME = "solace-cloud-client";
var VPN = "msgvpn-4b11zr985";
var PASS = "13hvb0guu1h4c5934o0cjn1rkl";

var TopicSubscriber = function (topicName, receiveHandler) {
    var factoryProps = new solace.SolclientFactoryProperties();
    // factoryProps.profile = solace.SolclientFactoryProfiles.version10;
    solace.SolclientFactory.init(factoryProps);
    var subscriber = {};
    subscriber.session = null;
    subscriber.topicName = topicName;
    subscriber.subscribed = false;
    subscriber.connected = false;

    // Logger
    // subscriber.log = function (line) {
    //     var now = new Date();
    //     var time = [('0' + now.getHours()).slice(-2), ('0' + now.getMinutes()).slice(-2),
    //         ('0' + now.getSeconds()).slice(-2)];
    //     var timestamp = '[' + time.join(':') + '] ';
    //     console.log(timestamp + line);
    //     var logTextArea = document.getElementById('log');
    //     logTextArea.value += timestamp + line + '\n';
    //     logTextArea.scrollTop = logTextArea.scrollHeight;
    // };

    console.log('\n*** Subscriber to topic "' + subscriber.topicName + '" is ready to connect ***');

    // Establishes connection to Solace router
    subscriber.connect = function () {
        // extract params
        if (subscriber.session !== null) {
            console.log('Already connected and ready to subscribe.');
            return;
        }
        var hosturl = HOSTURL;
        // check for valid protocols
        if (hosturl.lastIndexOf('ws://', 0) !== 0 && hosturl.lastIndexOf('wss://', 0) !== 0 &&
            hosturl.lastIndexOf('http://', 0) !== 0 && hosturl.lastIndexOf('https://', 0) !== 0) {
            console.log('Invalid protocol - please use one of ws://, wss://, http://, https://');
            return;
        }
        var username = USERNAME;
        var pass = PASS;
        var vpn = VPN;
        if (!hosturl || !username || !pass || !vpn) {
            console.log('Cannot connect: please specify all the Solace message router properties.');
            return;
        }
        console.log('Connecting to Solace message router using url: ' + hosturl);
        console.log('Client username: ' + username);
        console.log('Solace message router VPN name: ' + vpn);
        // create session
        try {
            subscriber.session = solace.SolclientFactory.createSession({
                // solace.SessionProperties
                url:      hosturl,
                vpnName:  vpn,
                userName: username,
                password: pass,
            });
        } catch (error) {
            console.log(error.toString());
        }
        // define session event listeners
        subscriber.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
            console.log('=== Successfully connected and ready to subscribe. ===');
            subscriber.subscribe();
            subscriber.connected = true;
        });
        subscriber.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
            subscriber.connected = false;
            console.log('Connection failed to the message router: ' + sessionEvent.infoStr +
                ' - check correct parameter values and connectivity!');
        });
        subscriber.session.on(solace.SessionEventCode.DISCONNECTED, function (sessionEvent) {
            subscriber.connected = false;
            console.log('Disconnected.');
            subscriber.subscribed = false;
            if (subscriber.session !== null) {
                subscriber.session.dispose();
                subscriber.session = null;
            }
        });
        subscriber.session.on(solace.SessionEventCode.SUBSCRIPTION_ERROR, function (sessionEvent) {
            console.log('Cannot subscribe to topic: ' + sessionEvent.correlationKey);
        });
        subscriber.session.on(solace.SessionEventCode.SUBSCRIPTION_OK, function (sessionEvent) {
            if (subscriber.subscribed) {
                subscriber.subscribed = false;
                console.log('Successfully unsubscribed from topic: ' + sessionEvent.correlationKey);
            } else {
                subscriber.subscribed = true;
                console.log('Successfully subscribed to topic: ' + sessionEvent.correlationKey);
                console.log('=== Ready to receive messages. ===');
            }
        });
        // define message event listener
        subscriber.session.on(solace.SessionEventCode.MESSAGE, function (message) {
            receiveHandler(JSON.parse(message.Ok));
            console.log('Received message: "' + message.getBinaryAttachment() + '", details:\n' +
                message.dump());
        });


       subscriber.connectToSolace();
    };

    // Actually connects the session triggered when the iframe has been loaded - see in html code
    subscriber.connectToSolace = function () {
        try {
            subscriber.session.connect();
        } catch (error) {
            console.log(error.toString());
        }
    };

    // Subscribes to topic on Solace message router
    subscriber.subscribe = function () {
        if (subscriber.session !== null) {
            if (subscriber.subscribed) {
                console.log('Already subscribed to "' + subscriber.topicName
                    + '" and ready to receive messages.');
            } else {
                console.log('Subscribing to topic: ' + subscriber.topicName);
                try {
                    subscriber.session.subscribe(
                        solace.SolclientFactory.createTopicDestination(subscriber.topicName),
                        true, // generate confirmation when subscription is added successfully
                        subscriber.topicName, // use topic name as correlation key
                        10000 // 10 seconds timeout for this operation
                    );
                } catch (error) {
                    console.log(error.toString());
                }
            }
        } else {
            console.log('Cannot subscribe because not connected to Solace message router.');
        }
    };

    // Unsubscribes from topic on Solace message router
    subscriber.unsubscribe = function () {
        if (subscriber.session !== null) {
            if (subscriber.subscribed) {
                console.log('Unsubscribing from topic: ' + subscriber.topicName);
                try {
                    subscriber.session.unsubscribe(
                        solace.SolclientFactory.createTopicDestination(subscriber.topicName),
                        true, // generate confirmation when subscription is removed successfully
                        subscriber.topicName, // use topic name as correlation key
                        10000 // 10 seconds timeout for this operation
                    );
                } catch (error) {
                    console.log(error.toString());
                }
            } else {
                console.log('Cannot unsubscribe because not subscribed to the topic "'
                    + subscriber.topicName + '"');
            }
        } else {
            console.log('Cannot unsubscribe because not connected to Solace message router.');
        }
    };

    // Gracefully disconnects from Solace message router
    subscriber.disconnect = function () {
        subscriber.connected = false;
        console.log('Disconnecting from Solace message router...');
        if (subscriber.session !== null) {
            try {
                subscriber.session.disconnect();
            } catch (error) {
                console.log(error.toString());
            }
        } else {
            console.log('Not connected to Solace message router.');
        }
    };

    return subscriber;
};
export default TopicSubscriber;
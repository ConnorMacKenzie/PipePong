import solace from 'solclientjs';

const HOSTURL = "ws://mr4b11zr98z.messaging.mymaas.net:80";
const USERNAME = "solace-cloud-client";
const VPN = "msgvpn-4b11zr985";
const PASS = "13hvb0guu1h4c5934o0cjn1rkl";

var TopicPublisher = function (topicName) {
    'use strict';
    var publisher = {};
    publisher.session = null;
    publisher.topicName = topicName;

    // Logger
    // publisher.log = function (line) {
    //     var now = new Date();
    //     var time = [('0' + now.getHours()).slice(-2), ('0' + now.getMinutes()).slice(-2),
    //         ('0' + now.getSeconds()).slice(-2)];
    //     var timestamp = '[' + time.join(':') + '] ';
    //     console.log(timestamp + line);
    //     var logTextArea = document.getElementById('log');
    //     logTextArea.value += timestamp + line + '\n';
    //     logTextArea.scrollTop = logTextArea.scrollHeight;
    // };

    publisher.log('\n*** Publisher to topic "' + publisher.topicName + '" is ready to connect ***');

    // Establishes connection to Solace message router
    publisher.connect = function () {
        // extract params
        if (publisher.session !== null) {
            publisher.log('Already connected and ready to publish messages.');
            return;
        }
        var hosturl = HOSTURL;
        // check for valid protocols
        if (hosturl.lastIndexOf('ws://', 0) !== 0 && hosturl.lastIndexOf('wss://', 0) !== 0 &&
            hosturl.lastIndexOf('http://', 0) !== 0 && hosturl.lastIndexOf('https://', 0) !== 0) {
            publisher.log('Invalid protocol - please use one of ws://, wss://, http://, https://');
            return;
        }
        var username = USERNAME;
        var pass = PASS;
        var vpn = VPN;
        if (!hosturl || !username || !pass || !vpn) {
            publisher.log('Cannot connect: please specify all the Solace message router properties.');
            return;
        }
        publisher.log('Connecting to Solace message router using url: ' + hosturl);
        publisher.log('Client username: ' + username);
        publisher.log('Solace message router VPN name: ' + vpn);
        // create session
        try {
            publisher.session = solace.SolclientFactory.createSession({
                // solace.SessionProperties
                url:      hosturl,
                vpnName:  vpn,
                userName: username,
                password: pass,
            });
        } catch (error) {
            publisher.log(error.toString());
        }
        // define session event listeners
        publisher.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
            publisher.log('=== Successfully connected and ready to publish messages. ===');
        });
        publisher.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
            publisher.log('Connection failed to the message router: ' + sessionEvent.infoStr +
                ' - check correct parameter values and connectivity!');
        });
        publisher.session.on(solace.SessionEventCode.DISCONNECTED, function (sessionEvent) {
            publisher.log('Disconnected.');
            if (publisher.session !== null) {
                publisher.session.dispose();
                publisher.session = null;
            }
        });

        publisher.connectToSolace();   

    };

    // Actually connects the session triggered when the iframe has been loaded - see in html code
    publisher.connectToSolace = function () {
        try {
            publisher.session.connect();
        } catch (error) {
            publisher.log(error.toString());
        }
    };

    // Publishes one message
    publisher.publish = function (messageText) {
        if (publisher.session !== null) {
            var message = solace.SolclientFactory.createMessage();
            message.setDestination(solace.SolclientFactory.createTopicDestination(publisher.topicName));
            message.setBinaryAttachment(messageText);
            message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);
            publisher.log('Publishing message "' + messageText + '" to topic "' + publisher.topicName + '"...');
            try {
                publisher.session.send(message);
                publisher.log('Message published.');
            } catch (error) {
                publisher.log(error.toString());
            }
        } else {
            publisher.log('Cannot publish because not connected to Solace message router.');
        }
    };

    // Gracefully disconnects from Solace message router
    publisher.disconnect = function () {
        publisher.log('Disconnecting from Solace message router...');
        if (publisher.session !== null) {
            try {
                publisher.session.disconnect();
            } catch (error) {
                publisher.log(error.toString());
            }
        } else {
            publisher.log('Not connected to Solace message router.');
        }
    };

    return publisher;
};

export default TopicPublisher;
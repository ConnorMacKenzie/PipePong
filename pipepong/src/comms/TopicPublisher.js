import solace from 'solclientjs';

const HOSTURL = "ws://mr4b11zr98z.messaging.mymaas.net:80";
var USERNAME = "solace-cloud-client";
const VPN = "msgvpn-4b11zr985";
const PASS = "13hvb0guu1h4c5934o0cjn1rkl";

var TopicPublisher = function (topicName) {
    var factoryProps = new solace.SolclientFactoryProperties();
    // factoryProps.profile = solace.SolclientFactoryProfiles.version10;
    solace.SolclientFactory.init(factoryProps);

    var publisher = {};
    publisher.session = null;
    publisher.topicName = topicName;
    publisher.connected = false;

    console.log('\n*** Publisher to topic "' + publisher.topicName + '" is ready to connect ***');

    // Establishes connection to Solace message router
    publisher.connect = function () {
        // extract params
        if (publisher.session !== null) {
            console.log('Already connected and ready to publish messages.');
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
            publisher.session = solace.SolclientFactory.createSession({
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
        publisher.session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
            publisher.connected = true;
            console.log('=== Successfully connected and ready to publish messages. ===');
        });
        publisher.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, function (sessionEvent) {
            publisher.connected = false;
            console.log('Connection failed to the message router: ' + sessionEvent.infoStr +
                ' - check correct parameter values and connectivity!');
        });
        publisher.session.on(solace.SessionEventCode.DISCONNECTED, function (sessionEvent) {
            publisher.connected = false;
            console.log('Disconnected.');
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
            console.log(error.toString());
        }
    };

    // Publishes one message
    publisher.publish = function (messageText) {
        if (publisher.session !== null) {
            var message = solace.SolclientFactory.createMessage();
            message.setDestination(solace.SolclientFactory.createTopicDestination(publisher.topicName));
            message.setBinaryAttachment(messageText);
            message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);
            console.log('Publishing message "' + messageText + '" to topic "' + publisher.topicName + '"...');
            try {
                publisher.session.send(message);
                console.log('Message published.');
            } catch (error) {
                console.log(error.toString());
            }
        } else {
            console.log('Cannot publish because not connected to Solace message router.');
        }
    };

    // Gracefully disconnects from Solace message router
    publisher.disconnect = function () {
        publisher.connected = false;
        console.log('Disconnecting from Solace message router...');
        if (publisher.session !== null) {
            try {
                publisher.session.disconnect();
            } catch (error) {
                console.log(error.toString());
            }
        } else {
            console.log('Not connected to Solace message router.');
        }
    };

    return publisher;
};

export default TopicPublisher;
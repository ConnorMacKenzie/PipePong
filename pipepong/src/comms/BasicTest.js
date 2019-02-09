import TopicPublisher from "./TopicPublisher";
import TopicSubscriber from "./TopicSubscriber";


var publisher = TopicPublisher(test);
var subscriber = TopicSubscriber(test);

publisher.connect
subscriber.connect
publisher.publish("Hello World!");

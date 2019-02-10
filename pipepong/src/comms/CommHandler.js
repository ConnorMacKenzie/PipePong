import TopicPublisher from './TopicPublisher'
import TopicSubscriber from './TopicSubscriber'

class CommHandler {
    constructor(joinHandler, ballHandler, leaveHandler, leaderboardHandler){
        // define all the subscribers
        // var testHandler = function(){
        //     console.log("Test message was sent")
        // }
        // define all the publishers

        // this.testPublisher = TopicPublisher('test');
        this.joinPublisher = TopicPublisher('join');
        this.ballPublisher = TopicPublisher('ball');
        this.leavePublisher = TopicPublisher('leave');
        // this.testSubscriber = TopicSubscriber('test', testHandler);
        this.joinSubscriber = TopicSubscriber('join', joinHandler);
        this.ballSubscriber = TopicSubscriber('ball', ballHandler);
        this.leaveSubscriber = TopicSubscriber('leave', leaveHandler);
        this.leaderboardSubscriber = TopicSubscriber('leaderboard', leaderboardHandler);
    }

    connect = function(){
        // connect all the publishers to the communication channel
        // this.testPublisher.connect();
        this.joinPublisher.connect();
        this.ballPublisher.connect();
        this.leavePublisher.connect();

        // connect all the subscribers to the communication channel
        // this.testSubscriber.connect();
        this.joinSubscriber.connect();
        this.ballSubscriber.connect();
        this.leaveSubscriber.connect();
        this.leaderboardSubscriber.connect();
    }

    publishJoin = function(sessionId, name, color){
        var message = {
            sessionId: sessionId,
            name: name,
            color: color
        }
        this.joinPublisher.publish(JSON.stringify(message));
    }
    publishBall = function(sessionId, targetSessionId, angle, velocity){
        var message = {
            sessionId: sessionId,
            targetSessionId: targetSessionId,
            angle: angle,
            velocity: velocity
        }
        this.ballPublisher.publish(JSON.stringify(message));
    }
    publishLeave = function(sessionId, reason, killedBy){
        var message = {
            sessionId: sessionId,
            reason: reason,
            killedBy: killedBy
        }
        this.leavePublisher.publish(JSON.stringify(message));
    }
    publishTest = function(item){
        var message = {
            item: item
        }
        this.testPublisher.publish(JSON.stringify(message));
    }
}

export default CommHandler;
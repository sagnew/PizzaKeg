var twilio = require('twilio');
var client = new twilio.RestClient('AC9a185252ea97841e6812a5f414d56c9f', '08b1eaf92fd66749470c93088253c7b4');

var sendText = function(number, text, callback) {
    client.sms.messages.create({
        to: number,
        from: '+14046203337',
        body: text
    }, function(error, message) {
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);

            console.log('Message sent on:');
            console.log(message.dateCreated);
            callback(null);
        } else {
            console.log('Oops! There was an error.');
            console.log(error);
            callback(error);
        }
    });
};

module.exports = sendText;

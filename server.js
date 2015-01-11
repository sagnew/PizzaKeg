var twilio = require('twilio'),
    express = require('express'),
    orderPizza = require('orderpizza'),
    sendText = require('sendText');

var app = express();

var textResponse = function(request, response) {
    console.log('got here');
    if (twilio.validateExpressRequest(request, '08b1eaf92fd66749470c93088253c7b4', { url: 'http://samshreds.com:7890/text' })) {
        response.header('Content-Type', 'text/xml');
        var body = request.param('Body').trim();
        var from = request.param('From');
        console.log(body);
        response.send('<Response><Sms>LOL.</Sms></Response>');
    } else {
        response.statusCode = 403;
        response.render('forbidden');
    }
};

app.get('/text', textResponse);

app.listen('7890', function() {
    console.log('Visit http://localhost:7890/ in your browser to see your TwiML document!');
});

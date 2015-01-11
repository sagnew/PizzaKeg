var twilio = require('twilio'),
    express = require('express'),
    orderPizza = require('./orderpizza'),
    kegapi = require('./kegapi'),
    sendText = require('./sendText');

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

setInterval(function() {
    kegapi.getDrinks(function(volume) {
        if(volume > 0) {
            sendText('+16107616189', 'I noticed you have been drinking from the keg a lot! Do you want some pizza?.', function() {});
            orderPizza();
        }
    });
}, 60000);

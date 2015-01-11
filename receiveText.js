var twilio = require('twilio'),
    express = require('express');

var app = express();

app.get('/', function(req, res) {
    console.log('fuckkkk');
    res.send('lolol');
});

app.listen('7890', function() {
    console.log('Visit http://localhost:7890/ in your browser to see your TwiML document!');
});

var textResponse = function(request, response) {
    console.log('got here');
    if (twilio.validateExpressRequest(request, config.twilio.key, {
            url: config.twilio.smsWebhook
        }) || config.disableTwilioSigCheck) {
        response.header('Content-Type', 'text/xml');
        var body = request.param('Body').trim();
        var from = request.param('From');
        response.send('<Response><Sms>LOL.</Sms></Response>');
    } else {
        response.statusCode = 403;
        response.render('forbidden');
    }
};

var request = require('request');
var moment = require('moment');

function getDrinks() {
  request('http://104.131.47.86:8000/api/drinks', function (error, response, body) {
    var json = JSON.parse(body);
    checkRecentDrinks(json.objects);
  });
}

function checkRecentDrinks(drinks) {
  var currentTime = moment();
  for(var i = 0; i < drinks.length; i++){
    console.log(currentTime.diff(drinks[i].time, 'minutes'));
  } 
}

var request = require('request');
var moment = require('moment');

function getDrinks(callback) {
  request('http://104.131.47.86:8000/api/drinks', function (error, response, body) {
    var json = JSON.parse(body);
    callback = (typeof callback === 'function') ? callback : function() {};
    callback(json.objects);
  });
}

function checkRecentDrinks(drinks, callback) {
  var currentTime = moment();
  for(var i = 0; i < drinks.length; i++) {
    console.log(currentTime.diff(drinks[i].time, 'minutes'));
  } 
  callback = (typeof callback === 'function') ? callback : function() {};
  callback();
}

function addDrinkVolumes(drinks, callback) {
  var volume = 0;
  for(var i = 0; i < drinks.length; i++) {
    volume = volume + drinks[i].volume_ml;
  }
  console.log(volume);
  callback = (typeof callback === 'function') ? callback : function() {};
  callback(volume);
}

getDrinks(addDrinkVolumes);

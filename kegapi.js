var request = require('request');
var moment = require('moment');

//gets all the drinks from the kegbot server
function getDrinks(callback) {
  request('http://104.131.47.86:8000/api/drinks', function (error, response, body) {
    if(!error) {
      var json = JSON.parse(body);
      callback = (typeof callback === 'function') ? callback : function() {};
      filterRecentDrinks(json.objects, callback); 
    }
  });
}

//filters out drinks older than 30 minutes
function filterRecentDrinks(drinks, callback) {
  var currentTime = moment();
  var recentDrinks = [];
  for(var i = 0; i < drinks.length; i++) {
    var timeDiff = currentTime.diff(drinks[i].time, 'seconds');
    if(timeDiff < 60) {
      recentDrinks.push(drinks[i]);
    }
  } 
  callback = (typeof callback === 'function') ? callback : function() {};
  addDrinkVolumes(recentDrinks, callback);
}

//add the volume of the drinks in ml
function addDrinkVolumes(drinks, callback) {
  var volume = 0;
  for(var i = 0; i < drinks.length; i++) {
    volume = volume + drinks[i].volume_ml;
  }
  callback = (typeof callback === 'function') ? callback : function() {};
  callback(volume);
}

module.exports = { 
  getDrinks: getDrinks,
  filterRecentDrinks: filterRecentDrinks,
  addDrinkVolume: addDrinkVolumes
};

var $ = require('jquery');
var baseUrl = 'http://swapi.co/api/';
var githubtoken = require('./githubtoken.js').token;

if(typeof(githubtoken) !== "undfined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken,
    }
  });
}

$('.js-planets-button').click(function(){
  fetchPlanets();
});

function fetchPlanets(){
  var planetsUrl = baseUrl + 'planets/';

  $.ajax(planetsUrl).done(function(planetsList){
    planetsList.results.forEach(function(planet){
      $('.js-planets-list').append('<li id="' + planet.name + '">' + planet.name + '</li>');

      $.ajax(planet.url).done(function(planet){
        $('#' + planet.name).append('<span> :: ' + planet.climate + '</span>');
      });
    });
  });
}

var tokens = require('./tokens')
var YelpJS = require('yelp');

var yelp = new YelpJS(tokens.yelpData);

// See http://www.yelp.com/developers/documentation/v2/search_api

exports.search = function(termSearch, locationSearch, callback) {
		yelp.search({ term: termSearch, location: locationSearch, sort: 0 })
		.then(function (data) {
		  callback(data);
		})
		.catch(function (err) {
		  console.error(err);
		});
	}
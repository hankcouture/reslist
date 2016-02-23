var tokens = require('./tokens')
var foursquare = require('node-foursquare-venues')(tokens.foursquareData.client_ID, tokens.foursquareData.client_Secret)

exports.search = function(searchValue, city, callback) {
		foursquare.venues.explore({ query: searchValue, near: city }, callback)
	}

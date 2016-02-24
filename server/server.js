var http = require("http");
var fs = require('fs');
var express = require('express');
var yelp = require('./yelp');
var foursquare = require('./foursquare');
var helpers = require('./helpers');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('client'));

app.post('/', function(req, res) {
	res.setHeader('Content-Type', "application/json");
	req.on('data', function (data) {
        dataParsed = JSON.parse(data);
        console.log(dataParsed);
        yelp.search(dataParsed.term, 'Chicago, IL', function(yData){
        	foursquare.search(dataParsed.term, 'Chicago, IL', function(err, fData) {
	        	var yList = []
				var yelpData = yData.businesses;
				for (var i = 0; i < yelpData.length; i++) {
					var categoriesArray = [];
					for (var c = 0; c < yelpData[i].categories.length; c++) {
						categoriesArray.push(yelpData[i].categories[c])
					}
					var result = {
						name: yelpData[i].name,
						rating: yelpData[i].rating.toFixed(1),
						address: yelpData[i].location.display_address[0],
						phone: yelpData[i].phone,
						reviewCount: yelpData[i].review_count,
						image: yelpData[i].image_url,
						coordinates: yelpData[i].location.coordinate,
						url: yelpData[i].url,
						categories: categoriesArray,
						verified: !yelpData[i].is_closed,
						added: false
					}
					yList.push(result);
				}
				var fList = []
				var foursquareData = fData.response.groups[0].items;
				for (var x = 0; x < foursquareData.length; x++) {
					var result = {
						name: foursquareData[x].venue.name,
						rating: foursquareData[x].venue.rating,
						address: foursquareData[x].venue.location.address,
						city: foursquareData[x].venue.location.city,
						state: foursquareData[x].venue.location.state,
						phone: foursquareData[x].venue.contact.phone,
						reviewCount: foursquareData[x].venue.ratingSignals,
						url: 'https://foursquare.com/v/' + foursquareData[x].venue.id,
						verified: foursquareData[x].venue.verified,
						added: false
					}
					fList.push(result);
				}

				var finalList = []
				var check = {};

				yList.forEach(function(y) {
					fList.forEach(function(f) {
						var match = false;
						if (y.address === f.address) {
							if ((helpers.similar_text(y.name, f.name, true)) > 50) {
								match = true;
							}
						}
						if (y.phone !== undefined && (y.phone === f.phone)) {
							if ((helpers.similar_text(y.name, f.name, true)) > 50) {
								match = true;
							}
						}
						if (check[y.name] && match) {
							var arrLoc = check[y.name]-1;
							var arrVal = helpers.similar_text(finalList[arrLoc].y.name, finalList[arrLoc].f.name, true);
							var newVal = helpers.similar_text(y.name, f.name, true);
							if (newVal > arrVal) {
								finalList[arrLoc] = { y: y, f: f };
								check[y.name] = finalList.length;
							} else if ((helpers.similar_text(y.name, f.name, true) > 95) && match) {
								finalList.push({ y: y, f: f });
							}
						} else if (match) {
							finalList.push({ y: y, f: f });
							check[y.name] = finalList.length;
						}
					})
				})

	        	var results = {
	        		results: finalList,
	        		yelp: yList,
	        		foursquare: fList
	        	};


				res.end(JSON.stringify(results));
        	})
        });
    });
})

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});
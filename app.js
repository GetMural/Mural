//Definitions
var express = require('express');
var cons = require('consolidate');
var app = express();
var expressLess = require('express-less');
var logger = require('logger').createLogger();
var fs = require('fs');
var watch = require('node-watch');
var reload = require('reload');
var data = JSON.parse(fs.readFileSync('data/storyboard.json'));

// Set Mustache as the Template Engine
app.engine('html', cons.mustache);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up Static Files
app.use('/', express.static('assets'));

// Set up LESS
app.use('/css', expressLess(__dirname + '/assets/less', { compress: true }));

// Storyteller View
app.get('/', function (req, res){
	res.render('index', {
		meta: data["meta"],
		items: data["items"],
		partials : {
			body: 'partials/body',
			fb: 'partials/fb',
			head: 'partials/head',
			header: 'partials/header',
			imagebackground: 'partials/imagebackground',
			imageparallax: 'partials/imageparallax',
			intro: 'partials/intro',
			loader: 'partials/loader',
			textcentered: 'partials/textcentered',
			title: 'partials/title',
			slideshowhorizontal: 'partials/slideshowhorizontal',
			slideshowvertical: 'partials/slideshowvertical',
			snippets: 'partials/snippets',
			social: 'partials/social',
			subdataposterloadingimage: 'partials/subdataposterloadingimage',
			subvideosource: 'partials/subvideosource',
			videobackground: 'partials/videobackground',
			videofullpage: 'partials/videofullpage'
		}
	});
});

// All Errors Except for 404 Page.
app.use(function(err, req, res, next){
	var requestedURL = 'http://0.0.0.0:8000';
	console.error(err.stack);
	console.log(err.stack + '  URL: ' + requestedURL);
	res.render('error', {title: err.stack});
});

// 404 Error Page. MUST BE LAST (except for server).
app.use(function(req, res, next){
	var requestedURL = 'http://0.0.0.0:8000';
	console.log('Error: 404 - ' + requestedURL );
	res.render('error', {title: '404'});
});

// Set the Server Up
var server = app.listen(8000, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('App is listening at http://0.0.0.0:8000');
});

// Hot Reload the Preview
watch('data', function(filename) {
	console.log(filename, ' changed, reloading.');
	delete require.cache;
	reload(server, app);
});

// Definitions
var express 				= require('express');
var app 						= express();
var bodyParser 			= require('body-parser');
var cons 						= require('consolidate');
var fs 							= require('fs');
var gulp						= require('gulp');
var JSONFormatter		= require('json-fmt');
var reload 					= require('reload');
var watch 					= require('node-watch');
var _ 							= require('lodash');

// Set Mustache as the Template Engine
app.engine('html', cons.hogan);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up Static Files
app.use('/', express.static('assets'));

// Set up node_modules
app.use('/tools', express.static('node_modules'));

// Set up the data API
app.get('/data', function (req, res) {
   fs.readFile( "./data/storyboard.json", 'utf8', function (err, data) {
		 var fmt = new JSONFormatter(JSONFormatter.PRETTY);
				 fmt.append( data );
				 res.end( fmt.flush() );
   });
});

app.get('/data/meta', function (req, res) {
   fs.readFile( "./data/storyboard.json", 'utf8', function (err, data) {
		 data = JSON.parse(data);
		 data = data.meta;
		 data = JSON.stringify(data);
		 var fmt = new JSONFormatter(JSONFormatter.PRETTY);
				 fmt.append( data );
				 res.end( fmt.flush() );
   });
});

app.get('/data/items', function (req, res) {
	fs.readFile( "./data/storyboard.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		data = data.items;
		data = JSON.stringify(data);
		var fmt = new JSONFormatter(JSONFormatter.PRETTY);
				fmt.append( data );
				res.end( fmt.flush() );
	});
});

app.get('/data/items/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
			q_id = query.params.id;
			fs.readFile( "./data/storyboard.json", 'utf8', function (err, data) {
				data = JSON.parse(data);
				data = data.items;
				length = data.length;
				if (q_id > length || q_id < 1) {
					res.end( JSON.stringify({}) );
				} else {
					_.each( data, function (object) {
						_.each( object, function (value) {
							var id = value.id;
							if (q_id == id) {
								var result = JSON.stringify(value);
								if (result) {
									var fmt = new JSONFormatter(JSONFormatter.PRETTY);
											fmt.append( result );
											res.end( fmt.flush() );
								}
							}
						});
					});
				}
			});
		} else {
			res.end( JSON.stringify({}) );
	}
});

// Home View
app.get('/', function (req, res){
	res.render('index', {
		partials: {
			index: 'index'
		}
	});
});

// Editor Views

// Main Editor View
app.get('/editor', function (req, res){
	res.render('editor/editor', {
		meta: JSONdata['meta'],
		items: JSONdata['items'],
		partials: {
			editor: 'editor',
			editornav: 'fragments/editornav'
		}
	});
});

// Editor Fragments

// Form Controls Fragment
app.get('/editor/fragment/formcontrols', function(req, res){
	res.render('editor/fragments/formcontrols', {
		partials: {
			formcontrols: 'formcontrols'
		}
	});
});

// Fullpage Toggle Fragment
app.get('/editor/fragment/fullpage', function(req, res){
	res.render('editor/fragments/fullpage', {
		partials: {
			fullpage: 'fullpage'
		}
	});
});

// Image Fragment
app.get('/editor/fragment/image', function(req, res){
	res.render('editor/fragments/image', {
		partials: {
			image: 'image'
		}
	});
});

// Image Sources Fragment
app.get('/editor/fragment/imagesources', function(req, res){
	res.render('editor/fragments/imagesources', {
		partials: {
			imagesources: 'imagesources'
		}
	});
});

// Inline Toggle Fragment
app.get('/editor/fragment/inline', function(req, res){
	res.render('editor/fragments/inline', {
		partials: {
			inline: 'inline'
		}
	});
});

// Intro Fragment
app.get('/editor/fragment/intro', function(req, res){
	res.render('editor/fragments/intro', {
		partials: {
			intro: 'intro'
		}
	});
});

// Loading Image Fragment
app.get('/editor/fragment/loadingimage', function(req, res){
	res.render('editor/fragments/loadingimage', {
		partials: {
			loadingimage: 'loadingimage'
		}
	});
});

// Slide Fragment
app.get('/editor/fragment/slide', function(req, res){
	res.render('editor/fragments/slide', {
		partials: {
			slide: 'slide',
			image: 'image',
			title: 'title'
		}
	});
});

// Snippet Image Fragment
app.get('/editor/fragment/snippetimage', function(req, res){
	res.render('editor/fragments/snippetimage', {
		partials: {
			image: 'image',
			title: 'title'
		}
	});
});

// Snippet Text Fragment
app.get('/editor/fragment/snippettext', function(req, res){
	res.render('editor/fragments/snippettext', {
		partials: {
			richtext: 'richtext'
		}
	});
});

// Subtitle Fragment
app.get('/editor/fragment/subtitle', function(req, res){
	res.render('editor/fragments/subtitle', {
		partials: {
			subtitle: 'subtitle'
		}
	});
});

// Text Fragment
app.get('/editor/fragment/text', function(req, res){
	res.render('editor/fragments/text', {
		partials: {
			text: 'text'
		}
	});
});

// Rich Text Fragment
app.get('/editor/fragment/richtext', function(req, res){
	res.render('editor/fragments/richtext', {
		partials: {
			richtext: 'richtext'
		}
	});
});

// Title Fragment
app.get('/editor/fragment/title', function(req, res){
	res.render('editor/fragments/title', {
		partials: {
			title: 'title'
		}
	});
});

// Video Sources Fragment
app.get('/editor/fragment/videosources', function(req, res){
	res.render('editor/fragments/videosources', {
		partials: {
			videosources: 'videosources'
		}
	});
});

// Editor Components (composed fragments)

// Meta Info Page
app.get('/editor/page/meta', function(req, res){
	res.render('editor/pages/meta', {
		partials: {
			title: '../fragments/title',
			formcontrols: '../fragments/formcontrols'
		}
	});
});

// Textcentred Page
app.get('/editor/page/textcentred', function(req, res){
	res.render('editor/pages/textcentred', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			intro: '../fragments/intro',
			snippetimage: '../fragments/snippetimage',
			snippettext: '../fragments/snippettext',
			subtitle: '../fragments/subtitle',
			title: '../fragments/title'
		}
	});
});

// Imagebackground Page
app.get('/editor/page/imagebackground', function(req, res){
	res.render('editor/pages/imagebackground', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			imagesources: '../fragments/imagesources',
			text: '../fragments/text',
			title: '../fragments/title',
			subtitle: '../fragments/subtitle'
		}
	});
});

// Slideshow Horizontal Page
app.get('/editor/page/slideshowhorizontal', function(req, res){
	res.render('editor/pages/slideshowhorizontal', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			inline: '../fragments/inline',
			text: '../fragments/text',
			slide: '../fragments/slide',
			title: '../fragments/title'
		}
	});
});

// Videobackground Page
app.get('/editor/page/videobackground', function(req, res){
	res.render('editor/pages/videobackground', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			loadingimage: '../fragments/loadingimage',
			title: '../fragments/title',
			subtitle: '../fragments/subtitle',
			videobackground: 'videobackground',
			videosources: '../fragments/videosources'
		}
	});
});

// Videofullpage Page
app.get('/editor/page/videofullpage', function(req, res){
	res.render('editor/pages/videofullpage', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			loadingimage: '../fragments/loadingimage',
			text: '../fragments/text',
			title: '../fragments/title',
			videosources: '../fragments/videosources'
		}
	});
});

// Preview View
app.get('/preview', function (req, res){
	res.render('preview', {
		meta: JSONdata['meta'],
		items: JSONdata['items'],
		partials : {
			body: 'partials/body',
			fb: 'partials/fb',
			head: 'partials/head',
			header: 'partials/header',
			imagebackground: 'partials/imagebackground',
			imageparallax: 'partials/imageparallax',
			intro: 'partials/intro',
			loader: 'partials/loader',
			textcentered: 'partials/textcentred',
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

// Public View
app.get('/public', function (req, res){
	res.render('../public/index.html');
});

app.listen(8000, function () {
  console.log('Server is running. Point your browser to: http://localhost:8000');
});

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	// get the form request
	data = req.body;

	// json stringify the data
	res.send(JSON.stringify({
		data: data
	}));

	// write the prettified data
	fs.writeFile('data/storyboard.json', JSON.stringify(data), function( err ) {
		if (err) {
			return console.log( err );
		}
		console.log('Data captured');
	});

});

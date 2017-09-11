// Definitions
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cons = require('consolidate');
var fs = require('fs');
var JSONFormatter = require('json-fmt');
const path = require('path');
// var reload = require('reload');
// var watch = require('node-watch');
var _ = require('lodash');

// Set Mustache as the Template Engine
app.engine('html', cons.hogan);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// Set up Static Files
app.use('/', express.static('assets'));

// Set up node_modules
app.use('/tools', express.static('node_modules'));

// Set up the data API
var data = './data/storyboard.json';
// var data = ''; // this will be populated from the initial load screen
var meta = {};
var items = {};

// get the meta and items objects
fs.readFile(data, 'utf8', function (err, data) {
	if (!err) {
		meta = JSON.parse(data).meta;
		items = JSON.parse(data).items;
	}
});

// GET
app.get('/data/get', function (req, res) {
	fs.readFile(data, 'utf8', function (err, data) {
		if (!err) {
			var fmt = new JSONFormatter(JSONFormatter.PRETTY);
			fmt.append(data);
			res.setHeader('Content-Type', 'application/json');
			res.end(fmt.flush());
		} else {
			console.log(err);
		}
	});
});

app.get('/data/get/meta', function (req, res) {
	fs.readFile(data, 'utf8', function (err, data) {
		if (!err) {
			data = JSON.parse(data);
			data = data.meta;
			data = JSON.stringify(data);
			var fmt = new JSONFormatter(JSONFormatter.PRETTY);
			fmt.append(data);
			res.setHeader('Content-Type', 'application/json');
			res.end(fmt.flush());
		} else {
			console.log(err);
		}
	});
});

app.get('/data/get/items', function (req, res) {
	fs.readFile(data, 'utf8', function (err, data) {
		if (!err) {
			data = JSON.parse(data);
			items = data.items;
			items = JSON.stringify(items);
			var fmt = new JSONFormatter(JSONFormatter.PRETTY);
			fmt.append(items);
			res.setHeader('Content-Type', 'application/json');
			res.end(fmt.flush());
		} else {
			console.log(err);
		}
	});
});

app.get('/data/get/item/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var reg = /^\d+$/;
		if (reg.test(qId)) {
			fs.readFile(data, 'utf8', function (err, data) {
				if (!err) {
					data = JSON.parse(data);
					data = data.items;
					var length = data.length;
					if (qId >= length || qId < 0) {
						res.setHeader('Content-Type', 'application/json');
						res.end(JSON.stringify({}));
					} else {
						_.each(data, function (object, i) {
							var id = i;
							_.each(object, function (value) {
								if (parseInt(qId) === id) {
									var result = JSON.stringify(value);
									if (result) {
										var fmt = new JSONFormatter(JSONFormatter.PRETTY);
										fmt.append(result);
										res.setHeader('Content-Type', 'application/json');
										res.end(fmt.flush());
									}
								}
							});
						});
					}
				} else {
					console.log(err);
				}
			});
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({}));
		}
	} else {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({}));
	}
});

// PATCH
app.patch('/data/patch/meta', function (req, res) {
	// var newData = req.;
	console.log(req);
	fs.readFile(data, 'utf8', function (err, data) {
		if (!err) {
			data = JSON.parse(data);
			data = data.meta;
			data = JSON.stringify(data);
			res.setHeader('Content-Type', 'application/json');
			res.end();
		} else {
			console.log(err);
		}
	});
});

// PUT
app.put('/data/put/meta', function (req, res) {
	res.end({});
});

// Home View
app.get('/', function (req, res) {
	res.render('index', {
		partials: {
			index: 'index'
		}
	});
});

// Editor Views

// Main Editor View
app.get('/editor', function (req, res) {
	res.render('editor/editor', {
		meta: meta,
		items: items,
		editor: 'editor',
		partials: {
			editornav: 'fragments/editornav'
		}
	});
});

// Editor Fragments
app.get('/editor/fragment/editornav', function (req, res) {
	res.render('editor/fragments/editornav', {
		editornav: 'editornav'
	});
});

// Credits Fragment
app.get('/editor/fragment/credits', function (req, res) {
	res.render('editor/fragments/credits', {
		credits: 'credits'
	});
});

// Form Controls Fragment
app.get('/editor/fragment/formcontrols', function (req, res) {
	res.render('editor/fragments/formcontrols', {
		formcontrols: 'formcontrols'
	});
});

// Fullpage Toggle Fragment
app.get('/editor/fragment/fullpage', function (req, res) {
	res.render('editor/fragments/fullpage', {
		fullpage: 'fullpage'
	});
});

// Image Fragment
app.get('/editor/fragment/image', function (req, res) {
	res.render('editor/fragments/image', {
		image: 'image'
	});
});

// Image Sources Fragment
app.get('/editor/fragment/imagesources', function (req, res) {
	res.render('editor/fragments/imagesources', {
		imagesources: 'imagesources'
	});
});

// Inline Toggle Fragment
app.get('/editor/fragment/inline', function (req, res) {
	res.render('editor/fragments/inline', {
		inline: 'inline'
	});
});

// Intro Fragment
app.get('/editor/fragment/intro', function (req, res) {
	res.render('editor/fragments/intro', {
		intro: 'intro'
	});
});

// Loading Image Fragment
app.get('/editor/fragment/loadingimage', function (req, res) {
	res.render('editor/fragments/loadingimage', {
		loadingimage: 'loadingimage'
	});
});

// Slide Fragment
app.get('/editor/fragment/slide', function (req, res) {
	res.render('editor/fragments/slide', {
		partials: {
			image: 'image',
			title: 'title'
		}
	});
});

// Snippet Image Fragment
app.get('/editor/fragment/snippetimage', function (req, res) {
	res.render('editor/fragments/snippetimage', {
		partials: {
			image: 'image',
			title: 'title'
		}
	});
});

// Snippet Text Fragment
app.get('/editor/fragment/snippettext', function (req, res) {
	res.render('editor/fragments/snippettext', {
		partials: {
			richtext: 'richtext'
		}
	});
});

// Subtitle Fragment
app.get('/editor/fragment/subtitle', function (req, res) {
	res.render('editor/fragments/subtitle', {
		subtitle: 'subtitle'
	});
});

// Text Fragment
app.get('/editor/fragment/plaintext', function (req, res) {
	res.render('editor/fragments/plaintext', {
		paintext: 'plaintext'
	});
});

// Rich Text Fragment
app.get('/editor/fragment/richtext', function (req, res) {
	res.render('editor/fragments/richtext', {
		richtext: 'richtext'
	});
});

// Title Fragment
app.get('/editor/fragment/title', function (req, res) {
	res.render('editor/fragments/title', {
		title: 'title'
	});
});

// Video Sources Fragment
app.get('/editor/fragment/videosources', function (req, res) {
	res.render('editor/fragments/videosources', {
		videosources: 'videosources'
	});
});

// Editor Components (composed fragments);

// Meta Info Page
app.get('/editor/page/meta', function (req, res) {
	res.render('editor/pages/meta', {
		meta: meta,
		partials: {
			title: '../fragments/title',
			formcontrols: '../fragments/formcontrols'
		}
	});
});

// Textcentred Page
app.get('/editor/page/textcentred', function (req, res) {
	res.render('editor/pages/textcentred', {
		partials: {
			credits: '../fragments/credits',
			formcontrols: '../fragments/formcontrols',
			image: '../fragments/image',
			intro: '../fragments/intro',
			richtext: '../fragments/richtext',
			snippetimage: '../fragments/snippetimage',
			snippettext: '../fragments/snippettext',
			subtitle: '../fragments/subtitle',
			title: '../fragments/title'
		}
	});
});

// Textcentred Page with ID
app.get('/editor/page/textcentred/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var item = items[qId].textcentred;
	};
	res.render('editor/pages/textcentred', {
		item: item,
		partials: {
			credits: '../fragments/credits',
			formcontrols: '../fragments/formcontrols',
			image: '../fragments/image',
			intro: '../fragments/intro',
			richtext: '../fragments/richtext',
			snippetimage: '../fragments/snippetimage',
			snippettext: '../fragments/snippettext',
			subtitle: '../fragments/subtitle',
			title: '../fragments/title'
		}
	});
});

// Imagebackground Page
app.get('/editor/page/imagebackground', function (req, res) {
	res.render('editor/pages/imagebackground', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			imagesources: '../fragments/imagesources',
			text: '../fragments/plaintext',
			title: '../fragments/title',
			subtitle: '../fragments/subtitle'
		}
	});
});

// Imagebackground Page with ID
app.get('/editor/page/imagebackground/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var item = items[qId].imagebackground;
	};
	res.render('editor/pages/imagebackground', {
		item: item,
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			imagesources: '../fragments/imagesources',
			text: '../fragments/plaintext',
			title: '../fragments/title',
			subtitle: '../fragments/subtitle'
		}
	});
});

// Slideshow Horizontal Page
app.get('/editor/page/slideshowhorizontal', function (req, res) {
	res.render('editor/pages/slideshowhorizontal', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			credits: '../fragments/credits',
			image: '../fragments/image',
			inline: '../fragments/inline',
			plaintext: '../fragments/plaintext',
			slide: '../fragments/slide',
			title: '../fragments/title'
		}
	});
});

// Slideshow Horizontal Page with ID
app.get('/editor/page/slideshowhorizontal/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var item = items[qId].slideshowhorizontal;
	};
	res.render('editor/pages/slideshowhorizontal', {
		item: item,
		partials: {
			credits: '../fragments/credits',
			formcontrols: '../fragments/formcontrols',
			image: '../fragments/image',
			inline: '../fragments/inline',
			plaintext: '../fragments/plaintext',
			slide: '../fragments/slide',
			title: '../fragments/title'
		}
	});
});

// Slideshow Vertical Page
app.get('/editor/page/slideshowvertical', function (req, res) {
	res.render('editor/pages/slideshowvertical', {
		partials: {
			credits: '../fragments/credits',
			formcontrols: '../fragments/formcontrols',
			imagesources: '../fragments/imagesources',
			title: '../fragments/title'
		}
	});
});

// Slideshow Vertical Page with ID
app.get('/editor/page/slideshowvertical/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var item = items[qId].slideshowvertical;
	};
	res.render('editor/pages/slideshowvertical', {
		item: item,
		partials: {
			credits: '../fragments/credits',
			formcontrols: '../fragments/formcontrols',
			imagesources: '../fragments/imagesources',
			title: '../fragments/title'
		}
	});
});

// Videobackground Page
app.get('/editor/page/videobackground', function (req, res) {
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

// Videobackground Page with ID
app.get('/editor/page/videobackground/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var item = items[qId].videobackground;
	};
	res.render('editor/pages/videobackground', {
		item: item,
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
app.get('/editor/page/videofullpage', function (req, res) {
	res.render('editor/pages/videofullpage', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			loadingimage: '../fragments/loadingimage',
			text: '../fragments/plaintext',
			title: '../fragments/title',
			videosources: '../fragments/videosources'
		}
	});
});

// Videofullpage Page with ID
app.get('/editor/page/videofullpage/id/:id', function (req, res) {
	var query = req || {};
	if (query.params && query.params.id) {
		var qId = query.params.id;
		var item = items[qId].videofullpage;
	};
	res.render('editor/pages/videofullpage', {
		item: item,
		partials: {
			formcontrols: '../fragments/formcontrols',
			fullpage: '../fragments/fullpage',
			loadingimage: '../fragments/loadingimage',
			text: '../fragments/plaintext',
			title: '../fragments/title',
			videosources: '../fragments/videosources'
		}
	});
});

// Preview View
app.get('/preview', function (req, res) {
	res.render('preview', {
		data: data,
		meta: data.meta,
		items: data.items,
		partials: {
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
app.get('/public', function (req, res) {
	res.render('../public/index.html');
});

app.listen(8000, function () {
	console.log('Server is running. Point your browser to: http://localhost:8000');
});

//	support parsing of application/json type post data
app.use(bodyParser.json());

//	support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	// get the form request
	var data = req.body;

	// json stringify the data
	res.send(JSON.stringify({
		data: data
	})
);

	// write the prettified data
	fs.writeFile('data/storyboard.json', JSON.stringify(data), function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('Data captured');
	});
});

var express = require('express');
var router = express.Router();
var fs = require('fs');

// TODO: refactor this to a storyboard model
// Set up the data API
var filename = './data/storyboard.json';
var meta = {};
var items = {};

readFile = function() {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (!err) {
            meta = JSON.parse(data).meta;
            items = JSON.parse(data).items;
        }
    });
};

writeFile = function(data) {
    fs.writeFile(filename, data, function(err) {
        if (err) {
            return console.log(err);
        }
    });
};

readFile();

// Main Editor View
router.get('/', function (req, res, next) {
    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: '',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Editor Fragments
router.get('/fragment/editornav', function (req, res, next) {
    res.render('editor/fragments/editornav', {
        editornav: 'editornav'
    });
});

// Credits Fragment
router.get('/fragment/credits', function (req, res) {
    res.render('editor/fragments/credits', {
        credits: 'credits'
    });
});

// Form Controls Fragment
router.get('/fragment/formcontrols', function (req, res) {
    res.render('editor/fragments/formcontrols', {
        formcontrols: 'formcontrols'
    });
});

// Fullpage Toggle Fragment
router.get('/fragment/fullpage', function (req, res) {
    res.render('editor/fragments/fullpage', {
        fullpage: 'fullpage'
    });
});

// Horizontal Slide Fragment
router.get('/fragment/horizontalslide', function (req, res) {
    res.render('editor/fragments/horizontalslide', {
        partials: {
            image: 'image',
            credits: 'credits',
            title: 'title'
        }
    });
});

// Image Fragment
router.get('/fragment/image', function (req, res) {
    res.render('editor/fragments/image', {
        image: 'image'
    });
});

// Image Sources Fragment
router.get('/fragment/imagesources', function (req, res) {
    res.render('editor/fragments/imagesources', {
        imagesources: 'imagesources'
    });
});

// Inline Toggle Fragment
router.get('/fragment/inline', function (req, res) {
    res.render('editor/fragments/inline', {
        inline: 'inline'
    });
});

// Intro Fragment
router.get('/fragment/intro', function (req, res) {
    res.render('editor/fragments/intro', {
        intro: 'intro'
    });
});

// Loading Image Fragment
router.get('/fragment/loadingimage', function (req, res) {
    res.render('editor/fragments/loadingimage', {
        loadingimage: 'loadingimage'
    });
});

// Text Fragment
router.get('/fragment/plaintext', function (req, res) {
    res.render('editor/fragments/plaintext', {
        paintext: 'plaintext'
    });
});

// Rich Text Fragment
router.get('/fragment/richtext', function (req, res) {
    res.render('editor/fragments/richtext', {
        richtext: 'richtext'
    });
});

// Vertical Slide Fragment
router.get('/fragment/verticalslide', function (req, res) {
    res.render('editor/fragments/verticalslide', {
        partials: {
            credits: 'credits',
            imagesources: 'imagesources',
            title: 'title'
        }
    });
});

// Snippet Image Fragment
router.get('/fragment/snippetimage', function (req, res) {
    res.render('editor/fragments/snippetimage', {
        partials: {
            credits: 'credits',
            image: 'image',
            title: 'title'
        }
    });
});

// Snippet Text Fragment
router.get('/fragment/snippettext', function (req, res) {
    res.render('editor/fragments/snippettext', {
        partials: {
            richtext: 'richtext'
        }
    });
});

// Subtitle Fragment
router.get('/fragment/subtitle', function (req, res) {
    res.render('editor/fragments/subtitle', {
        subtitle: 'subtitle'
    });
});

// Title Fragment
router.get('/fragment/title', function (req, res) {
    res.render('editor/fragments/title', {
        title: 'title'
    });
});

// Video Sources Fragment
router.get('/fragment/videosources', function (req, res) {
    res.render('editor/fragments/videosources', {
        videosources: 'videosources'
    });
});

// Editor Components (composed fragments);

// Meta Info Page
router.get('/page/meta', function (req, res) {
    res.render('editor/pages/meta', {
        meta: meta,
        partials: {
            title: 'editor/fragments/title',
            formcontrols: 'editor/fragments/formcontrols'
        }
    });
});
router.post('/page/meta', function (req, res) {
    var newMeta = req.body;

    console.log('META', meta);
    console.log('NEW META', newMeta);

    meta['title'] = newMeta['title'];
    meta['site_name'] = newMeta['site_name'];
    meta['site_img'] = newMeta['site_img'];
    // TODO: meta['subtitle'] is missing from form
    meta['author'] = newMeta['author'];
    meta['rsspingback'] = newMeta['rsspingback'];
    meta['description'] = newMeta['description'];
    meta['src'] = newMeta['src'];
    // TODO: meta['share'] is missing from form
    // TODO: meta['facebook'] is missing from form
    // TODO: meta['twitter'] is missing from form

    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Meta Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Textcentred Page
router.get('/page/textcentred', function (req, res) {
    res.render('editor/pages/textcentred', {
        partials: {
            credits: 'editor/fragments/credits',
            formcontrols: 'editor/fragments/formcontrols',
            image: 'editor/fragments/image',
            intro: 'editor/fragments/intro',
            richtext: 'editor/fragments/richtext',
            snippetimage: 'editor/fragments/snippetimage',
            snippettext: 'editor/fragments/snippettext',
            subtitle: 'editor/fragments/subtitle',
            title: 'editor/fragments/title'
        }
    });
});

// Textcentred Page with ID
router.get('/page/textcentred/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].textcentred;
    };

    res.render('editor/pages/textcentred', {
        id: qId,
        item: item,
        partials: {
            credits: 'editor/fragments/credits',
            formcontrols: 'editor/fragments/formcontrols',
            image: 'editor/fragments/image',
            intro: 'editor/fragments/intro',
            richtext: 'editor/fragments/richtext',
            snippetimage: 'editor/fragments/snippetimage',
            snippettext: 'editor/fragments/snippettext',
            subtitle: 'editor/fragments/subtitle',
            title: 'editor/fragments/title'
        }
    });
});
router.post('/page/textcentred/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].textcentred;
        var newItem = req.body;
    };

    // TODO: format and save new item, but we need some way to preserve snippet order first

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Text Centered Update',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Imagebackground Page
router.get('/page/imagebackground', function (req, res) {
    res.render('editor/pages/imagebackground', {
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            imagesources: 'editor/fragments/imagesources',
            text: 'editor/fragments/plaintext',
            title: 'editor/fragments/title',
            subtitle: 'editor/fragments/subtitle'
        }
    });
});

// Imagebackground Page with ID
router.get('/page/imagebackground/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].imagebackground;
    };

    res.render('editor/pages/imagebackground', {
        id: qId,
        item: item,
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            imagesources: 'editor/fragments/imagesources',
            text: 'editor/fragments/plaintext',
            title: 'editor/fragments/title',
            subtitle: 'editor/fragments/subtitle'
        }
    });
});
router.post('/page/imagebackground/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].imagebackground;
        var newItem = req.body;
    };

    // format and save new item
    var fullpage = (newItem['fullpage'] === 'on') ? true : false;
    item['format'] = { fullpage: fullpage };
    item['title'] = newItem['title'];
    item['subtitle'] = newItem['subtitle'];
    // TODO: item['text'] is missing from form
    // TODO: item['navthumb'] is missing from form
    // TODO: item['navlevel'] is missing from form
    item['image'] = {
        srcmain: newItem['srcmain'],
        srcphone: newItem['srcphone'],
        srcmedium: newItem['srcmedium']
    };

    // save the file
    items[qId].imagebackground = item;
    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Image Backgroun Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Slideshow Horizontal Page
router.get('/page/slideshowhorizontal', function (req, res) {
    res.render('editor/pages/slideshowhorizontal', {
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            credits: 'editor/fragments/credits',
            image: 'editor/fragments/image',
            inline: 'editor/fragments/inline',
            plaintext: 'editor/fragments/plaintext',
            horizontalslide: 'editor/fragments/horizontalslide',
            title: 'editor/fragments/title'
        }
    });
});

// Slideshow Horizontal Page with ID
router.get('/page/slideshowhorizontal/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowhorizontal;
    };
    res.render('editor/pages/slideshowhorizontal', {
        id: qId,
        item: item,
        partials: {
            credits: 'editor/fragments/credits',
            formcontrols: 'editor/fragments/formcontrols',
            image: 'editor/fragments/image',
            inline: 'editor/fragments/inline',
            plaintext: 'editor/fragments/plaintext',
            horizontalslide: 'editor/fragments/horizontalslide',
            title: 'editor/fragments/title'
        }
    });
});
router.post('/page/slideshowhorizontal/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowhorizontal;
        var newItem = req.body;

        console.log('ITEM', item);
        console.log('NEW ITEM', newItem);
    };

    // format and save new slideshowhorizontal item
    var newImages = [];
    for(var i = 0; i < newItem['title'].length; ++i){
        var newImage = {
            title: newItem['title'][i],
            credits: newItem['credits'][i],
            src: newItem['src'][i],
            type: 'image/jpeg'  // TODO: this needs to be dynamic or a form field
        }
        newImages.push(newImage);
    }
    item['images'] = newImages;
    var inline = (newItem['inline'] === 'on') ? true : false;
    item['format'] = { inline: inline };
    item['title'] = newItem['show_title'];
    item['text'] = newItem['text'];

    items[qId].slideshowhorizontal = item;
    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Slideshow Horizontal Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Slideshow Vertical Page
router.get('/page/slideshowvertical', function (req, res) {
    res.render('editor/pages/slideshowvertical', {
        partials: {
            credits: 'editor/fragments/credits',
            formcontrols: 'editor/fragments/formcontrols',
            imagesources: 'editor/fragments/imagesources',
            title: 'editor/fragments/title',
            verticalslide: 'editor/fragments/verticalslide'
        }
    });
});

// Slideshow Vertical Page with ID
router.get('/page/slideshowvertical/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowvertical;
    };
    res.render('editor/pages/slideshowvertical', {
        id: qId,
        item: item,
        partials: {
            credits: 'editor/fragments/credits',
            formcontrols: 'editor/fragments/formcontrols',
            imagesources: 'editor/fragments/imagesources',
            title: 'editor/fragments/title',
            verticalslide: 'editor/fragments/verticalslide'
        }
    });
});
router.post('/page/slideshowvertical/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowvertical;
        var newItem = req.body;
    };

    // format and save new slideshowvertical item
    var newImages = [];
    for(var i = 0; i < newItem['title'].length; ++i){
        var newImage = {
            title: newItem['title'][i],
            credits: newItem['credits'][i],
            srcmain: newItem['srcmain'][i],
            srcmedium: newItem['srcmedium'][i],
            srcphone: newItem['srcphone'][i]
        }
        newImages.push(newImage);
    }
    item['images'] = newImages;

    items[qId].slideshowvertical = item;
    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Slideshow Vertical Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Videobackground Page
router.get('/page/videobackground', function (req, res, next) {
    res.render('editor/pages/videobackground', {
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            loadingimage: 'editor/fragments/loadingimage',
            title: 'editor/fragments/title',
            subtitle: 'editor/fragments/subtitle',
            videobackground: 'editor/pages/videobackground',
            videosources: 'editor/fragments/videosources'
        }
    });
});

// Videobackground Page with ID
router.get('/page/videobackground/id/:id', function (req, res, next) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].videobackground;
    };
    res.render('editor/pages/videobackground', {
        item: item,
        id: query.params.id,
        message: '',
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            loadingimage: 'editor/fragments/loadingimage',
            title: 'editor/fragments/title',
            subtitle: 'editor/fragments/subtitle',
            videobackground: 'editor/pages/videobackground',
            videosources: 'editor/fragments/videosources'
        }
    });
});
router.post('/page/videobackground/id/:id', function (req, res, next) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].videobackground;
        var newItem = req.body;
    };

    // format and save new values to videobackground
    var fullpage = (newItem['fullpage'] === 'on') ? true : false;
    item['format'] = { fullpage: fullpage };
    item['title'] = newItem['title'];
    item['subtitle'] = newItem['subtitle'];
    item['video'] = {
        mp4: newItem['mp4'],
        webm: newItem['webm']
    };
    item['image'] = {
        loading: newItem['loading']
    };

    // save the file
    items[qId].videobackground = item;
    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    // render main editor window with a success message
    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Video Background Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Videofullpage Page
router.get('/page/videofullpage', function (req, res) {
    res.render('editor/pages/videofullpage', {
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            loadingimage: 'editor/fragments/loadingimage',
            text: 'editor/fragments/plaintext',
            title: 'editor/fragments/title',
            videosources: 'editor/fragments/videosources'
        }
    });
});

// Videofullpage Page with ID
router.get('/page/videofullpage/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].videofullpage;
    };
    res.render('editor/pages/videofullpage', {
        id: qId,
        item: item,
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            loadingimage: 'editor/fragments/loadingimage',
            text: 'editor/fragments/plaintext',
            title: 'editor/fragments/title',
            videosources: 'editor/fragments/videosources'
        }
    });
});
router.post('/page/videofullpage/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].videofullpage;
        var newItem = req.body;

        console.log('ITEM', item);
        console.log('NEW ITEM', newItem);
    };

    // format and save new values to videofullpage
    var fullpage = (newItem['fullpage'] === 'on') ? true : false;
    item['format'] = { fullpage: fullpage };
    item['title'] = newItem['title'];
    item['subtitle'] = newItem['subtitle'];
    item['video'] = {
        mp4: newItem['mp4'],
        webm: newItem['webm']
    };
    item['image'] = {
        loading: newItem['loading']
    };

    // save the file
    items[qId].videofullpage = item;
    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Video Full Page Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

// Imageparallax Page
router.get('/page/imageparallax', function (req, res) {
    res.render('editor/pages/imageparallax', {
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            imagesources: 'editor/fragments/imagesources',
            subtitle: 'editor/fragments/subtitle',
            title: 'editor/fragments/title'
        }
    });
});

// Videofullpage Page with ID
router.get('/page/imageparallax/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].imageparallax;
    };
    res.render('editor/pages/imageparallax', {
        id: qId,
        item: item,
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            fullpage: 'editor/fragments/fullpage',
            imagesources: 'editor/fragments/imagesources',
            subtitle: 'editor/fragments/subtitle',
            title: 'editor/fragments/title'
        }
    });
});
router.post('/page/imageparallax/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].imageparallax;
        var newItem = req.body;
    };

    // format and save new values to imageparallax
    var fullpage = (newItem['fullpage'] === 'on') ? true : false;
    item['format'] = { fullpage: fullpage };
    item['title'] = newItem['title'];
    item['subtitle'] = newItem['subtitle'];
    // TODO: item['navlevel'] is missing from the form
    item['image'] = {
        srcmain: newItem['srcmain'],
        srcmedium: newItem['srcmedium'],
        srcphone: newItem['srcphone']
    };

    items[qId].imageparallax = item;
    // TODO: move this to a global file save function with its own button in the frontend
    writeFile(JSON.stringify({ meta: meta, items: items }));

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Image Parallax Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

module.exports = router;
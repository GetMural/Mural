var express = require('express');
const path = require('path');
var router = express.Router();
var fs = require('fs');
var Storyboard = require('../models/storyboard');

var filename = path.join(__dirname, '../data/storyboard.json');
var storyboard = new Storyboard(filename);
// read file first
storyboard.readFile(filename);

var archiver = require('archiver');


// Main Editor View
router.get('/', function (req, res, next) {
    storyboard.readFile(filename);
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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

// Editor Storyboard endpoint
router.get('/storyboard', function (req, res, next) {
    storyboard.readFile(filename);

    res.json(storyboard.data);
});
router.post('/storyboard', function (req, res, next) {
    var newData = req.body;
    storyboard.writeFile(filename, newData);

    res.json(newData);
})

const PUBLIC_FOLDER = path.resolve(__dirname, '..', 'public');

router.get('/download', function (req, res, next) {
    // Tell the browser that this is a zip file.
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=mural.zip'
    });

    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    // can decide in a bit how Mural wants to handle errors in requests.
    // (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
        console.log(err);
      } else {
        // throw error
        console.error(err);
      }
    });

    archive.on('error', function(err) {
      console.error(err);
    });
 
    archive.pipe(res);

    archive
        .file(path.resolve(PUBLIC_FOLDER, 'dist', 'index.html'), {name: 'index.html'})
        .file(path.resolve(PUBLIC_FOLDER, 'app.css'), {name: 'app.css'})
        .file(path.resolve(PUBLIC_FOLDER, 'app.js'), {name: 'app.js'})
        .directory(path.resolve(PUBLIC_FOLDER, 'img'), 'img')
        .finalize();
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

// Slide Fragment
router.get('/fragment/slide', function (req, res) {
    res.render('editor/fragments/slide');
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

// Snippet Image Fragment
router.get('/fragment/snippetimage', function (req, res) {
    res.render('editor/fragments/snippetimage', {
        partials: {
            credits: 'editor/fragments/credits',
            image: 'editor/fragments/image',
            title: 'editor/fragments/title'
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
    storyboard.readFile(filename);
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
    res.render('editor/pages/meta', {
        meta: meta,
        partials: {
            title: 'editor/fragments/title',
            formcontrols: 'editor/fragments/formcontrols'
        }
    });
});

router.post('/page/meta', function (req, res) {
    storyboard.readFile(filename);
    var newMeta = req.body;
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();


    // TODO: refactor to Storybaord.updateMeta() function
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
    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Textcentred Page with ID
router.get('/page/textcentred/id/:id', function (req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const qId = req.params.id;
    const item = items[qId].textcentred;

    //hack an image number in here for Hogan.... :'(
    if (item.snippets) {
        item.snippets.forEach((snippet, i) => {
            snippet.index = i;
            snippet.options = [
                {
                    value: 'left',
                    txt: 'left',
                    selected: (snippet.align === 'left')
                },
                {
                    value: 'center',
                    txt: 'center',
                    selected: (snippet.align === 'center')
                },
                {
                    value: 'right',
                    txt: 'right',
                    selected: (snippet.align === 'right')
                }
            ];
        });
    }

    res.render('editor/pages/textcentred', {
        id: qId,
        item: item,
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            intro: 'editor/fragments/intro',
            snippetimage: 'editor/fragments/snippetimage',
            subtitle: 'editor/fragments/subtitle'
        }
    });
});

router.post('/page/textcentred/id/:id', function (req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const qId = req.params.id;
    const item = items[qId].textcentred;
    const newItem = req.body;

    console.log(newItem);
    // format and save new item
    items[qId].textcentred = newItem;
    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Imagebackground Page with ID
router.get('/page/imagebackground/id/:id', function (req, res) {
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Slideshow Horizontal Page with ID
router.get('/page/slideshowhorizontal/id/:id', function (req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const qId = req.params.id;
    const item = items[qId].slideshowhorizontal;

    //hack an image number in here for Hogan.... :'(
    if (item.images) {
        item.images.forEach((image, i) => {
            image.index = i;
        });
    }

    res.render('editor/pages/slideshowhorizontal', {
        id: qId,
        item: item,
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            slide: 'editor/fragments/slide'
        }
    });
});

router.post('/page/slideshowhorizontal/id/:id', function (req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const qId = req.params.id;
    var item = items[qId].slideshowhorizontal;
    const newItem = req.body;

    items[qId].slideshowhorizontal = req.body;

    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Slideshow Vertical Page with ID
router.get('/page/slideshowvertical/id/:id', function (req, res) {
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowvertical;
    };

    //hack an image number in here for Hogan.... :'(
    if (item.images) {
        item.images.forEach((image, i) => {
            image.index = i;
        });
    }

    res.render('editor/pages/slideshowvertical', {
        id: qId,
        item: item,
        partials: {
            formcontrols: 'editor/fragments/formcontrols',
            slide: 'editor/fragments/slide'
        }
    });
});

router.post('/page/slideshowvertical/id/:id', function (req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const qId = req.params.id;
    items[qId].slideshowvertical = req.body;

    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Videobackground Page with ID
router.get('/page/videobackground/id/:id', function (req, res, next) {
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Videofullpage Page with ID
router.get('/page/videofullpage/id/:id', function (req, res) {
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].videofullpage;
        var newItem = req.body;
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
    storyboard.writeFile(filename, { meta: meta, items: items });

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

// Videofullpage Page with ID
router.get('/page/imageparallax/id/:id', function (req, res) {
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.readFile(filename);
    var query = req || {};
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
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
    storyboard.writeFile(filename, { meta: meta, items: items });

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

router.post('/reorder', function (req, res) {
    storyboard.readFile(filename);
    var meta = storyboard.getMeta();
    var items = storyboard.getItems();
    var order = req.body.order;

    const newItems = [];
    order.forEach((value, i) => {
        const oldItem = items[value];
        // SO HACKY LOL
        const [mediaType] = Object.keys(oldItem);
        oldItem[mediaType].id = String(i);
        newItems[i] = oldItem;
    });

    storyboard.writeFile(filename, { meta: meta, items: newItems });
    res.json(data);
});

router.post('/add', function (req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const mediaType = req.body.mediaType;

    items.push({
        [mediaType] : {
            id: items.length
        }
    });

    storyboard.writeFile(filename, { meta: meta, items: items });

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'New Item Added',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

router.post('/delete/:id', function(req, res) {
    storyboard.readFile(filename);
    const meta = storyboard.getMeta();
    const items = storyboard.getItems();
    const id = req.params.id;

    items.splice(id, 1);

    for (let i=0; i < items.length; i++) {
        const oldItem = items[i];
        // SO HACKY LOL
        const [mediaType] = Object.keys(oldItem);
        oldItem[mediaType].id = String(i);
    }

    storyboard.writeFile(filename, { meta: meta, items: items });

    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Item Deleted',
        partials: {
            editornav: 'editor/fragments/editornav'
        }
    });
});

module.exports = router;

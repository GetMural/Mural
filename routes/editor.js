var express = require('express');
var router = express.Router();
var fs = require('fs');

// TODO: refactor this to a storyboard model
// Set up the data API
var data = './data/storyboard.json';
// var data = ''; // this will be populated from the initial load screen
var meta = {};
var items = {};

// TODO: refactor this to a storyboard model
// get the meta and items objects
fs.readFile(data, 'utf8', function (err, data) {
    if (!err) {
        meta = JSON.parse(data).meta;
        items = JSON.parse(data).items;
    }
});

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
router.post('/page/textcentred', function (req, res) {
    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Text Centered Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
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
router.post('/page/imagebackground', function (req, res) {
    res.render('editor/editor', {
        meta: meta,
        items: items,
        editor: 'editor',
        message: 'Image Background Updated',
        partials: {
            editornav: 'editor/fragments/editornav'
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
router.post('/page/slideshowhorizontal', function (req, res) {
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

// Slideshow Horizontal Page with ID
router.get('/page/slideshowhorizontal/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowhorizontal;
    };
    res.render('editor/pages/slideshowhorizontal', {
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
router.post('/page/slideshowvertical', function (req, res) {
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

// Slideshow Vertical Page with ID
router.get('/page/slideshowvertical/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].slideshowvertical;
    };
    res.render('editor/pages/slideshowvertical', {
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
router.post('/page/videobackground', function (req, res, next) {
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
    };

    // TODO: save new values to videobackgorund

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
router.post('/page/videofullpage', function (req, res) {
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
router.get('/page/videofullpage/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].videofullpage;
    };
    res.render('editor/pages/videofullpage', {
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
router.post('/page/imageparallax', function (req, res) {
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

// Videofullpage Page with ID
router.get('/page/imageparallax/id/:id', function (req, res) {
    var query = req || {};
    if (query.params && query.params.id) {
        var qId = query.params.id;
        var item = items[qId].imageparallax;
    };
    res.render('editor/pages/imageparallax', {
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
var express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();
var Storyboard = require('../models/storyboard');
var storyboard = new Storyboard();
var archiver = require('archiver');

// Main Editor View
router.get('/', function (req, res) {
    storyboard.readFile(function(err, data) {
        var meta = data.meta;
        var items = data.items;
        res.render('editor/editor', {
            filename: storyboard.filename,
            meta: meta,
            items: items,
            editor: 'editor',
            message: '',
            partials: {
                editornav: 'editor/fragments/editornav'
            }
        });
    });
});

// Editor Storyboard endpoint
router.get('/storyboard', function (req, res) {
    storyboard.readFile(function (err, data) {
        res.json(data);
    });
});
router.post('/storyboard', function (req, res) {
    var newData = req.body;
    storyboard.writeFile(newData);

    res.json(newData);
})

const PUBLIC_FOLDER = path.resolve(__dirname, '..', 'public');
const DATA_FOLDER = path.resolve(__dirname, '..', 'data');

router.get('/buyusbeer', function (req, res) {
    res.render('beer');
});

router.get('/download', function (req, res) {
  storyboard.readFile(function (err, data) {
    if (err) {
        console.log(err);
        return res.send(err);
    }
    res.render('preview', {
      nav: data.nav,
      items: data.items,
      meta: data.meta,
      partials: {
          head: 'partials/head',
          imagebackground: 'partials/imagebackground',
          imageparallax: 'partials/imageparallax',
          textcentered: 'partials/textcentred',
          slideshowhorizontal: 'partials/slideshowhorizontal',
          slideshowvertical: 'partials/slideshowvertical',
          snippets: 'partials/snippets',
          videobackground: 'partials/videobackground',
          videofullpage: 'partials/videofullpage'
      }
    }, function (err, html) {
      if (err) {
          console.log(err);
          return res.send(err);
      }

      const storyName = storyboard.filename.split('.')[0];

      // write to dist/index.html
      fs.writeFile(path.resolve(PUBLIC_FOLDER, 'dist', 'index.html'), html, function (err) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        // Tell the browser that this is a zip file.
        res.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-disposition': `attachment; filename=${storyName}.zip`
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
            return res.send(err);
          } else {
            // throw error
            console.error(err);
            return res.send(err);
          }
        });

        archive.on('error', function(err) {
            console.error(err);
            return res.send(err);
        });

        archive.pipe(res);

        archive
            .file(path.resolve(PUBLIC_FOLDER, 'dist', 'index.html'), {name: 'index.html'})
            .file(path.resolve(PUBLIC_FOLDER, 'app.css'), {name: 'app.css'})
            .file(path.resolve(PUBLIC_FOLDER, 'app.js'), {name: 'app.js'})
            .file(path.resolve(DATA_FOLDER, 'stories', `${storyName}.json`), {name: `${storyName}.json`})
            .directory(path.resolve(PUBLIC_FOLDER, 'img'), 'img')
            .directory(path.resolve(PUBLIC_FOLDER, 'uploads', storyName), path.join('uploads', storyName))
            .finalize();
      });
    });
  });
});

// Editor Fragments
router.get('/fragment/editornav', function (req, res) {
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
    const index = req.query.index;
    res.render('editor/fragments/slide', {
        index
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

// Snippet Image Fragment
router.get('/fragment/snippetimage', function (req, res) {
    const index = req.query.index;
    res.render('editor/fragments/snippetimage', {
        index,
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
    storyboard.readFile(function (err, data) {
        var meta = data.meta;
        res.render('editor/pages/meta', {
            meta: meta,
            partials: {
                title: 'editor/fragments/title',
                formcontrols: 'editor/fragments/formcontrols'
            }
        });
    });
});

router.post('/page/meta', function (req, res) {
    storyboard.readFile(function (err, data) {
        var newMeta = req.body;
        var meta = data.meta;
        var items = data.items;


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
        storyboard.writeFile({ meta: meta, items: items });

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
});

// Textcentred Page with ID
router.get('/page/textcentred/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        const meta = data.meta;
        const items = data.items;
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
});

router.post('/page/textcentred/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        const meta = data.meta;
        const items = data.items;
        const qId = req.params.id;
        const newItem = req.body;

        console.log(newItem);
        // format and save new item
        items[qId].textcentred = newItem;
        storyboard.writeFile({ meta: meta, items: items });

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
});

// Imagebackground Page with ID
router.get('/page/imagebackground/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var items = data.items;
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
                audiosources: 'editor/fragments/audiosources',
                imagesources: 'editor/fragments/imagesources',
                text: 'editor/fragments/plaintext',
                title: 'editor/fragments/title',
                subtitle: 'editor/fragments/subtitle',
                plaintext: 'editor/fragments/plaintext'
            }
        });
    });
});
router.post('/page/imagebackground/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var meta = data.meta;
        var items = data.items;
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
        item['text'] = newItem['text'];
        // TODO: item['navthumb'] is missing from form
        // TODO: item['navlevel'] is missing from form
        item['image'] = {
            srcmain: newItem['srcmain'],
            srcphone: newItem['srcphone'],
            srcmedium: newItem['srcmedium']
        };

        if (newItem['mp3'] || newItem['ogg']) {
            item['audio'] = {
                mp3: newItem['mp3'],
                ogg: newItem['ogg']
            };
        } else {
            delete item['audio'];
        }

        // save the file
        items[qId].imagebackground = item;
        // TODO: move this to a global file save function with its own button in the frontend
        storyboard.writeFile({ meta: meta, items: items });

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
});


router.get('/page/imageaudio/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var items = data.items;
        if (query.params && query.params.id) {
            var qId = query.params.id;
            var item = items[qId].imageaudio;
        };

        res.render('editor/pages/imageaudio', {
            id: qId,
            item: item,
            partials: {
                formcontrols: 'editor/fragments/formcontrols',
                audiosources: 'editor/fragments/audiosources',
                imagesources: 'editor/fragments/imagesources',
                title: 'editor/fragments/title'
            }
        });
    });
});

router.post('/page/imageaudio/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var meta = data.meta;
        var items = data.items;
        if (query.params && query.params.id) {
            var qId = query.params.id;
            var item = items[qId].imageaudio;
            var newItem = req.body;
        };

        // format and save new item
        item['title'] = newItem['title'];

        item['image'] = {
            srcmain: newItem['srcmain'],
            srcphone: newItem['srcphone'],
            srcmedium: newItem['srcmedium']
        };

        if (newItem['mp3'] || newItem['ogg']) {
            item['audio'] = {
                mp3: newItem['mp3'],
                ogg: newItem['ogg']
            };
        } else {
            delete item['audio'];
        }

        // save the file
        items[qId].imageaudio = item;
        // TODO: move this to a global file save function with its own button in the frontend
        storyboard.writeFile({ meta: meta, items: items });

        res.render('editor/editor', {
            meta: meta,
            items: items,
            editor: 'editor',
            message: 'Image Audio Updated',
            partials: {
                editornav: 'editor/fragments/editornav'
            }
        });
    });
});

// Slideshow Horizontal Page with ID
router.get('/page/slideshowhorizontal/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        const items = data.items;
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
});

router.post('/page/slideshowhorizontal/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        const meta = data.meta;
        const items = data.items;
        const qId = req.params.id;

        items[qId].slideshowhorizontal = req.body;

        storyboard.writeFile({ meta: meta, items: items });

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
});

// Slideshow Vertical Page with ID
router.get('/page/slideshowvertical/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var items = data.items;
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
});

router.post('/page/slideshowvertical/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        const meta = data.meta;
        const items = data.items;
        const qId = req.params.id;
        items[qId].slideshowvertical = req.body;

        storyboard.writeFile({ meta: meta, items: items });

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
});

// Videobackground Page with ID
router.get('/page/videobackground/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var items = data.items;
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
                videosources: 'editor/fragments/videosources',
                plaintext: 'editor/fragments/plaintext'
            }
        });
    });
});

router.post('/page/videobackground/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var meta = data.meta;
        var items = data.items;
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
        item['text'] = newItem['text'];
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
        storyboard.writeFile({ meta: meta, items: items });

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
});

// Videofullpage Page with ID
router.get('/page/videofullpage/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var items = data.items;
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
                plaintext: 'editor/fragments/plaintext',
                title: 'editor/fragments/title',
                videosources: 'editor/fragments/videosources'
            }
        });
    });
});

router.post('/page/videofullpage/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var meta = data.meta;
        var items = data.items;
        if (query.params && query.params.id) {
            var qId = query.params.id;
            var item = items[qId].videofullpage;
            var newItem = req.body;
        };

        // format and save new values to videofullpage
        var fullpage = (newItem['fullpage'] === 'on') ? true : false;
        var playback = newItem['playback'];

        if (playback === 'advance') {
            item['autoAdvance'] = true;
            item['loop'] = false;
        } else {
            item['loop'] = true;
            item['autoAdvance'] = false;
        }

        item['format'] = { fullpage: fullpage };
        item['title'] = newItem['title'];
        item['subtitle'] = newItem['subtitle'];
        item['text'] = newItem['text'];
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
        storyboard.writeFile({ meta: meta, items: items });

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
});

// Videofullpage Page with ID
router.get('/page/imageparallax/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var items = data.items;
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
});

router.post('/page/imageparallax/id/:id', function (req, res) {
    storyboard.readFile(function (err, data) {
        var query = req || {};
        var meta = data.meta;
        var items = data.items;
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
        storyboard.writeFile({ meta: meta, items: items });

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
});

router.post('/reorder', function (req, res) {
    storyboard.readFile(function (err, data) {
        var meta = data.meta;
        var items = data.items;
        var order = req.body.order;

        const newItems = [];
        order.forEach((value, i) => {
            const oldItem = items[value];
            // SO HACKY LOL
            const [mediaType] = Object.keys(oldItem);
            oldItem[mediaType].id = String(i);
            newItems[i] = oldItem;
        });

        const newData = { meta: meta, items: newItems };
        storyboard.writeFile(newData);
        res.json(data);
    });
});

router.post('/add', function (req, res) {
    storyboard.readFile(function (err, data) {
        const meta = data.meta;
        const items = data.items;
        const mediaType = req.body.mediaType;

        items.push({
            [mediaType] : {
                id: items.length
            }
        });

        storyboard.writeFile({ meta: meta, items: items });

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
});

router.post('/delete/:id', function(req, res) {
    storyboard.readFile(function (err, data) {
        const meta = data.meta;
        const items = data.items;
        const id = req.params.id;

        items.splice(id, 1);

        for (let i=0; i < items.length; i++) {
            const oldItem = items[i];
            // SO HACKY LOL
            const [mediaType] = Object.keys(oldItem);
            oldItem[mediaType].id = String(i);
        }

        storyboard.writeFile({ meta: meta, items: items });

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
});

module.exports = router;

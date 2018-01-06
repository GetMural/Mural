require('../css/style.css');

$ = require('jquery');
require('scrollstory/jquery.scrollstory.js');

const videoMedia = require('./media/video');
const imageMedia = require('./media/images');

const $story = $('#scrollytelling');

const scrollStory = $story.scrollStory({
  contentSelector: '.part',
  debug: true
}).data('plugin_scrollStory');

const landing = scrollStory.getActiveItem();

console.log(landing);

$story.on('itemfocus', function(ev, item) {
  console.log('itemfocus');
  console.log(item);
  if (item.data.image) {
    imageMedia.insertBackgroundImage(item.el, item.data.src, true);
  }
});

$story.on('itemblur', function(ev, item) {
  console.log('itemblur');
  console.log(item);
  if (item.data.image) {
    imageMedia.insertBackgroundImage(item.el, item.data.src, false);
  }
});

$story.on('itementerviewport', function(ev, item) {
  console.log('itementerviewport');
  console.log(item);
  if (item.data.image) {
    imageMedia.insertBackgroundImage(item.el, item.data.src, false);
  }
});

$story.on('itemexitviewport', function(ev, item) {
  console.log('itemexitviewport');
  console.log(item);
});


if (landing.data.video) {
  videoMedia.insertBackgroundVideo(landing.el, [
    {
      type: 'video/mp4',
      src: landing.data.mp4
    },
    {
      type: 'video/webm',
      src: landing.data.webm
    }
  ]);
}

if (landing.data.image) {
  imageMedia.insertBackgroundImage(landing.el, landing.data.src, true);
}

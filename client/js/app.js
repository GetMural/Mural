require('../css/style.css');

$ = require('jquery');
require('scrollstory/jquery.scrollstory.js');

const $story = $('#scrollytelling');

$story.scrollStory({
  contentSelector: '.part',
  debug: true
});

$story.on('itemfocus', function(ev, item){
  console.log('itemfocus');
  console.log(item);
});

$story.on('itemblur', function(ev, item){
  console.log('itemblur');
  console.log(item);
});

$story.on('itementerviewport', function(ev, item){
  console.log('itementerviewport');
  console.log(item);
});

$story.on('itemexitviewport', function(ev, item){
  console.log('itemexitviewport');
  console.log(item);
});


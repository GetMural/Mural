require('blueimp-gallery/css/blueimp-gallery.css');
require('../css/style.scss');

$ = require('jquery');
require('scrollstory/jquery.scrollstory.js');

$.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];
  
  $(this).each(function() {
    instances.push(new MoveItItem($(this)));
  });
  
  window.addEventListener('scroll', function(){
    const scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  }, {passive: true}); // TODO check compatibility
}

const MoveItItem = function(el){
  this.el = $(el);
  this.container = this.el.parent('.part');
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

MoveItItem.prototype.update = function(scrollTop){
  const top = scrollTop - this.container.offset().top;
  this.el.css('transform', 'translateY(' + -(top / this.speed) + 'px)');
};

const stickybits = require('stickybits/src/jquery.stickybits');
const blueimp = require('blueimp-gallery/js/blueimp-gallery');
const videoMedia = require('./media/video');
const imageMedia = require('./media/images');
const audioMedia = require('./media/audio');
const isMobile = window.isMobile;

const WINDOW_WIDTH = $(window).width();
let scrKey;
let attrKey;

if (WINDOW_WIDTH > 1024) {
  scrKey = 'src';
  attrKey = 'src';
} else if (WINDOW_WIDTH > 600) {
  scrKey = 'srcMedium';
  attrKey = 'src-medium';
} else {
  scrKey = 'srcPhone';
  attrKey = 'src-phone';
}

const $story = $('#scrollytelling');
const scrollStory = $story.scrollStory({
  contentSelector: '.part'
}).data('plugin_scrollStory');

const LOADED_STORY_SECTIONS = [];
let isSoundEnabled = true;


function loadItem (item) {
  // have to load videos as we remove the src and reload to prevent downloading unwatched media.
  if (item.data.video) {
    let muted;
    let autoplay;

    if (item.data.isFullpage) {
      muted = (isSoundEnabled === false) || (item.data.muted === true);
      autoplay = !isMobile.any;
    } else {
      muted = (isSoundEnabled === false) || (isMobile.any === true) || (item.data.muted === true);
      autoplay = item.data.autoplay;
    }

    videoMedia.insertBackgroundVideo(
      scrollStory,
      item.el,
      item.index,
      [
        {
          type: 'video/mp4',
          src: item.data.mp4
        },
        {
          type: 'video/webm',
          src: item.data.webm
        }
      ],
      {
        poster: item.data.poster,
        autoplay: autoplay,
        muted: muted,
        loop: item.data.loop,
        autoAdvance: item.data.autoAdvance
      }
    );
  }

  if (LOADED_STORY_SECTIONS[item.index] !== undefined) {
    return;
  }

  if (item.data.audio) {
    audioMedia.insertBackgroundAudio(
      scrollStory,
      item.el,
      item.index,
      [
        {
          type: 'audio/mp3',
          src: item.data.mp3
        },
        {
          type: 'audio/ogg',
          src: item.data.ogg
        }
      ],
      {
        muted: (isSoundEnabled === false)
      }
    );
  }

  if (item.data.image) {
    imageMedia.insertBackgroundImage(item.el, item.data[scrKey], item.active);
  }

  if (item.data.slideshow) {
    blueimp(
      item.el.find('.slide-container a').get(),
      {
        container: item.el.find('.blueimp-gallery')[0],
        urlProperty: attrKey,
        carousel: true,
        titleElement: '.slide-caption',
        startSlideshow: false,
        onslide: function (index, slide) {
          const text = this.list[index].getAttribute('data-credits');
          const node = this.container.find('.credits');
          node.empty();
          if (text) {
            node[0].appendChild(document.createTextNode(text));
          }
        }
      }
    );
  }

  if (item.data.slides) {
    item.el.find('.bg-image')
      .each(function(i) {
        const $el = $(this);
        const src = $el.data(scrKey);
        $el.css('background-image', `url(${src})`);
      })
      .stickybits();
  }

  if (item.data.parallax) {
    const src = item.data[scrKey];
    item.el.find('.bg-image').css('background-image', `url(${src})`);
  }

  LOADED_STORY_SECTIONS[item.index] = {
    loaded: true
  };
}

$story.on('itemfocus', function(ev, item) {
  if (item.data.image) {
    imageMedia.fixBackgroundImage(item.el, item.data[scrKey], true);
  }

  if (item.data.video) {
    videoMedia.fixBackgroundVideo(item.el);
  }

  if (item.data.audio) {
    audioMedia.insertBackgroundAudio(
      scrollStory,
      item.el,
      item.index,
      [
        {
          type: 'audio/mp3',
          src: item.data.mp3
        },
        {
          type: 'audio/ogg',
          src: item.data.ogg
        }
      ],
      {
        muted: (isSoundEnabled === false)
      }
    );
  }
});

$story.on('itemblur', function(ev, item) {
  if (item.data.image) {
    imageMedia.unfixBackgroundImage(item.el);
  }

  if (item.data.video) {
    videoMedia.unfixBackgroundVideo(item.el);
  }
});

$story.on('itementerviewport', function(ev, item) {
  loadItem(item);
});

$story.on('itemexitviewport', function(ev, item) {
  if (item.data.image) {
    imageMedia.unfixBackgroundImage(item.el);
  }

  if (item.data.video) {
    videoMedia.removeBackgroundVideo(item.el, item.index);
  }

  if (item.data.audio) {
    audioMedia.removeBackgroundAudio(item.el, item.index);
  }
});

scrollStory.getItemsInViewport().forEach(function (item) {
  loadItem(item);
});

$('[data-scroll-speed]').moveIt();

$('.mute').click(function () {
  $this = $(this);
  if ($this.hasClass('muted')) {
    isSoundEnabled = true;
    $this.removeClass('muted');
  } else {
    isSoundEnabled = false;
    $this.addClass('muted');
  }

  scrollStory.getItemsInViewport().forEach(function (item) {
    if (item.data.video) {
      let muted;

      if (item.data.isFullpage) {
        muted = (isSoundEnabled === false) || (item.data.muted === true);
      } else {
        muted = (isSoundEnabled === false) || (isMobile.any === true) || (item.data.muted === true);
      }

      videoMedia.setMuted(item.index, muted);
    }
  });
});

$('.sticks_wrapper').click(function() {
  $('body').toggleClass('paneOpen');
});

$('nav').on('click', 'li', function() {
  scrollStory.index(parseInt(this.dataset.id, 10));
});

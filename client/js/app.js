require("blueimp-gallery/css/blueimp-gallery.css");
require("../css/style.scss");

const $ = require("expose-loader?$!jquery");
require("scrollstory/jquery.scrollstory.js");
require("stickybits/src/jquery.stickybits");

$.fn.moveIt = function() {
  var $window = $(window);
  var instances = [];

  $(this).each(function() {
    instances.push(new MoveItItem($(this)));
  });

  window.addEventListener(
    "scroll",
    function(e) {
      const scrollTop = $window.scrollTop();
      instances.forEach(function(inst) {
        inst.update(scrollTop);
      });
    },
    { passive: true }
  ); // TODO check compatibility
};

const MoveItItem = function(el) {
  this.el = $(el);
  this.container = this.el.parent(".part");
  this.speed = parseInt(this.el.attr("data-scroll-speed"));
  // 60 fps
  this.fpsInterval = 1000 / 60;
  this.top = null;
  this.inView = false;
  this.rafID = null;
  this.then = null;
};

MoveItItem.prototype.animate = function(time) {
  // calc elapsed time since last loop
  const now = time;
  const elapsed = now - this.then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > this.fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    this.then = now - (elapsed % this.fpsInterval);
    this.el.css("transform", "translateY(" + -(this.top / this.speed) + "px)");
  }
  this.rafID = requestAnimationFrame(this.animate.bind(this));
};

MoveItItem.prototype.update = function(scrollTop) {
  if (this.container.hasClass("inviewport")) {
    if (!this.inView) {
      this.el.css("willChange", "transform");
      this.then = performance.now();
      this.rafID = requestAnimationFrame(this.animate.bind(this));
    }

    this.top = scrollTop - this.container.offset().top;
    this.inView = true;
  } else {
    if (this.inView) {
      cancelAnimationFrame(this.rafID);
      this.el.css("willChange", "auto");
    }
    this.inView = false;
  }
};

const blueimp = require("blueimp-gallery/js/blueimp-gallery");
const videoMedia = require("./media/video");
const imageMedia = require("./media/images");
const audioMedia = require("./media/audio");
const youtubeMedia = require("./media/youtube");
const isMobile = window.isMobile;

const WINDOW_WIDTH = $(window).width();
let scrKey;
let attrKey;

if (WINDOW_WIDTH > 1024) {
  scrKey = "src";
  attrKey = "src";
} else if (WINDOW_WIDTH > 600) {
  scrKey = "srcMedium";
  attrKey = "src-medium";
} else {
  scrKey = "srcPhone";
  attrKey = "src-phone";
}

const $story = $("#scrollytelling");
const scrollStory = $story
  .scrollStory({
    contentSelector: ".part",
    triggerOffset: 0
  })
  .data("plugin_scrollStory");

const storyItems = scrollStory.getItems();

const LOAD_PROMISES = [];
const LOADED_STORY_SECTIONS = [];
let isSoundEnabled = true;

function getVideoAttrs(item) {
  const muted = !isSoundEnabled;
  let autoplay;

  // TODO we only have full page videos atm.
  if (item.el.hasClass("st-content-video")) {
    autoplay = !isMobile.any;
  } else {
    autoplay = true;
  }

  return {
    poster: item.data.poster,
    autoplay: autoplay,
    muted: muted,
    loop: item.data.loop,
    autoAdvance: item.data.autoAdvance
  };
}

function loadItem(item) {
  if (LOADED_STORY_SECTIONS[item.index] !== undefined) {
    return;
  } else {
    LOADED_STORY_SECTIONS[item.index] = {
      loaded: true
    };
  }

  const returnPromises = [];

  if (item.data.youtubeId) {
    const youtubeLoaded = youtubeMedia.prepare(scrollStory, item);
    returnPromises.push(youtubeLoaded);
  }

  if (item.data.image) {
    const imageLoaded = imageMedia.insertBackgroundImage(
      item.el,
      item.data[scrKey],
      item.active
    );
    returnPromises.push(imageLoaded);
  }

  if (item.data.slideshow) {
    const slides = item.el.find(".slide-container a").get();
    const slidePromises = [];

    for (let i = 0; i < slides.length; i++) {
      const a = slides[i];
      const src = $(a).data(scrKey);
      const loadPromise = imageMedia.imageLoadPromise(src);
      slidePromises.push(loadPromise);
    }

    const horizontalSlidePromise = Promise.all(slidePromises).then(() => {
      blueimp(slides, {
        container: item.el.find(".blueimp-gallery")[0],
        urlProperty: attrKey,
        carousel: true,
        titleElement: ".slide-caption",
        startSlideshow: false,
        onslide: function(index, slide) {
          const text = this.list[index].getAttribute("data-credits");
          const node = this.container.find(".credits");
          node.empty();
          if (text) {
            node[0].appendChild(document.createTextNode(text));
          }
        }
      });
    });

    returnPromises.push(horizontalSlidePromise);
  }

  if (item.data.slides) {
    item.el
      .find(".bg-image")
      .each(function(i) {
        const $el = $(this);
        const src = $el.data(scrKey);

        const loadPromise = imageMedia.imageLoadPromise(src).then(() => {
          $el.css("background-image", `url(${src})`);
        });

        returnPromises.push(loadPromise);
      })
      .stickybits();
  }

  if (item.data.parallax) {
    const src = item.data[scrKey];
    const loadPromise = imageMedia.imageLoadPromise(src).then(() => {
      item.el.find(".bg-image").css("background-image", `url(${src})`);
    });

    returnPromises.push(loadPromise);
  }

  if (item.data.dynamicImage) {
    const imagesInserted = imageMedia.loadImages(item.el).then(() => {
      scrollStory.updateOffsets();
    });

    returnPromises.push(imagesInserted);
  }

  if (item.data.video) {
    const videoLoaded = videoMedia.prepareVideo(
      scrollStory,
      item.el,
      item.index,
      [
        {
          type: "video/mp4",
          src: item.data.mp4
        },
        {
          type: "video/webm",
          src: item.data.webm
        },
        {
          type: "application/vnd.apple.mpegurl",
          src: item.data.hls
        }
      ],
      getVideoAttrs(item)
    );

    returnPromises.push(videoLoaded);
  }

  if (item.data.audio) {
    const audioLoaded = audioMedia.prepareAudio(item.index, [
      {
        type: "audio/mp3",
        src: item.data.mp3
      },
      {
        type: "audio/ogg",
        src: item.data.ogg
      }
    ]);

    returnPromises.push(audioLoaded);
  }

  return Promise.all(returnPromises);
}

$story.on("itemfocus", function(ev, item) {
  if (item.data.image) {
    imageMedia.fixBackgroundImage(item.el, item.data[scrKey], true);
  }

  if (item.data.video) {
    videoMedia.playBackgroundVideo(item.index, getVideoAttrs(item));
    videoMedia.fixBackgroundVideo(item.el);
  }

  if (item.data.youtubeId) {
    youtubeMedia.play(item, isSoundEnabled);
    youtubeMedia.stick(item);
  }

  if (item.data.audio) {
    audioMedia.playBackgroundAudio(item.index, {
      muted: !isSoundEnabled
    });
  }
});

$story.on("itemblur", function(ev, item) {
  if (item.data.image) {
    imageMedia.unfixBackgroundImage(item.el);
  }

  if (item.data.youtubeId) {
    youtubeMedia.remove(item);
  }

  if (item.data.video) {
    videoMedia.removeBackgroundVideo(item.el, item.index);
  }

  if (item.data.audio) {
    audioMedia.removeBackgroundAudio(item.index);
  }
});

$story.on("itementerviewport", function(ev, item) {
  loadItem(item);

  // load another in advance
  if (item.index + 1 < storyItems.length) {
    loadItem(storyItems[item.index + 1]);
  }

  // load another in advance
  if (item.index + 2 < storyItems.length) {
    loadItem(storyItems[item.index + 2]);
  }
});

// parallax.
$("[data-scroll-speed]").moveIt();

// give mobile a special "unmute button" per video.
if (isMobile.any) {
  $(".mute").remove();
} else {
  $(".mobile-mute").remove();
  $(".mute").click(function() {
    const $this = $(this);
    if ($this.hasClass("muted")) {
      isSoundEnabled = true;
      $this.removeClass("muted");
    } else {
      isSoundEnabled = false;
      $this.addClass("muted");
    }

    storyItems.forEach(function(item) {
      if (item.data.video) {
        const muted = !isSoundEnabled || item.data.muted;
        videoMedia.setMuted(item.index, muted);
      }

      if (item.data.audio) {
        const muted = !isSoundEnabled;
        audioMedia.setMuted(item.index, muted);
      }
    });

    youtubeMedia.setMuted(!isSoundEnabled);
  });
}

$(".sticks_wrapper").click(function() {
  $("body").toggleClass("paneOpen");
});

$("nav").on("click", "li", function() {
  scrollStory.index(parseInt(this.dataset.id, 10));
});

const active = scrollStory.getActiveItem();

scrollStory.getItemsInViewport().forEach(function(item) {
  const loadPromise = loadItem(item);

  if (loadPromise) {
    LOAD_PROMISES.push(loadPromise);
  }
});

// push two in advance
if (active.index + 1 < storyItems.length) {
  const loadPromise = loadItem(storyItems[active.index + 1]);

  if (loadPromise) {
    LOAD_PROMISES.push(loadPromise);
  }
}

// push two in advance
if (active.index + 2 < storyItems.length) {
  const loadPromise = loadItem(storyItems[active.index + 2]);

  if (loadPromise) {
    LOAD_PROMISES.push(loadPromise);
  }
}

Promise.all(LOAD_PROMISES)
  .then(() => {
    let overlay = document.getElementById("loading_overlay");
    let playStart = document.getElementById("play_start");
    playStart.style.display = "block";

    playStart.addEventListener("click", () => {
      document.body.removeChild(overlay);
      document.body.classList.remove("frozen");

      if (active.data.video) {
        videoMedia.playBackgroundVideo(active.index, getVideoAttrs(active));
        videoMedia.fixBackgroundVideo(active.el);
      }

      if (active.data.audio) {
        audioMedia.playBackgroundAudio(active.index, {
          muted: !isSoundEnabled
        });
      }

      if (active.data.youtubeId) {
        youtubeMedia.play(active, isSoundEnabled);
        youtubeMedia.stick(active);
      }

      overlay = null;
      playStart = null;
    });
  })
  .catch(e => {
    console.error(e);
  });

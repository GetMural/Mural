/* eslint-env browser */
/* globals $ */
class Parallax {
  constructor(el) {
    this.el = $(el);
    this.container = this.el.parent('.part');
    this.speed = parseInt(this.el.attr('data-scroll-speed'), 10);
    // 60 fps
    this.fpsInterval = 1000 / 60;
    this.top = null;
    this.inView = false;
    this.rafID = null;
    this.then = null;
  }

  animate(time) {
    // calc elapsed time since last loop
    const now = time;
    const elapsed = now - this.then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      this.then = now - (elapsed % this.fpsInterval);
      this.el.css(
        'transform',
        `translateY(${-(this.top / this.speed)}px)`,
      );
    }
    this.rafID = requestAnimationFrame(this.animate.bind(this));
  }

  update(scrollTop) {
    if (this.container.hasClass('inviewport')) {
      if (!this.inView) {
        this.el.css('willChange', 'transform');
        this.then = performance.now();
        this.rafID = requestAnimationFrame(this.animate.bind(this));
      }
      this.top = scrollTop - this.container.offset().top;
      this.inView = true;
    } else {
      if (this.inView) {
        cancelAnimationFrame(this.rafID);
        this.el.css('willChange', 'auto');
      }
      this.inView = false;
    }
  }
}

$.fn.parallax = function() {
  const $window = $(window);
  const instances = [];

  $(this).each(function() {
    instances.push(new Parallax($(this)));
  });

  window.addEventListener(
    'scroll',
    function(e) {
      const scrollTop = $window.scrollTop();
      instances.forEach(function(inst) {
        inst.update(scrollTop);
      });
    },
    { passive: true },
  ); // TODO check compatibility
};

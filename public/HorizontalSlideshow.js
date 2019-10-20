(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/blueimp-gallery/js/blueimp-gallery.js":
/*!************************************************************!*\
  !*** ./node_modules/blueimp-gallery/js/blueimp-gallery.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * blueimp Gallery JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Swipe implementation based on
 * https://github.com/bradbirdsall/Swipe
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, DocumentTouch */

/* eslint-disable no-param-reassign */

;(function(factory) {
  'use strict'
  if (true) {
    // Register as an anonymous AMD module:
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./blueimp-helper */ "./node_modules/blueimp-gallery/js/blueimp-helper.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(function($) {
  'use strict'

  /**
   * Gallery constructor
   *
   * @class
   * @param {Array|NodeList} list Gallery content
   * @param {object} [options] Gallery options
   * @returns {object} Gallery object
   */
  function Gallery(list, options) {
    if (document.body.style.maxHeight === undefined) {
      // document.body.style.maxHeight is undefined on IE6 and lower
      return null
    }
    if (!this || this.options !== Gallery.prototype.options) {
      // Called as function instead of as constructor,
      // so we simply return a new instance:
      return new Gallery(list, options)
    }
    if (!list || !list.length) {
      this.console.log(
        'blueimp Gallery: No or empty list provided as first argument.',
        list
      )
      return
    }
    this.list = list
    this.num = list.length
    this.initOptions(options)
    this.initialize()
  }

  $.extend(Gallery.prototype, {
    options: {
      // The Id, element or querySelector of the gallery widget:
      container: '#blueimp-gallery',
      // The tag name, Id, element or querySelector of the slides container:
      slidesContainer: 'div',
      // The tag name, Id, element or querySelector of the title element:
      titleElement: 'h3',
      // The class to add when the gallery is visible:
      displayClass: 'blueimp-gallery-display',
      // The class to add when the gallery controls are visible:
      controlsClass: 'blueimp-gallery-controls',
      // The class to add when the gallery only displays one element:
      singleClass: 'blueimp-gallery-single',
      // The class to add when the left edge has been reached:
      leftEdgeClass: 'blueimp-gallery-left',
      // The class to add when the right edge has been reached:
      rightEdgeClass: 'blueimp-gallery-right',
      // The class to add when the automatic slideshow is active:
      playingClass: 'blueimp-gallery-playing',
      // The class for all slides:
      slideClass: 'slide',
      // The slide class for loading elements:
      slideLoadingClass: 'slide-loading',
      // The slide class for elements that failed to load:
      slideErrorClass: 'slide-error',
      // The class for the content element loaded into each slide:
      slideContentClass: 'slide-content',
      // The class for the "toggle" control:
      toggleClass: 'toggle',
      // The class for the "prev" control:
      prevClass: 'prev',
      // The class for the "next" control:
      nextClass: 'next',
      // The class for the "close" control:
      closeClass: 'close',
      // The class for the "play-pause" toggle control:
      playPauseClass: 'play-pause',
      // The list object property (or data attribute) with the object type:
      typeProperty: 'type',
      // The list object property (or data attribute) with the object title:
      titleProperty: 'title',
      // The list object property (or data attribute) with the object alt text:
      altTextProperty: 'alt',
      // The list object property (or data attribute) with the object URL:
      urlProperty: 'href',
      // The list object property (or data attribute) with the object srcset URL(s):
      srcsetProperty: 'urlset',
      // The gallery listens for transitionend events before triggering the
      // opened and closed events, unless the following option is set to false:
      displayTransition: true,
      // Defines if the gallery slides are cleared from the gallery modal,
      // or reused for the next gallery initialization:
      clearSlides: true,
      // Defines if images should be stretched to fill the available space,
      // while maintaining their aspect ratio (will only be enabled for browsers
      // supporting background-size="contain", which excludes IE < 9).
      // Set to "cover", to make images cover all available space (requires
      // support for background-size="cover", which excludes IE < 9):
      stretchImages: false,
      // Toggle the controls on pressing the Return key:
      toggleControlsOnReturn: true,
      // Toggle the controls on slide click:
      toggleControlsOnSlideClick: true,
      // Toggle the automatic slideshow interval on pressing the Space key:
      toggleSlideshowOnSpace: true,
      // Navigate the gallery by pressing left and right on the keyboard:
      enableKeyboardNavigation: true,
      // Close the gallery on pressing the Esc key:
      closeOnEscape: true,
      // Close the gallery when clicking on an empty slide area:
      closeOnSlideClick: true,
      // Close the gallery by swiping up or down:
      closeOnSwipeUpOrDown: true,
      // Emulate touch events on mouse-pointer devices such as desktop browsers:
      emulateTouchEvents: true,
      // Stop touch events from bubbling up to ancestor elements of the Gallery:
      stopTouchEventsPropagation: false,
      // Hide the page scrollbars:
      hidePageScrollbars: true,
      // Stops any touches on the container from scrolling the page:
      disableScroll: true,
      // Carousel mode (shortcut for carousel specific options):
      carousel: false,
      // Allow continuous navigation, moving from last to first
      // and from first to last slide:
      continuous: true,
      // Remove elements outside of the preload range from the DOM:
      unloadElements: true,
      // Start with the automatic slideshow:
      startSlideshow: false,
      // Delay in milliseconds between slides for the automatic slideshow:
      slideshowInterval: 5000,
      // The starting index as integer.
      // Can also be an object of the given list,
      // or an equal object with the same url property:
      index: 0,
      // The number of elements to load around the current index:
      preloadRange: 2,
      // The transition speed between slide changes in milliseconds:
      transitionSpeed: 400,
      // The transition speed for automatic slide changes, set to an integer
      // greater 0 to override the default transition speed:
      slideshowTransitionSpeed: undefined,
      // The event object for which the default action will be canceled
      // on Gallery initialization (e.g. the click event to open the Gallery):
      event: undefined,
      // Callback function executed when the Gallery is initialized.
      // Is called with the gallery instance as "this" object:
      onopen: undefined,
      // Callback function executed when the Gallery has been initialized
      // and the initialization transition has been completed.
      // Is called with the gallery instance as "this" object:
      onopened: undefined,
      // Callback function executed on slide change.
      // Is called with the gallery instance as "this" object and the
      // current index and slide as arguments:
      onslide: undefined,
      // Callback function executed after the slide change transition.
      // Is called with the gallery instance as "this" object and the
      // current index and slide as arguments:
      onslideend: undefined,
      // Callback function executed on slide content load.
      // Is called with the gallery instance as "this" object and the
      // slide index and slide element as arguments:
      onslidecomplete: undefined,
      // Callback function executed when the Gallery is about to be closed.
      // Is called with the gallery instance as "this" object:
      onclose: undefined,
      // Callback function executed when the Gallery has been closed
      // and the closing transition has been completed.
      // Is called with the gallery instance as "this" object:
      onclosed: undefined
    },

    carouselOptions: {
      hidePageScrollbars: false,
      toggleControlsOnReturn: false,
      toggleSlideshowOnSpace: false,
      enableKeyboardNavigation: false,
      closeOnEscape: false,
      closeOnSlideClick: false,
      closeOnSwipeUpOrDown: false,
      disableScroll: false,
      startSlideshow: true
    },

    console:
      window.console && typeof window.console.log === 'function'
        ? window.console
        : { log: function() {} },

    // Detect touch, transition, transform and background-size support:
    support: (function(element) {
      var support = {
        touch:
          window.ontouchstart !== undefined ||
          (window.DocumentTouch && document instanceof DocumentTouch)
      }
      var transitions = {
        webkitTransition: {
          end: 'webkitTransitionEnd',
          prefix: '-webkit-'
        },
        MozTransition: {
          end: 'transitionend',
          prefix: '-moz-'
        },
        OTransition: {
          end: 'otransitionend',
          prefix: '-o-'
        },
        transition: {
          end: 'transitionend',
          prefix: ''
        }
      }
      var prop
      for (prop in transitions) {
        if (
          Object.prototype.hasOwnProperty.call(transitions, prop) &&
          element.style[prop] !== undefined
        ) {
          support.transition = transitions[prop]
          support.transition.name = prop
          break
        }
      }
      /**
       * Tests browser support
       */
      function elementTests() {
        var transition = support.transition
        var prop
        var translateZ
        document.body.appendChild(element)
        if (transition) {
          prop = transition.name.slice(0, -9) + 'ransform'
          if (element.style[prop] !== undefined) {
            element.style[prop] = 'translateZ(0)'
            translateZ = window
              .getComputedStyle(element)
              .getPropertyValue(transition.prefix + 'transform')
            support.transform = {
              prefix: transition.prefix,
              name: prop,
              translate: true,
              translateZ: !!translateZ && translateZ !== 'none'
            }
          }
        }
        if (element.style.backgroundSize !== undefined) {
          support.backgroundSize = {}
          element.style.backgroundSize = 'contain'
          support.backgroundSize.contain =
            window
              .getComputedStyle(element)
              .getPropertyValue('background-size') === 'contain'
          element.style.backgroundSize = 'cover'
          support.backgroundSize.cover =
            window
              .getComputedStyle(element)
              .getPropertyValue('background-size') === 'cover'
        }
        document.body.removeChild(element)
      }
      if (document.body) {
        elementTests()
      } else {
        $(document).on('DOMContentLoaded', elementTests)
      }
      return support
      // Test element, has to be standard HTML and must not be hidden
      // for the CSS3 tests using window.getComputedStyle to be applicable:
    })(document.createElement('div')),

    requestAnimationFrame:
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame,

    cancelAnimationFrame:
      window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame,

    initialize: function() {
      this.initStartIndex()
      if (this.initWidget() === false) {
        return false
      }
      this.initEventListeners()
      // Load the slide at the given index:
      this.onslide(this.index)
      // Manually trigger the slideend event for the initial slide:
      this.ontransitionend()
      // Start the automatic slideshow if applicable:
      if (this.options.startSlideshow) {
        this.play()
      }
    },

    slide: function(to, speed) {
      window.clearTimeout(this.timeout)
      var index = this.index
      var direction
      var naturalDirection
      var diff
      if (index === to || this.num === 1) {
        return
      }
      if (!speed) {
        speed = this.options.transitionSpeed
      }
      if (this.support.transform) {
        if (!this.options.continuous) {
          to = this.circle(to)
        }
        // 1: backward, -1: forward:
        direction = Math.abs(index - to) / (index - to)
        // Get the actual position of the slide:
        if (this.options.continuous) {
          naturalDirection = direction
          direction = -this.positions[this.circle(to)] / this.slideWidth
          // If going forward but to < index, use to = slides.length + to
          // If going backward but to > index, use to = -slides.length + to
          if (direction !== naturalDirection) {
            to = -direction * this.num + to
          }
        }
        diff = Math.abs(index - to) - 1
        // Move all the slides between index and to in the right direction:
        while (diff) {
          diff -= 1
          this.move(
            this.circle((to > index ? to : index) - diff - 1),
            this.slideWidth * direction,
            0
          )
        }
        to = this.circle(to)
        this.move(index, this.slideWidth * direction, speed)
        this.move(to, 0, speed)
        if (this.options.continuous) {
          this.move(
            this.circle(to - direction),
            -(this.slideWidth * direction),
            0
          )
        }
      } else {
        to = this.circle(to)
        this.animate(index * -this.slideWidth, to * -this.slideWidth, speed)
      }
      this.onslide(to)
    },

    getIndex: function() {
      return this.index
    },

    getNumber: function() {
      return this.num
    },

    prev: function() {
      if (this.options.continuous || this.index) {
        this.slide(this.index - 1)
      }
    },

    next: function() {
      if (this.options.continuous || this.index < this.num - 1) {
        this.slide(this.index + 1)
      }
    },

    play: function(time) {
      var that = this
      window.clearTimeout(this.timeout)
      this.interval = time || this.options.slideshowInterval
      if (this.elements[this.index] > 1) {
        this.timeout = this.setTimeout(
          (!this.requestAnimationFrame && this.slide) ||
            function(to, speed) {
              that.animationFrameId = that.requestAnimationFrame.call(
                window,
                function() {
                  that.slide(to, speed)
                }
              )
            },
          [this.index + 1, this.options.slideshowTransitionSpeed],
          this.interval
        )
      }
      this.container.addClass(this.options.playingClass)
    },

    pause: function() {
      window.clearTimeout(this.timeout)
      this.interval = null
      if (this.cancelAnimationFrame) {
        this.cancelAnimationFrame.call(window, this.animationFrameId)
        this.animationFrameId = null
      }
      this.container.removeClass(this.options.playingClass)
    },

    add: function(list) {
      var i
      if (!list.concat) {
        // Make a real array out of the list to add:
        list = Array.prototype.slice.call(list)
      }
      if (!this.list.concat) {
        // Make a real array out of the Gallery list:
        this.list = Array.prototype.slice.call(this.list)
      }
      this.list = this.list.concat(list)
      this.num = this.list.length
      if (this.num > 2 && this.options.continuous === null) {
        this.options.continuous = true
        this.container.removeClass(this.options.leftEdgeClass)
      }
      this.container
        .removeClass(this.options.rightEdgeClass)
        .removeClass(this.options.singleClass)
      for (i = this.num - list.length; i < this.num; i += 1) {
        this.addSlide(i)
        this.positionSlide(i)
      }
      this.positions.length = this.num
      this.initSlides(true)
    },

    resetSlides: function() {
      this.slidesContainer.empty()
      this.unloadAllSlides()
      this.slides = []
    },

    handleClose: function() {
      var options = this.options
      this.destroyEventListeners()
      // Cancel the slideshow:
      this.pause()
      this.container[0].style.display = 'none'
      this.container
        .removeClass(options.displayClass)
        .removeClass(options.singleClass)
        .removeClass(options.leftEdgeClass)
        .removeClass(options.rightEdgeClass)
      if (options.hidePageScrollbars) {
        document.body.style.overflow = this.bodyOverflowStyle
      }
      if (this.options.clearSlides) {
        this.resetSlides()
      }
      if (this.options.onclosed) {
        this.options.onclosed.call(this)
      }
    },

    close: function() {
      var that = this
      /**
       * Close handler
       *
       * @param {event} event Close event
       */
      function closeHandler(event) {
        if (event.target === that.container[0]) {
          that.container.off(that.support.transition.end, closeHandler)
          that.handleClose()
        }
      }
      if (this.options.onclose) {
        this.options.onclose.call(this)
      }
      if (this.support.transition && this.options.displayTransition) {
        this.container.on(this.support.transition.end, closeHandler)
        this.container.removeClass(this.options.displayClass)
      } else {
        this.handleClose()
      }
    },

    circle: function(index) {
      // Always return a number inside of the slides index range:
      return (this.num + (index % this.num)) % this.num
    },

    move: function(index, dist, speed) {
      this.translateX(index, dist, speed)
      this.positions[index] = dist
    },

    translate: function(index, x, y, speed) {
      if (!this.slides[index]) return
      var style = this.slides[index].style
      var transition = this.support.transition
      var transform = this.support.transform
      style[transition.name + 'Duration'] = speed + 'ms'
      style[transform.name] =
        'translate(' +
        x +
        'px, ' +
        y +
        'px)' +
        (transform.translateZ ? ' translateZ(0)' : '')
    },

    translateX: function(index, x, speed) {
      this.translate(index, x, 0, speed)
    },

    translateY: function(index, y, speed) {
      this.translate(index, 0, y, speed)
    },

    animate: function(from, to, speed) {
      if (!speed) {
        this.slidesContainer[0].style.left = to + 'px'
        return
      }
      var that = this
      var start = new Date().getTime()
      var timer = window.setInterval(function() {
        var timeElap = new Date().getTime() - start
        if (timeElap > speed) {
          that.slidesContainer[0].style.left = to + 'px'
          that.ontransitionend()
          window.clearInterval(timer)
          return
        }
        that.slidesContainer[0].style.left =
          (to - from) * (Math.floor((timeElap / speed) * 100) / 100) +
          from +
          'px'
      }, 4)
    },

    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false
      }
    },

    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation()
      } else {
        event.cancelBubble = true
      }
    },

    onresize: function() {
      this.initSlides(true)
    },

    onmousedown: function(event) {
      // Trigger on clicks of the left mouse button only
      // and exclude video & audio elements:
      if (
        event.which &&
        event.which === 1 &&
        event.target.nodeName !== 'VIDEO' &&
        event.target.nodeName !== 'AUDIO'
      ) {
        // Preventing the default mousedown action is required
        // to make touch emulation work with Firefox:
        event.preventDefault()
        ;(event.originalEvent || event).touches = [
          {
            pageX: event.pageX,
            pageY: event.pageY
          }
        ]
        this.ontouchstart(event)
      }
    },

    onmousemove: function(event) {
      if (this.touchStart) {
        ;(event.originalEvent || event).touches = [
          {
            pageX: event.pageX,
            pageY: event.pageY
          }
        ]
        this.ontouchmove(event)
      }
    },

    onmouseup: function(event) {
      if (this.touchStart) {
        this.ontouchend(event)
        delete this.touchStart
      }
    },

    onmouseout: function(event) {
      if (this.touchStart) {
        var target = event.target
        var related = event.relatedTarget
        if (!related || (related !== target && !$.contains(target, related))) {
          this.onmouseup(event)
        }
      }
    },

    ontouchstart: function(event) {
      if (this.options.stopTouchEventsPropagation) {
        this.stopPropagation(event)
      }
      // jQuery doesn't copy touch event properties by default,
      // so we have to access the originalEvent object:
      var touches = (event.originalEvent || event).touches[0]
      this.touchStart = {
        // Remember the initial touch coordinates:
        x: touches.pageX,
        y: touches.pageY,
        // Store the time to determine touch duration:
        time: Date.now()
      }
      // Helper variable to detect scroll movement:
      this.isScrolling = undefined
      // Reset delta values:
      this.touchDelta = {}
    },

    ontouchmove: function(event) {
      if (this.options.stopTouchEventsPropagation) {
        this.stopPropagation(event)
      }
      // jQuery doesn't copy touch event properties by default,
      // so we have to access the originalEvent object:
      var touches = (event.originalEvent || event).touches[0]
      var scale = (event.originalEvent || event).scale
      var index = this.index
      var touchDeltaX
      var indices
      // Ensure this is a one touch swipe and not, e.g. a pinch:
      if (touches.length > 1 || (scale && scale !== 1)) {
        return
      }
      if (this.options.disableScroll) {
        event.preventDefault()
      }
      // Measure change in x and y coordinates:
      this.touchDelta = {
        x: touches.pageX - this.touchStart.x,
        y: touches.pageY - this.touchStart.y
      }
      touchDeltaX = this.touchDelta.x
      // Detect if this is a vertical scroll movement (run only once per touch):
      if (this.isScrolling === undefined) {
        this.isScrolling =
          this.isScrolling ||
          Math.abs(touchDeltaX) < Math.abs(this.touchDelta.y)
      }
      if (!this.isScrolling) {
        // Always prevent horizontal scroll:
        event.preventDefault()
        // Stop the slideshow:
        window.clearTimeout(this.timeout)
        if (this.options.continuous) {
          indices = [this.circle(index + 1), index, this.circle(index - 1)]
        } else {
          // Increase resistance if first slide and sliding left
          // or last slide and sliding right:
          this.touchDelta.x = touchDeltaX =
            touchDeltaX /
            ((!index && touchDeltaX > 0) ||
            (index === this.num - 1 && touchDeltaX < 0)
              ? Math.abs(touchDeltaX) / this.slideWidth + 1
              : 1)
          indices = [index]
          if (index) {
            indices.push(index - 1)
          }
          if (index < this.num - 1) {
            indices.unshift(index + 1)
          }
        }
        while (indices.length) {
          index = indices.pop()
          this.translateX(index, touchDeltaX + this.positions[index], 0)
        }
      } else {
        this.translateY(index, this.touchDelta.y + this.positions[index], 0)
      }
    },

    ontouchend: function(event) {
      if (this.options.stopTouchEventsPropagation) {
        this.stopPropagation(event)
      }
      var index = this.index
      var speed = this.options.transitionSpeed
      var slideWidth = this.slideWidth
      var isShortDuration = Number(Date.now() - this.touchStart.time) < 250
      // Determine if slide attempt triggers next/prev slide:
      var isValidSlide =
        (isShortDuration && Math.abs(this.touchDelta.x) > 20) ||
        Math.abs(this.touchDelta.x) > slideWidth / 2
      // Determine if slide attempt is past start or end:
      var isPastBounds =
        (!index && this.touchDelta.x > 0) ||
        (index === this.num - 1 && this.touchDelta.x < 0)
      var isValidClose =
        !isValidSlide &&
        this.options.closeOnSwipeUpOrDown &&
        ((isShortDuration && Math.abs(this.touchDelta.y) > 20) ||
          Math.abs(this.touchDelta.y) > this.slideHeight / 2)
      var direction
      var indexForward
      var indexBackward
      var distanceForward
      var distanceBackward
      if (this.options.continuous) {
        isPastBounds = false
      }
      // Determine direction of swipe (true: right, false: left):
      direction = this.touchDelta.x < 0 ? -1 : 1
      if (!this.isScrolling) {
        if (isValidSlide && !isPastBounds) {
          indexForward = index + direction
          indexBackward = index - direction
          distanceForward = slideWidth * direction
          distanceBackward = -slideWidth * direction
          if (this.options.continuous) {
            this.move(this.circle(indexForward), distanceForward, 0)
            this.move(this.circle(index - 2 * direction), distanceBackward, 0)
          } else if (indexForward >= 0 && indexForward < this.num) {
            this.move(indexForward, distanceForward, 0)
          }
          this.move(index, this.positions[index] + distanceForward, speed)
          this.move(
            this.circle(indexBackward),
            this.positions[this.circle(indexBackward)] + distanceForward,
            speed
          )
          index = this.circle(indexBackward)
          this.onslide(index)
        } else {
          // Move back into position
          if (this.options.continuous) {
            this.move(this.circle(index - 1), -slideWidth, speed)
            this.move(index, 0, speed)
            this.move(this.circle(index + 1), slideWidth, speed)
          } else {
            if (index) {
              this.move(index - 1, -slideWidth, speed)
            }
            this.move(index, 0, speed)
            if (index < this.num - 1) {
              this.move(index + 1, slideWidth, speed)
            }
          }
        }
      } else {
        if (isValidClose) {
          this.close()
        } else {
          // Move back into position
          this.translateY(index, 0, speed)
        }
      }
    },

    ontouchcancel: function(event) {
      if (this.touchStart) {
        this.ontouchend(event)
        delete this.touchStart
      }
    },

    ontransitionend: function(event) {
      var slide = this.slides[this.index]
      if (!event || slide === event.target) {
        if (this.interval) {
          this.play()
        }
        this.setTimeout(this.options.onslideend, [this.index, slide])
      }
    },

    oncomplete: function(event) {
      var target = event.target || event.srcElement
      var parent = target && target.parentNode
      var index
      if (!target || !parent) {
        return
      }
      index = this.getNodeIndex(parent)
      $(parent).removeClass(this.options.slideLoadingClass)
      if (event.type === 'error') {
        $(parent).addClass(this.options.slideErrorClass)
        this.elements[index] = 3 // Fail
      } else {
        this.elements[index] = 2 // Done
      }
      // Fix for IE7's lack of support for percentage max-height:
      if (target.clientHeight > this.container[0].clientHeight) {
        target.style.maxHeight = this.container[0].clientHeight
      }
      if (this.interval && this.slides[this.index] === parent) {
        this.play()
      }
      this.setTimeout(this.options.onslidecomplete, [index, parent])
    },

    onload: function(event) {
      this.oncomplete(event)
    },

    onerror: function(event) {
      this.oncomplete(event)
    },

    onkeydown: function(event) {
      switch (event.which || event.keyCode) {
        case 13: // Return
          if (this.options.toggleControlsOnReturn) {
            this.preventDefault(event)
            this.toggleControls()
          }
          break
        case 27: // Esc
          if (this.options.closeOnEscape) {
            this.close()
            // prevent Esc from closing other things
            event.stopImmediatePropagation()
          }
          break
        case 32: // Space
          if (this.options.toggleSlideshowOnSpace) {
            this.preventDefault(event)
            this.toggleSlideshow()
          }
          break
        case 37: // Left
          if (this.options.enableKeyboardNavigation) {
            this.preventDefault(event)
            this.prev()
          }
          break
        case 39: // Right
          if (this.options.enableKeyboardNavigation) {
            this.preventDefault(event)
            this.next()
          }
          break
      }
    },

    handleClick: function(event) {
      var options = this.options
      var target = event.target || event.srcElement
      var parent = target.parentNode
      /**
       * Checks if the target from the close has the given class
       *
       * @param {string} className Class name
       * @returns {boolean} Returns true if the target has the class name
       */
      function isTarget(className) {
        return $(target).hasClass(className) || $(parent).hasClass(className)
      }
      if (isTarget(options.toggleClass)) {
        // Click on "toggle" control
        this.preventDefault(event)
        this.toggleControls()
      } else if (isTarget(options.prevClass)) {
        // Click on "prev" control
        this.preventDefault(event)
        this.prev()
      } else if (isTarget(options.nextClass)) {
        // Click on "next" control
        this.preventDefault(event)
        this.next()
      } else if (isTarget(options.closeClass)) {
        // Click on "close" control
        this.preventDefault(event)
        this.close()
      } else if (isTarget(options.playPauseClass)) {
        // Click on "play-pause" control
        this.preventDefault(event)
        this.toggleSlideshow()
      } else if (parent === this.slidesContainer[0]) {
        // Click on slide background
        if (options.closeOnSlideClick) {
          this.preventDefault(event)
          this.close()
        } else if (options.toggleControlsOnSlideClick) {
          this.preventDefault(event)
          this.toggleControls()
        }
      } else if (
        parent.parentNode &&
        parent.parentNode === this.slidesContainer[0]
      ) {
        // Click on displayed element
        if (options.toggleControlsOnSlideClick) {
          this.preventDefault(event)
          this.toggleControls()
        }
      }
    },

    onclick: function(event) {
      if (
        this.options.emulateTouchEvents &&
        this.touchDelta &&
        (Math.abs(this.touchDelta.x) > 20 || Math.abs(this.touchDelta.y) > 20)
      ) {
        delete this.touchDelta
        return
      }
      return this.handleClick(event)
    },

    updateEdgeClasses: function(index) {
      if (!index) {
        this.container.addClass(this.options.leftEdgeClass)
      } else {
        this.container.removeClass(this.options.leftEdgeClass)
      }
      if (index === this.num - 1) {
        this.container.addClass(this.options.rightEdgeClass)
      } else {
        this.container.removeClass(this.options.rightEdgeClass)
      }
    },

    handleSlide: function(index) {
      if (!this.options.continuous) {
        this.updateEdgeClasses(index)
      }
      this.loadElements(index)
      if (this.options.unloadElements) {
        this.unloadElements(index)
      }
      this.setTitle(index)
    },

    onslide: function(index) {
      this.index = index
      this.handleSlide(index)
      this.setTimeout(this.options.onslide, [index, this.slides[index]])
    },

    setTitle: function(index) {
      var firstChild = this.slides[index].firstChild
      var text = firstChild.title || firstChild.alt
      var titleElement = this.titleElement
      if (titleElement.length) {
        this.titleElement.empty()
        if (text) {
          titleElement[0].appendChild(document.createTextNode(text))
        }
      }
    },

    setTimeout: function(func, args, wait) {
      var that = this
      return (
        func &&
        window.setTimeout(function() {
          func.apply(that, args || [])
        }, wait || 0)
      )
    },

    imageFactory: function(obj, callback) {
      var that = this
      var img = this.imagePrototype.cloneNode(false)
      var url = obj
      var backgroundSize = this.options.stretchImages
      var called
      var element
      var title
      var altText
      /**
       * Wraps the callback function for the load/error event
       *
       * @param {event} event load/error event
       * @returns {number} timeout ID
       */
      function callbackWrapper(event) {
        if (!called) {
          event = {
            type: event.type,
            target: element
          }
          if (!element.parentNode) {
            // Fix for IE7 firing the load event for
            // cached images before the element could
            // be added to the DOM:
            return that.setTimeout(callbackWrapper, [event])
          }
          called = true
          $(img).off('load error', callbackWrapper)
          if (backgroundSize) {
            if (event.type === 'load') {
              element.style.background = 'url("' + url + '") center no-repeat'
              element.style.backgroundSize = backgroundSize
            }
          }
          callback(event)
        }
      }
      if (typeof url !== 'string') {
        url = this.getItemProperty(obj, this.options.urlProperty)
        title = this.getItemProperty(obj, this.options.titleProperty)
        altText =
          this.getItemProperty(obj, this.options.altTextProperty) || title
      }
      if (backgroundSize === true) {
        backgroundSize = 'contain'
      }
      backgroundSize =
        this.support.backgroundSize &&
        this.support.backgroundSize[backgroundSize] &&
        backgroundSize
      if (backgroundSize) {
        element = this.elementPrototype.cloneNode(false)
      } else {
        element = img
        img.draggable = false
      }
      if (title) {
        element.title = title
      }
      if (altText) {
        element.alt = altText
      }
      $(img).on('load error', callbackWrapper)
      img.src = url
      return element
    },

    createElement: function(obj, callback) {
      var type = obj && this.getItemProperty(obj, this.options.typeProperty)
      var factory =
        (type && this[type.split('/')[0] + 'Factory']) || this.imageFactory
      var element = obj && factory.call(this, obj, callback)
      var srcset = this.getItemProperty(obj, this.options.srcsetProperty)
      if (!element) {
        element = this.elementPrototype.cloneNode(false)
        this.setTimeout(callback, [
          {
            type: 'error',
            target: element
          }
        ])
      }
      if (srcset) {
        element.setAttribute('srcset', srcset)
      }
      $(element).addClass(this.options.slideContentClass)
      return element
    },

    loadElement: function(index) {
      if (!this.elements[index]) {
        if (this.slides[index].firstChild) {
          this.elements[index] = $(this.slides[index]).hasClass(
            this.options.slideErrorClass
          )
            ? 3
            : 2
        } else {
          this.elements[index] = 1 // Loading
          $(this.slides[index]).addClass(this.options.slideLoadingClass)
          this.slides[index].appendChild(
            this.createElement(this.list[index], this.proxyListener)
          )
        }
      }
    },

    loadElements: function(index) {
      var limit = Math.min(this.num, this.options.preloadRange * 2 + 1)
      var j = index
      var i
      for (i = 0; i < limit; i += 1) {
        // First load the current slide element (0),
        // then the next one (+1),
        // then the previous one (-2),
        // then the next after next (+2), etc.:
        j += i * (i % 2 === 0 ? -1 : 1)
        // Connect the ends of the list to load slide elements for
        // continuous navigation:
        j = this.circle(j)
        this.loadElement(j)
      }
    },

    unloadElements: function(index) {
      var i, diff
      for (i in this.elements) {
        if (Object.prototype.hasOwnProperty.call(this.elements, i)) {
          diff = Math.abs(index - i)
          if (
            diff > this.options.preloadRange &&
            diff + this.options.preloadRange < this.num
          ) {
            this.unloadSlide(i)
            delete this.elements[i]
          }
        }
      }
    },

    addSlide: function(index) {
      var slide = this.slidePrototype.cloneNode(false)
      slide.setAttribute('data-index', index)
      this.slidesContainer[0].appendChild(slide)
      this.slides.push(slide)
    },

    positionSlide: function(index) {
      var slide = this.slides[index]
      slide.style.width = this.slideWidth + 'px'
      if (this.support.transform) {
        slide.style.left = index * -this.slideWidth + 'px'
        this.move(
          index,
          this.index > index
            ? -this.slideWidth
            : this.index < index
            ? this.slideWidth
            : 0,
          0
        )
      }
    },

    initSlides: function(reload) {
      var clearSlides, i
      if (!reload) {
        this.positions = []
        this.positions.length = this.num
        this.elements = {}
        this.imagePrototype = document.createElement('img')
        this.elementPrototype = document.createElement('div')
        this.slidePrototype = document.createElement('div')
        $(this.slidePrototype).addClass(this.options.slideClass)
        this.slides = this.slidesContainer[0].children
        clearSlides =
          this.options.clearSlides || this.slides.length !== this.num
      }
      this.slideWidth = this.container[0].clientWidth
      this.slideHeight = this.container[0].clientHeight
      this.slidesContainer[0].style.width = this.num * this.slideWidth + 'px'
      if (clearSlides) {
        this.resetSlides()
      }
      for (i = 0; i < this.num; i += 1) {
        if (clearSlides) {
          this.addSlide(i)
        }
        this.positionSlide(i)
      }
      // Reposition the slides before and after the given index:
      if (this.options.continuous && this.support.transform) {
        this.move(this.circle(this.index - 1), -this.slideWidth, 0)
        this.move(this.circle(this.index + 1), this.slideWidth, 0)
      }
      if (!this.support.transform) {
        this.slidesContainer[0].style.left =
          this.index * -this.slideWidth + 'px'
      }
    },

    unloadSlide: function(index) {
      var slide, firstChild
      slide = this.slides[index]
      firstChild = slide.firstChild
      if (firstChild !== null) {
        slide.removeChild(firstChild)
      }
    },

    unloadAllSlides: function() {
      var i, len
      for (i = 0, len = this.slides.length; i < len; i++) {
        this.unloadSlide(i)
      }
    },

    toggleControls: function() {
      var controlsClass = this.options.controlsClass
      if (this.container.hasClass(controlsClass)) {
        this.container.removeClass(controlsClass)
      } else {
        this.container.addClass(controlsClass)
      }
    },

    toggleSlideshow: function() {
      if (!this.interval) {
        this.play()
      } else {
        this.pause()
      }
    },

    getNodeIndex: function(element) {
      return parseInt(element.getAttribute('data-index'), 10)
    },

    getNestedProperty: function(obj, property) {
      property.replace(
        // Matches native JavaScript notation in a String,
        // e.g. '["doubleQuoteProp"].dotProp[2]'
        // eslint-disable-next-line no-useless-escape
        /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
        function(str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
          var prop =
            dotProp ||
            singleQuoteProp ||
            doubleQuoteProp ||
            (arrayIndex && parseInt(arrayIndex, 10))
          if (str && obj) {
            obj = obj[prop]
          }
        }
      )
      return obj
    },

    getDataProperty: function(obj, property) {
      var key
      var prop
      if (obj.dataset) {
        key = property.replace(/-([a-z])/g, function(_, b) {
          return b.toUpperCase()
        })
        prop = obj.dataset[key]
      } else if (obj.getAttribute) {
        prop = obj.getAttribute(
          'data-' + property.replace(/([A-Z])/g, '-$1').toLowerCase()
        )
      }
      if (typeof prop === 'string') {
        // eslint-disable-next-line no-useless-escape
        if (
          /^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(prop)
        ) {
          try {
            return $.parseJSON(prop)
          } catch (ignore) {
            // ignore JSON parsing errors
          }
        }
        return prop
      }
    },

    getItemProperty: function(obj, property) {
      var prop = this.getDataProperty(obj, property)
      if (prop === undefined) {
        prop = obj[property]
      }
      if (prop === undefined) {
        prop = this.getNestedProperty(obj, property)
      }
      return prop
    },

    initStartIndex: function() {
      var index = this.options.index
      var urlProperty = this.options.urlProperty
      var i
      // Check if the index is given as a list object:
      if (index && typeof index !== 'number') {
        for (i = 0; i < this.num; i += 1) {
          if (
            this.list[i] === index ||
            this.getItemProperty(this.list[i], urlProperty) ===
              this.getItemProperty(index, urlProperty)
          ) {
            index = i
            break
          }
        }
      }
      // Make sure the index is in the list range:
      this.index = this.circle(parseInt(index, 10) || 0)
    },

    initEventListeners: function() {
      var that = this
      var slidesContainer = this.slidesContainer
      /**
       * Proxy listener
       *
       * @param {event} event original event
       */
      function proxyListener(event) {
        var type =
          that.support.transition && that.support.transition.end === event.type
            ? 'transitionend'
            : event.type
        that['on' + type](event)
      }
      $(window).on('resize', proxyListener)
      $(document.body).on('keydown', proxyListener)
      this.container.on('click', proxyListener)
      if (this.support.touch) {
        slidesContainer.on(
          'touchstart touchmove touchend touchcancel',
          proxyListener
        )
      } else if (this.options.emulateTouchEvents && this.support.transition) {
        slidesContainer.on(
          'mousedown mousemove mouseup mouseout',
          proxyListener
        )
      }
      if (this.support.transition) {
        slidesContainer.on(this.support.transition.end, proxyListener)
      }
      this.proxyListener = proxyListener
    },

    destroyEventListeners: function() {
      var slidesContainer = this.slidesContainer
      var proxyListener = this.proxyListener
      $(window).off('resize', proxyListener)
      $(document.body).off('keydown', proxyListener)
      this.container.off('click', proxyListener)
      if (this.support.touch) {
        slidesContainer.off(
          'touchstart touchmove touchend touchcancel',
          proxyListener
        )
      } else if (this.options.emulateTouchEvents && this.support.transition) {
        slidesContainer.off(
          'mousedown mousemove mouseup mouseout',
          proxyListener
        )
      }
      if (this.support.transition) {
        slidesContainer.off(this.support.transition.end, proxyListener)
      }
    },

    handleOpen: function() {
      if (this.options.onopened) {
        this.options.onopened.call(this)
      }
    },

    initWidget: function() {
      var that = this
      /**
       * Open handler
       *
       * @param {event} event Gallery open event
       */
      function openHandler(event) {
        if (event.target === that.container[0]) {
          that.container.off(that.support.transition.end, openHandler)
          that.handleOpen()
        }
      }
      this.container = $(this.options.container)
      if (!this.container.length) {
        this.console.log(
          'blueimp Gallery: Widget container not found.',
          this.options.container
        )
        return false
      }
      this.slidesContainer = this.container
        .find(this.options.slidesContainer)
        .first()
      if (!this.slidesContainer.length) {
        this.console.log(
          'blueimp Gallery: Slides container not found.',
          this.options.slidesContainer
        )
        return false
      }
      this.titleElement = this.container.find(this.options.titleElement).first()
      if (this.num === 1) {
        this.container.addClass(this.options.singleClass)
      }
      if (this.options.onopen) {
        this.options.onopen.call(this)
      }
      if (this.support.transition && this.options.displayTransition) {
        this.container.on(this.support.transition.end, openHandler)
      } else {
        this.handleOpen()
      }
      if (this.options.hidePageScrollbars) {
        // Hide the page scrollbars:
        this.bodyOverflowStyle = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }
      this.container[0].style.display = 'block'
      this.initSlides()
      this.container.addClass(this.options.displayClass)
    },

    initOptions: function(options) {
      // Create a copy of the prototype options:
      this.options = $.extend({}, this.options)
      // Check if carousel mode is enabled:
      if (
        (options && options.carousel) ||
        (this.options.carousel && (!options || options.carousel !== false))
      ) {
        $.extend(this.options, this.carouselOptions)
      }
      // Override any given options:
      $.extend(this.options, options)
      if (this.num < 3) {
        // 1 or 2 slides cannot be displayed continuous,
        // remember the original option by setting to null instead of false:
        this.options.continuous = this.options.continuous ? null : false
      }
      if (!this.support.transition) {
        this.options.emulateTouchEvents = false
      }
      if (this.options.event) {
        this.preventDefault(this.options.event)
      }
    }
  })

  return Gallery
})


/***/ }),

/***/ "./node_modules/blueimp-gallery/js/blueimp-helper.js":
/*!***********************************************************!*\
  !*** ./node_modules/blueimp-gallery/js/blueimp-helper.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * blueimp helper JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define */

/* eslint-disable no-param-reassign */

;(function() {
  'use strict'

  /**
   * Object.assign polyfill
   *
   * @param {object} obj1 First object
   * @param {object} obj2 Second object
   * @returns {object} Merged object
   */
  function extend(obj1, obj2) {
    var prop
    for (prop in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
        obj1[prop] = obj2[prop]
      }
    }
    return obj1
  }
  /**
   * Helper constructor
   *
   * @class
   * @param {*} query jQuery type query argument
   */
  function Helper(query) {
    if (!this || this.find !== Helper.prototype.find) {
      // Called as function instead of as constructor,
      // so we simply return a new instance:
      return new Helper(query)
    }
    this.length = 0
    if (query) {
      if (typeof query === 'string') {
        query = this.find(query)
      }
      if (query.nodeType || query === query.window) {
        // Single HTML element
        this.length = 1
        this[0] = query
      } else {
        // HTML element collection
        var i = query.length
        this.length = i
        while (i) {
          i -= 1
          this[i] = query[i]
        }
      }
    }
  }

  Helper.extend = extend

  Helper.contains = function(container, element) {
    do {
      element = element.parentNode
      if (element === container) {
        return true
      }
    } while (element)
    return false
  }

  Helper.parseJSON = function(string) {
    return window.JSON && JSON.parse(string)
  }

  extend(Helper.prototype, {
    find: function(query) {
      var container = this[0] || document
      if (typeof query === 'string') {
        if (container.querySelectorAll) {
          query = container.querySelectorAll(query)
        } else if (query.charAt(0) === '#') {
          query = container.getElementById(query.slice(1))
        } else {
          query = container.getElementsByTagName(query)
        }
      }
      return new Helper(query)
    },

    hasClass: function(className) {
      if (!this[0]) {
        return false
      }
      return new RegExp('(^|\\s+)' + className + '(\\s+|$)').test(
        this[0].className
      )
    },

    addClass: function(className) {
      var i = this.length
      var element
      while (i) {
        i -= 1
        element = this[i]
        if (!element.className) {
          element.className = className
          return this
        }
        if (this.hasClass(className)) {
          return this
        }
        element.className += ' ' + className
      }
      return this
    },

    removeClass: function(className) {
      var regexp = new RegExp('(^|\\s+)' + className + '(\\s+|$)')
      var i = this.length
      var element
      while (i) {
        i -= 1
        element = this[i]
        element.className = element.className.replace(regexp, ' ')
      }
      return this
    },

    on: function(eventName, handler) {
      var eventNames = eventName.split(/\s+/)
      var i
      var element
      while (eventNames.length) {
        eventName = eventNames.shift()
        i = this.length
        while (i) {
          i -= 1
          element = this[i]
          if (element.addEventListener) {
            element.addEventListener(eventName, handler, false)
          } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, handler)
          }
        }
      }
      return this
    },

    off: function(eventName, handler) {
      var eventNames = eventName.split(/\s+/)
      var i
      var element
      while (eventNames.length) {
        eventName = eventNames.shift()
        i = this.length
        while (i) {
          i -= 1
          element = this[i]
          if (element.removeEventListener) {
            element.removeEventListener(eventName, handler, false)
          } else if (element.detachEvent) {
            element.detachEvent('on' + eventName, handler)
          }
        }
      }
      return this
    },

    empty: function() {
      var i = this.length
      var element
      while (i) {
        i -= 1
        element = this[i]
        while (element.hasChildNodes()) {
          element.removeChild(element.lastChild)
        }
      }
      return this
    },

    first: function() {
      return new Helper(this[0])
    }
  })

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return Helper
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})()


/***/ }),

/***/ "./node_modules/scrollstory/jquery.scrollstory.js":
/*!********************************************************!*\
  !*** ./node_modules/scrollstory/jquery.scrollstory.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* @preserve ScrollStory - vVERSIONXXX - YYYY-MM-DDXXX
* https://github.com/sjwilliams/scrollstory
* Copyright (c) 2017 Josh Williams; Licensed MIT 
*/

(function(factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(function($, undefined) {

  var pluginName = 'scrollStory';
  var eventNameSpace = '.' + pluginName;
  var defaults = {

    // jquery object, class selector string, or array of values, or null (to use existing DOM)
    content: null,

    // Only used if content null. Should be a class selector
    contentSelector: '.story',

    // Left/right keys to navigate
    keyboard: true,

    // Offset from top used in the programatic scrolling of an
    // item to the focus position. Useful in the case of thinks like
    // top nav that might obscure part of an item if it goes to 0.
    scrollOffset: 0,

    // Offset from top to trigger a change
    triggerOffset: 0,

    // Event to monitor. Can be a name for an event on the $(window), or
    // a function that defines custom behavior. Defaults to native scroll event.
    scrollEvent: 'scroll',

    // Automatically activate the first item on load, 
    // regardless of its position relative to the offset
    autoActivateFirstItem: false,

    // Disable last item -- and the entire widget -- once it's scroll beyond the trigger point
    disablePastLastItem: true,

    // Automated scroll speed in ms. Set to 0 to remove animation.
    speed: 800,

    // Scroll easing. 'swing' or 'linear', unless an external plugin provides others
    // http://api.jquery.com/animate/
    easing: 'swing',

    // // scroll-based events are either 'debounce' or 'throttle'
    throttleType: 'throttle',

    // frequency in milliseconds to perform scroll-based functions. Scrolling functions 
    // can be CPU intense, so higher number can help performance.
    scrollSensitivity: 100,

    // options to pass to underscore's throttle or debounce for scroll
    // see: http://underscorejs.org/#throttle && http://underscorejs.org/#debounce
    throttleTypeOptions: null,

    // Update offsets after likely repaints, like window resizes and filters
    autoUpdateOffsets: true,

    debug: false,

    // whether or not the scroll checking is enabled.
    enabled: true,

    setup: $.noop,
    destroy: $.noop,
    itembuild: $.noop,
    itemfocus: $.noop,
    itemblur: $.noop,
    itemfilter: $.noop,
    itemunfilter: $.noop,
    itementerviewport: $.noop,
    itemexitviewport: $.noop,
    categoryfocus: $.noop,
    categeryblur: $.noop,
    containeractive: $.noop,
    containerinactive: $.noop,
    containerresize: $.noop,
    containerscroll: $.noop,
    updateoffsets: $.noop,
    triggeroffsetupdate: $.noop,
    scrolloffsetupdate: $.noop,
    complete: $.noop
  };

  // static across all plugin instances
  // so we can uniquely ID elements
  var instanceCounter = 0;




  /**
   * Utility methods
   *
   * debounce() and throttle() are from on Underscore.js:
   * https://github.com/jashkenas/underscore
   */

  /**
   * Underscore's now:
   * http://underscorejs.org/now
   */
  var dateNow = Date.now || function() {
    return new Date().getTime();
  };

  /**
   * Underscore's debounce:
   * http://underscorejs.org/#debounce
   */
  var debounce = function(func, wait, immediate) {
    var result;
    var timeout = null;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
      }
      return result;
    };
  };

  /**
   * Underscore's throttle:
   * http://underscorejs.org/#throttle
   */
  var throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : dateNow();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = dateNow();
      if (!previous && options.leading === false) {
        previous = now;
      }
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  var $window = $(window);
  var winHeight = $window.height(); // cached. updated via _handleResize()

  /**
   * Given a scroll/trigger offset, determine
   * its pixel value from the top of the viewport. 
   * 
   * If number or number-like string (30 or '30'), return that 
   * number. (30)
   *
   * If it's a percentage string ('30%'), convert to pixels
   * based on the height of the viewport. (eg: 395) 
   * 
   * @param  {String/Number} offset
   * @return {Number}
   */
  var offsetToPx = function(offset){
    var pxOffset;

    if (offsetIsAPercentage(offset)) {
      pxOffset = offset.slice(0, -1);
      pxOffset = Math.round(winHeight * (parseInt(pxOffset, 10)/100) );
    } else {
      pxOffset = parseInt(offset, 10);
    }

    return pxOffset;
  };

  var offsetIsAPercentage = function(offset){
    return typeof offset === 'string' && offset.slice(-1) === '%';
  };


  function ScrollStory(element, options) {
    this.el = element;
    this.$el = $(element);
    this.options = $.extend({}, defaults, options);

    this.useNativeScroll = (typeof this.options.scrollEvent === 'string') && (this.options.scrollEvent.indexOf('scroll') === 0);

    this._defaults = defaults;
    this._name = pluginName;
    this._instanceId = (function() {
      return pluginName + '_' + instanceCounter;
    })();
    
    this.init();
  }

  ScrollStory.prototype = {
    init: function() {
      
      /**
       * List of all items, and a quick lockup hash
       * Data populated via _prepItems* methods
       */
      this._items = [];
      this._itemsById = {};
      this._categories = [];
      this._tags = [];

      this._isActive = false;
      this._activeItem;
      this._previousItems = [];

      /**
       * Attach handlers before any events are dispatched
       */
      this.$el.on('setup'+eventNameSpace, this._onSetup.bind(this));
      this.$el.on('destroy'+eventNameSpace, this._onDestroy.bind(this));
      this.$el.on('containeractive'+eventNameSpace, this._onContainerActive.bind(this));
      this.$el.on('containerinactive'+eventNameSpace, this._onContainerInactive.bind(this));
      this.$el.on('itemblur'+eventNameSpace, this._onItemBlur.bind(this));
      this.$el.on('itemfocus'+eventNameSpace, this._onItemFocus.bind(this));
      this.$el.on('itementerviewport'+eventNameSpace, this._onItemEnterViewport.bind(this));
      this.$el.on('itemexitviewport'+eventNameSpace, this._onItemExitViewport.bind(this));
      this.$el.on('itemfilter'+eventNameSpace, this._onItemFilter.bind(this));
      this.$el.on('itemunfilter'+eventNameSpace, this._onItemUnfilter.bind(this));
      this.$el.on('categoryfocus'+eventNameSpace, this._onCategoryFocus.bind(this));
      this.$el.on('triggeroffsetupdate'+eventNameSpace, this._onTriggerOffsetUpdate.bind(this));


      /**
       * Run before any items have been added, allows
       * for user manipulation of page before ScrollStory
       * acts on anything.
       */
      this._trigger('setup', null, this);


      /**
       * Convert data from outside of widget into
       * items and, if needed, categories of items.
       *
       * Don't 'handleRepaints' just yet, as that'll
       * set an active item. We want to do that after
       * our 'complete' event is triggered.
       */
      this.addItems(this.options.content, {
        handleRepaint: false
      });

      // 1. offsets need to be accurate before 'complete'
      this.updateOffsets();

      // 2. handle any user actions
      this._trigger('complete', null, this);

      // 3. Set active item, and double check 
      // scroll position and offsets.
      if(this.options.enabled){
        this._handleRepaint();
      }


      /**
       * Bind keyboard events
       */
      if (this.options.keyboard) {
        $(document).keydown(function(e){
          var captured = true;
          switch (e.keyCode) {
            case 37:
              if (e.metaKey) {return;} // ignore ctrl/cmd left, as browsers use that to go back in history
              this.previous();
              break; // left arrow
            case 39:
              this.next();
              break; // right arrow
            default:
              captured = false;
          }
          return !captured;
        }.bind(this));
      }



      /**
       * Debug UI
       */
      this.$trigger = $('<div class="' + pluginName + 'Trigger"></div>').css({
        position: 'fixed',
        width: '100%',
        height: '1px',
        top: offsetToPx(this.options.triggerOffset) + 'px',
        left: '0px',
        backgroundColor: '#ff0000',
        '-webkit-transform': 'translateZ(0)',
        '-webkit-backface-visibility': 'hidden',
        zIndex: 1000
      }).attr('id', pluginName + 'Trigger-' + this._instanceId);
      
      if (this.options.debug) {
        this.$trigger.appendTo('body');
      }


      /**
       * Watch either native scroll events, throttled by 
       * this.options.scrollSensitivity, or a custom event 
       * that implements its own throttling.
       *
       * Bind these events after 'complete' trigger so no
       * items are active when those callbacks runs.
       */
      
      var scrollThrottle, scrollHandler;

      if(this.useNativeScroll){

        // bind and throttle native scroll
        scrollThrottle = (this.options.throttleType === 'throttle') ? throttle : debounce;
        scrollHandler = scrollThrottle(this._handleScroll.bind(this), this.options.scrollSensitivity, this.options.throttleTypeOptions);
        $window.on('scroll'+eventNameSpace, scrollHandler);
      } else {

        // bind but don't throttle custom event
        scrollHandler = this._handleScroll.bind(this);

        // if custom event is a function, it'll need
        // to call the scroll handler manually, like so:
        //
        //  $container.scrollStory({
        //    scrollEvent: function(cb){
        //      // custom scroll event on nytimes.com
        //      PageManager.on('nyt:page-scroll', function(){
        //       // do something interesting if you like
        //       // and then call the passed in handler();
        //       cb();
        //     });
        //    }
        //  });
        //
        //
        // Otherwise, it's a string representing an event on the
        // window to subscribe to, like so:
        //
        // // some code dispatching throttled events
        // $window.trigger('nytg-scroll');
        // 
        //  $container.scrollStory({
        //    scrollEvent: 'nytg-scroll'
        //  });
        //

        if (typeof this.options.scrollEvent === 'function') {
          this.options.scrollEvent(scrollHandler);
        } else {
          $window.on(this.options.scrollEvent+eventNameSpace, function(){
            scrollHandler();
          });
        }
      }

      // anything that might cause a repaint      
      var resizeThrottle = debounce(this._handleResize, 100);
      $window.on('DOMContentLoaded'+eventNameSpace + ' load'+eventNameSpace + ' resize'+eventNameSpace, resizeThrottle.bind(this));

      instanceCounter = instanceCounter + 1;
    },


    /**
     * Get current item's index, 
     * or set the current item with an index.
     * @param  {Number} index
     * @param  {Function} callback
     * @return {Number} index of active item
     */
    index: function(index, callback) {
      if (typeof index === 'number' && this.getItemByIndex(index)) {
        this.setActiveItem(this.getItemByIndex(index), {}, callback);
      } else {
        return this.getActiveItem().index;
      }
    },


    /**
     * Convenience method to navigate to next item
     *
     * @param  {Number} _index -- an optional index. Used to recursively find unflitered item 
     */
    next: function(_index) {
      var currentIndex = _index || this.index();
      var nextItem;

      if (typeof currentIndex === 'number') {
        nextItem = this.getItemByIndex(currentIndex + 1);

        // valid index and item
        if (nextItem) {

          // proceed if not filtered. if filtered try the one after that.
          if (!nextItem.filtered) {
            this.index(currentIndex + 1);
          } else {
            this.next(currentIndex + 1);
          }
        }
      }
    },


    /**
     * Convenience method to navigate to previous item
     *
     * @param  {Number} _index -- an optional index. Used to recursively find unflitered item 
     */
    previous: function(_index) {
      var currentIndex = _index || this.index();
      var previousItem;

      if (typeof currentIndex === 'number') {
        previousItem = this.getItemByIndex(currentIndex - 1);

        // valid index and item
        if (previousItem) {

          // proceed if not filtered. if filtered try the one before that.
          if (!previousItem.filtered) {
            this.index(currentIndex - 1);            
          } else {
            this.previous(currentIndex - 1);
          }
        }
      }
    },


    /**
     * The active item object.
     * 
     * @return {Object}
     */
    getActiveItem: function() {
      return this._activeItem;
    },


    /**
     * Given an item object, make it active,
     * including updating its scroll position. 
     * 
     * @param {Object} item
     */
    setActiveItem: function(item, options, callback) {
      options = options || {};

      // verify item
      if (item.id && this.getItemById(item.id)) {
        this._scrollToItem(item, options, callback);
      }
    },


    /**
     * Iterate over each item, passing the item to a callback.
     *
     * this.each(function(item){ console.log(item.id) });
     *
     * @param {Function}
     */
    each: function(callback) {
      this.applyToAllItems(callback);
    },


    /**
     * Return number of items
     * @return {Number}
     */
    getLength: function() {
      return this.getItems().length;
    },

    /**
     * Return array of all items
     * @return {Array}
     */
    getItems: function() {
      return this._items;
    },


    /**
     * Given an item id, return item object with that id.
     *
     * @param  {string} id
     * @return {Object}
     */
    getItemById: function(id) {
      return this._itemsById[id];
    },


    /**
     * Given an item index, return item object with that index.
     *
     * @param  {Integer} index
     * @return {Object}
     */
    getItemByIndex: function(index) {
      return this._items[index];
    },


    /**
     * Return an array of items that pass an abritrary truth test.
     *
     * Example: this.getItemsBy(function(item){return item.data.slug=='josh_williams'})
     *
     * @param {Function} truthTest The function to check all items against
     * @return {Array} Array of item objects
     */
    getItemsBy: function(truthTest) {
      if (typeof truthTest !== 'function') {
        throw new Error('You must provide a truthTest function');
      }

      return this.getItems().filter(function(item) {
        return truthTest(item);
      });
    },


    /**
     * Returns an array of items where all the properties
     * match an item's properties. Property tests can be
     * any combination of:
     *
     * 1. Values
     * this.getItemsWhere({index:2});
     * this.getItemsWhere({filtered:false});
     * this.getItemsWhere({category:'cats', width: 300});
     *
     * 2. Methods that return a value
     * this.getItemsWhere({width: function(width){ return 216 + 300;}});
     *
     * 3. Methods that return a boolean
     * this.getItemsWhere({index: function(index){ return index > 2; } });
     *
     * Mix and match:
     * this.getItemsWehre({filtered:false, index: function(index){ return index < 30;} })
     *
     * @param  {Object} properties
     * @return {Array} Array of item objects
     */
    getItemsWhere: function(properties) {
      var keys,
        items = []; // empty if properties obj not passed in

      if ($.isPlainObject(properties)) {
        keys = Object.keys(properties); // properties to check in each item
        items = this.getItemsBy(function(item) {
          var isMatch = keys.every(function(key) {
            var match;

            // type 3, method that runs a boolean
            if (typeof properties[key] === 'function') {
              match = properties[key](item[key]);

              // type 2, method that runs a value
              if (typeof match !== 'boolean') {
                match = item[key] === match;
              }

            } else {
              
              // type 1, value
              match = item[key] === properties[key];
            }
            return match;
          });

          if (isMatch) {
            return item;
          }
        });
      }

      return items;
    },


    /**
     * Array of items that are atleast partially visible
     *
     * @return {Array}
     */
    getItemsInViewport: function() {
      return this.getItemsWhere({
        inViewport: true
      });
    },


    /**
     * Most recently active item.  
     * 
     * @return {Object}
     */
    getPreviousItem: function() {
      return this._previousItems[0];
    },


    /**
     * Array of items that were previously
     * active, with most recently active
     * at the front of the array. 
     * 
     * @return {Array}
     */
    getPreviousItems: function() {
      return this._previousItems;
    },


    /**
     * Progress of the scroll needed to activate the 
     * last item on a 0.0 - 1.0 scale.
     *
     * 0 means the first item isn't yet active,
     * and 1 means the last item is active, or 
     * has already been scrolled beyond active.
     * 
     * @return {[type]} [description]
     */
    getPercentScrollToLastItem: function() {
      return this._percentScrollToLastItem || 0;
    },


    /**
     * Progress of the entire scroll distance, from the start 
     * of the first item a '0', until the very end of the last
     * item, which is '1';
     */
    getScrollComplete: function() {
      return this._totalScrollComplete || 0;
    },

    /**
     * Return an array of all filtered items.
     * @return {Array}
     */
    getFilteredItems: function() {
      return this.getItemsWhere({
        filtered: true
      });
    },


    /**
     * Return an array of all unfiltered items.
     * @return {Array}
     */
    getUnFilteredItems: function() {
      return this.getItemsWhere({
        filtered: false
      });
    },


    /**
     * Return an array of all items belonging to a category.
     * 
     * @param  {String} categorySlug
     * @return {Array}
     */
    getItemsByCategory: function(categorySlug) {
      return this.getItemsWhere({
        category: categorySlug
      });
    },


    /**
     * Return an array of all category slugs
     * 
     * @return {Array}
     */
    getCategorySlugs: function() {
      return this._categories;
    },


    /**
     * Change an item's status to filtered.
     * 
     * @param  {Object} item
     */
    filter: function(item) {
      if (!item.filtered) {
        item.filtered = true;
        this._trigger('itemfilter', null, item);
      }
    },


    /**
     * Change an item's status to unfiltered.
     * 
     * @param  {Object} item
     */
    unfilter: function(item) {
      if (item.filtered) {
        item.filtered = false;
        this._trigger('itemunfilter', null, item);
      }
    },

    /**
     * Change all items' status to filtered.
     * 
     * @param  {Function} callback
     */
    filterAll: function(callback) {
      callback = ($.isFunction(callback)) ? callback.bind(this) : $.noop;
      var filterFnc = this.filter.bind(this);
      this.getItems().forEach(filterFnc);
    },

    /**
     * Change all items' status to unfiltered.
     * 
     * @param  {Function} callback
     */
    unfilterAll: function(callback) {
      callback = ($.isFunction(callback)) ? callback.bind(this) : $.noop;
      var unfilterFnc = this.unfilter.bind(this);
      this.getItems().forEach(unfilterFnc);
    },


    /**
     * Filter items that pass an abritrary truth test. This is a light 
     * wrapper around `getItemsBy()` and `filter()`.
     *
     * Example: this.filterBy(function(item){return item.data.last_name === 'williams'})
     *
     * @param {Function} truthTest The function to check all items against
     * @param  {Function} callback
     */
    filterBy: function(truthTest, callback) {
      callback = ($.isFunction(callback)) ? callback.bind(this) : $.noop;
      var filterFnc = this.filter.bind(this);
      this.getItemsBy(truthTest).forEach(filterFnc);
      callback();
    },


    /**
     * Filter items where all the properties match an item's properties. This 
     * is a light wrapper around `getItemsWhere()` and `filter()`. See `getItemsWhere()`
     * for more options and examples.
     * 
     * Example: this.filterWhere({index:2})
     *
     * @param {Function} truthTest The function to check all items against
     * @param  {Function} callback
     */
    filterWhere: function(properties, callback) {
      callback = ($.isFunction(callback)) ? callback.bind(this) : $.noop;
      var filterFnc = this.filter.bind(this);
      this.getItemsWhere(properties).forEach(filterFnc);
      callback();
    },


    /**
     * Whether or not any of the item objects are active.
     *
     * @return {Boolean}
     */
    isContainerActive: function() {
      return this._isActive;
    },


    /**
     * Disable scroll updates. This is useful in the
     * rare case when you want to manipulate the page
     * but not have ScrollStory continue to check
     * positions, fire events, etc. Usually a `disable`
     * is temporary and followed by an `enable`.
     */
    disable: function() {
      this.options.enabled = false;
    },
    
    
    /**
     * Enable scroll updates
     */
    enable: function() {
      this.options.enabled = true;
    },


    /**
     * Update trigger offset. This is useful if a client
     * app needs to, post-instantiation, change the trigger
     * point, like after a window resize. 
     * 
     * @param  {Number} offset
     */
    updateTriggerOffset: function(offset) {
      this.options.triggerOffset = offset;
      this.updateOffsets();
      this._trigger('triggeroffsetupdate', null, offsetToPx(offset));
    },


    /**
     * Update scroll offset. This is useful if a client
     * app needs to, post-instantiation, change the scroll
     * offset, like after a window resize. 
     * @param  {Number} offset
     */
    updateScrollOffset: function(offset) {
      this.options.scrollOffset = offset;
      this.updateOffsets();
      this._trigger('scrolloffsetupdate', null, offsetToPx(offset));
    },


    /**
     * Determine which item should be active,
     * and then make it so.
     */
    _setActiveItem: function() {

      // top of the container is above the trigger point and the bottom is still below trigger point. 
      var containerInActiveArea = (this._distanceToFirstItemTopOffset <= 0 && (Math.abs(this._distanceToOffset) - this._height) < 0);

      // only check items that aren't filtered
      var items = this.getItemsWhere({
        filtered: false
      });

      var activeItem;
      items.forEach(function(item) {

        // item has to have crossed the trigger offset
        if (item.adjustedDistanceToOffset <= 0) {
          if (!activeItem) {
            activeItem = item;
          } else {

            // closer to trigger point than previously found item?
            if (activeItem.adjustedDistanceToOffset < item.adjustedDistanceToOffset) {
              activeItem = item;
            }
          }
        }
      });

      // double check conditions around an active item
      if (activeItem && !containerInActiveArea && this.options.disablePastLastItem) {
        activeItem = false;

        // not yet scrolled in, but auto-activate is set to true
      } else if (!activeItem && this.options.autoActivateFirstItem && items.length > 0) {
        activeItem = items[0];
      }

      if (activeItem) {
        this._focusItem(activeItem);

        // container
        if (!this._isActive) {
          this._isActive = true;
          this._trigger('containeractive');
        }

      } else {
        this._blurAllItems();

        // container
        if (this._isActive) {
          this._isActive = false;
          this._trigger('containerinactive');
        }
      }
    },


    /**
     * Scroll to an item, making it active.
     * 
     * @param  {Object}   item
     * @param  {Object}   opts
     * @param  {Function} callback  
     */
    _scrollToItem: function(item, opts, callback) {
      callback = ($.isFunction(callback)) ? callback.bind(this) : $.noop;

      /**
       * Allows global scroll options to be overridden
       * in one of two ways:
       *
       * 1. Higher priority: Passed in to scrollToItem directly via opts obj.
       * 2. Lower priority: options set as an item.* property
       */
      opts = $.extend(true, {
        // prefer item.scrollOffset over this.options.scrollOffset
        scrollOffset: (item.scrollOffset !== false) ? offsetToPx(item.scrollOffset) : offsetToPx(this.options.scrollOffset),
        speed: this.options.speed,
        easing: this.options.easing
      }, opts);


      // because we animate to body and html for maximum compatiblity, 
      // we only want the callback to fire once. jQuery will call it 
      // once for each element otherwise
      var debouncedCallback = debounce(callback, 100);

      // position to travel to
      var scrolllTop = item.el.offset().top - offsetToPx(opts.scrollOffset);
      $('html, body').stop(true).animate({
          scrollTop: scrolllTop
      }, opts.speed, opts.easing, debouncedCallback);
    },


    /**
     * Excecute a callback function that expects an
     * item as its paramamter for each items.
     *
     * Optionally, a item or array of items of exceptions
     * can be passed in. They'll not call the callback.
     *
     * @param  {Function} callback         Method to call, and pass in exepctions
     * @param  {Object/Array}   exceptions
     */
    applyToAllItems: function(callback, exceptions) {
      exceptions = ($.isArray(exceptions)) ? exceptions : [exceptions];
      callback = ($.isFunction(callback)) ? callback.bind(this) : $.noop;

      var items = this.getItems();
      var i = 0;
      var length = items.length;
      var item;

      for (i = 0; i < length; i++) {
        item = items[i];
        if (exceptions.indexOf(item) === -1) {
          callback(item, i);
        }
      }
    },


    /**
     * Unfocus all items.
     *
     * @param  {Object/Array} exceptions item or array of items to not blur
     */
    _blurAllItems: function(exceptions) {
      this.applyToAllItems(this._blurItem.bind(this), exceptions);

      if (!exceptions) {
        this._activeItem = undefined;
      }
    },

    /**
     * Unfocus an item
     * @param  {Object}
     */
    _blurItem: function(item) {
      if (item.active) {
        item.active = false;
        this._trigger('itemblur', null, item);
      }
    },


    /**
     * Given an item, give it focus. Focus is exclusive
     * so we unfocus any other item.
     *
     * @param  {Object} item object
     */
    _focusItem: function(item) {
      if (!item.active && !item.filtered) {
        this._blurAllItems(item);

        // make active
        this._activeItem = item;
        item.active = true;

        // notify clients of changes
        this._trigger('itemfocus', null, item);
      }
    },


    /**
     * Iterate through items and update their top offset.
     * Useful if items have been added, removed,
     * repositioned externally, and after window resize
     *
     * Based on:
     * http://javascript.info/tutorial/coordinates
     * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
     */
    updateOffsets: function() {
      var bodyElem = document.body;
      var docElem = document.documentElement;

      var scrollTop = window.pageYOffset || docElem.scrollTop || bodyElem.scrollTop;
      var clientTop = docElem.clientTop || bodyElem.clientTop || 0;
      var items = this.getItems();
      var i = 0;
      var length = items.length;
      var item;
      var box;

      // individual items
      for (i = 0; i < length; i++) {
        item = items[i];
        box = item.el[0].getBoundingClientRect();

        // add or update item properties
        item.width = box.width;
        item.height = box.height;
        item.topOffset = box.top + scrollTop - clientTop;
      }

      // container
      box = this.el.getBoundingClientRect();
      this._height = box.height;
      this._width = box.width;
      this._topOffset = box.top + scrollTop - clientTop;

      this._trigger('updateoffsets');
    },

    _updateScrollPositions: function() {
      var bodyElem = document.body;
      var docElem = document.documentElement;
      var scrollTop = window.pageYOffset || docElem.scrollTop || bodyElem.scrollTop;
      var wHeight = window.innerHeight || docElem.clientHeight;
      var wWidth = window.innerWidth || docElem.clientWidth;
      var triggerOffset = offsetToPx(this.options.triggerOffset);


      // update item scroll positions
      var items = this.getItems();
      var length = items.length;
      var lastItem = items[length -1];
      var i = 0;
      var item;
      var rect;
      var previouslyInViewport;

      // track total scroll across all items
      var totalScrollComplete = 0;

      for (i = 0; i < length; i++) {
        item = items[i];
        rect = item.el[0].getBoundingClientRect();
        item.distanceToOffset = Math.floor(item.topOffset - scrollTop - triggerOffset); // floor to prevent some off-by-fractional px in determining active item
        item.adjustedDistanceToOffset = (item.triggerOffset === false) ? item.distanceToOffset : item.topOffset - scrollTop - item.triggerOffset;

        // percent through this item's active scroll. expressed 0 - 1;
        if (item.distanceToOffset >= 0) {
          item.percentScrollComplete = 0;
        } else if (Math.abs(item.distanceToOffset) >= rect.height){
          item.percentScrollComplete = 1;
        } else {
          item.percentScrollComplete = Math.abs(item.distanceToOffset) / rect.height;
        }

        // track percent scroll 
        totalScrollComplete = totalScrollComplete + item.percentScrollComplete;

        // track viewport status
        previouslyInViewport = item.inViewport;
        item.inViewport = rect.bottom > 0 && rect.right > 0 && rect.left < wWidth && rect.top < wHeight;
        item.fullyInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= wHeight && rect.right <= wWidth;

        if (item.inViewport && !previouslyInViewport) {
          this._trigger('itementerviewport', null, item);
        } else if (!item.inViewport && previouslyInViewport) {
          this._trigger('itemexitviewport', null, item);
        }
      }

      // update container scroll position
      this._distanceToFirstItemTopOffset = items[0].adjustedDistanceToOffset;

      // takes into account other elements that might make the top of the 
      // container different than the topoffset of the first item.
      this._distanceToOffset = this._topOffset - scrollTop - triggerOffset;


      // percent of the total scroll needed to activate the last item
      var percentScrollToLastItem = 0;
      if (this._distanceToOffset < 0) {
        percentScrollToLastItem = 1 - (lastItem.distanceToOffset / (this._height - lastItem.height));
        percentScrollToLastItem = (percentScrollToLastItem < 1) ? percentScrollToLastItem : 1; // restrict range
      }

      this._percentScrollToLastItem = percentScrollToLastItem;

      this._totalScrollComplete = totalScrollComplete / length;
    },


    /**
     * Add items to the running list given any of the
     * following inputs:
     *
     * 1. jQuery selection. Items will be generated
     * from the selection, and any data-* attributes
     * will be added to the item's data object.
     *
     * 2. A string selector to search for elements
     * within our container. Items will be generated
     * from that selection, and any data-* attributes
     * will be added to the item's data object.
     *
     * 3. Array of objects. All needed markup will
     * be generated, and the data in each object will
     * be added to the item's data object.
     *
     * 4. If no 'items' param, we search for items
     * using the options.contentSelector string.
     *
     *
     * TODO: ensure existing items aren't re-added.
     * This is expecially important for the empty items
     * option, and will give us the ability to do
     * infinite scrolls, etc.
     *
     * @param {jQuery Object/String/Array} items
     */
    addItems: function(items, opts) {

      opts = $.extend(true, {
        handleRepaint: true
      }, opts);

      // use an existing jQuery selection
      if (items instanceof $) {
        this._prepItemsFromSelection(items);

        // a custom selector to use within our container
      } else if (typeof items === 'string') {
        this._prepItemsFromSelection(this.$el.find(items));

        // array objects, which will be used to create markup
      } else if ($.isArray(items)) {
        this._prepItemsFromData(items);

        // search for elements with the default selector
      } else {
        this._prepItemsFromSelection(this.$el.find(this.options.contentSelector));
      }

      // after instantiation and any addItems, we must have 
      // atleast one valid item. If not, plugin is misconfigured.
      if (this.getItems().length < 1) {
        throw new Error('addItems found no valid items.');
      }

      if (opts.handleRepaint) {
        this._handleRepaint();
      }
    },

    /**
     * Remove any classes added during
     * use and unbind all events.
     */
    destroy: function(removeMarkup) {
      removeMarkup = removeMarkup || false;

      if(removeMarkup){
        this.each(function(item){
          item.el.remove();
        });
      }

      // cleanup dom / events and 
      // run any user code
      this._trigger('destroy');

      // plugin wrapper disallows multiple scrollstory
      // instances on the same element. after a destory,
      // allow plugin to reattach to this element.
       var containerData = this.$el.data();
       containerData['plugin_' + pluginName] = null;

      // TODO: destroy the *instance*?
    },


    /**
     * Update items' scroll positions and 
     * determine which one is active based 
     * on those positions. Useful during
     * scrolls, resizes and other events
     * that repaint the page. 
     *
     * updateOffsets should be used 
     * with caution, as it's CPU intensive,
     * and only useful it item sizes or
     * scrollOffsets have changed.
     * 
     * @param  {Boolean} updateOffsets 
     * @return {[type]} [description]
     */
    _handleRepaint: function(updateOffsets) {
      updateOffsets = (updateOffsets === false) ? false : true;
      
      if (updateOffsets) {
        this.updateOffsets(); // must be called first
      }

      this._updateScrollPositions(); // must be called second
      this._setActiveItem(); // must be called third
    },


    /**
     * Keep state correct while scrolling
     */
    _handleScroll: function() {
      if (this.options.enabled) {
        this._handleRepaint(false);
        this._trigger('containerscroll');
      }
    },

    /**
     * Keep state correct while resizing
     */
    _handleResize: function() {
      winHeight = $window.height();
      
      if (this.options.enabled && this.options.autoUpdateOffsets) {

        if (offsetIsAPercentage(this.options.triggerOffset)) {
          this.updateTriggerOffset(this.options.triggerOffset);
        }

        if (offsetIsAPercentage(this.options.scrollOffset)) {
          this.updateScrollOffset(this.options.scrollOffset);
        }

        this._debouncedHandleRepaint();
        this._trigger('containerresize');
      }
    },

    // Handlers for public events that maintain state
    // of the ScrollStory instance.

    _onSetup: function() {
      this.$el.addClass(pluginName);
    },

    _onDestroy: function() {

      // remove events
      this.$el.off(eventNameSpace);
      $window.off(eventNameSpace);

      // item classes
      var itemClassesToRemove = ['scrollStoryItem', 'inviewport', 'active', 'filtered'].join(' ');
      this.each(function(item){
        item.el.removeClass(itemClassesToRemove);
      });

      // container classes
      this.$el.removeClass(function(i, classNames){
        var classNamesToRemove = [];
        classNames.split(' ').forEach(function(c){
          if (c.lastIndexOf(pluginName) === 0 ){
            classNamesToRemove.push(c);
          }
        });
        return classNamesToRemove.join(' ');
      });

      this.$trigger.remove();
    },

    _onContainerActive: function() {
      this.$el.addClass(pluginName + 'Active');
    },

    _onContainerInactive: function() {
      this.$el.removeClass(pluginName + 'Active');
    },

    _onItemFocus: function(ev, item) {
      item.el.addClass('active');
      this._manageContainerClasses('scrollStoryActiveItem-',item.id);

      // trigger catgory change if not previously active or
      // this item's category is different from the last
      if (item.category) {
        if ( (this.getPreviousItem() && this.getPreviousItem().category !== item.category) || !this.isContainerActive()) {
          this._trigger('categoryfocus', null, item.category);

          if (this.getPreviousItem()) {
            this._trigger('categoryblur', null, this.getPreviousItem().category);
          }
        }
      }
    },

    _onItemBlur: function(ev, item) {
      this._previousItems.unshift(item);
      item.el.removeClass('active');
    },

    _onItemEnterViewport: function(ev, item) {
      item.el.addClass('inviewport');
    },

    _onItemExitViewport: function(ev, item) {
      item.el.removeClass('inviewport');
    },

    _onItemFilter: function(ev, item) {
      item.el.addClass('filtered');
      if (this.options.autoUpdateOffsets) {
        this._debouncedHandleRepaint();
      }
    },

    _onItemUnfilter: function(ev, item) {
      item.el.removeClass('filtered');
      if (this.options.autoUpdateOffsets) {
        this._debouncedHandleRepaint();
      }
    },

    _onCategoryFocus: function(ev, category) {
      this._manageContainerClasses('scrollStoryActiveCategory-',category);
    },

    _onTriggerOffsetUpdate: function(ev, offset) {
      this.$trigger.css({
        top: offset + 'px'
      });
    },



    /**
     * Given a prefix string like 'scrollStoryActiveCategory-',
     * and a value like 'fruit', add 'scrollStoryActiveCategory-fruit'
     * class to the containing element after removing any other 
     * 'scrollStoryActiveCategory-*' classes
     * @param  {[type]} prefix [description]
     * @param  {[type]} value  [description]
     * @return {[type]}        [description]
     */
    _manageContainerClasses: function(prefix, value) {
      this.$el.removeClass(function(index, classes){
        return classes.split(' ').filter(function(c) {
            return c.lastIndexOf(prefix, 0) === 0;
        }).join(' ');
      });
      this.$el.addClass(prefix+value);
    },


    /**
     * Given a jQuery selection, add those elements
     * to the internal items array.
     *
     * @param  {Object} $jQuerySelection
     */
    _prepItemsFromSelection: function($selection) {
      var that = this;
      $selection.each(function() {
        that._addItem({}, $(this));
      });
    },


    /**
     * Given array of data, append markup and add
     * data to internal items array.
     * @param  {Array} items
     */
    _prepItemsFromData: function(items) {
      var that = this;

      // drop period from the default selector, so we can 
      // add it to the class attr in markup
      var selector = this.options.contentSelector.replace(/\./g, '');

      var frag = document.createDocumentFragment();
      items.forEach(function(data) {
        var $item = $('<div class="' + selector + '"></div>');
        that._addItem(data, $item);
        frag.appendChild($item.get(0));
      });

      this.$el.append(frag);
    },


    /**
     * Given item user data, and an aleady appended
     * jQuery object, create an item for internal items array.
     *
     * @param {Object} data
     * @param {jQuery Object} $el
     */
    _addItem: function(data, $el) {
      var domData = $el.data();

      var item = {
        index: this._items.length,
        el: $el,
        // id is from markup id attribute, data or dynamically generated
        id: $el.attr('id') ? $el.attr('id') : (data.id) ? data.id : 'story' + instanceCounter + '-' + this._items.length,

        // item's data is from client data or data-* attrs. prefer data-* attrs over client data.
        data: $.extend({}, data, domData),

        category: domData.category || data.category, // string. optional category slug this item belongs to. prefer data-category attribute
        tags: data.tags || [], // optional tag or tags for this item. Can take an array of string, or a cvs string that'll be converted into array of strings.
        scrollStory: this, // reference to this instance of scrollstory

        // in-focus item
        active: false,

        // has item been filtered
        filtered: false,

        // on occassion, the scrollToItem() offset may need to be adjusted for a
        // particular item. this overrides this.options.scrollOffset set on instantiation
        scrollOffset: false,

        // on occassion we want to trigger an item at a non-standard offset.
        triggerOffset: false,

        // if any part is viewable in the viewport.
        inViewport: false

      };

      // ensure id exist in dom
      if (!$el.attr('id')) {
        $el.attr('id', item.id);
      }

      $el.addClass('scrollStoryItem');

      // global record
      this._items.push(item);

      // quick lookup
      this._itemsById[item.id] = item;

      this._trigger('itembuild', null, item);

      // An item's category is saved after the the itembuild event
      // to allow for user code to specify a category client-side in 
      // that event callback or handler.
      if (item.category && this._categories.indexOf(item.category) === -1) {
        this._categories.push(item.category);
      }

      // this._tags.push(item.tags);
    },


    /**
     * Manage callbacks and event dispatching.
     *
     * Based very heavily on jQuery UI's implementaiton
     * https://github.com/jquery/jquery-ui/blob/9d0f44fd7b16a66de1d9b0d8c5e4ab954d83790f/ui/widget.js#L492
     *
     * @param  {String} eventType
     * @param  {Object} event
     * @param  {Object} data
     */
    _trigger: function(eventType, event, data) {
      var callback = this.options[eventType];
      var prop, orig;

      if ($.isFunction(callback)) {
        data = data || {};

        event = $.Event(event);
        event.target = this.el;
        event.type = eventType;

        // copy original event properties over to the new event
        orig = event.originalEvent;
        if (orig) {
          for (prop in orig) {
            if (!(prop in event)) {
              event[prop] = orig[prop];
            }
          }
        }

        // fire event
        this.$el.trigger(event, data);

        // call the callback
        var boundCb = this.options[eventType].bind(this);
        boundCb(event, data);
      }
    }
  }; // end plugin.prototype


  /**
   * Debounced version of prototype methods
   */
  ScrollStory.prototype.debouncedUpdateOffsets = debounce(ScrollStory.prototype.updateOffsets, 100);
  ScrollStory.prototype._debouncedHandleRepaint = debounce(ScrollStory.prototype._handleRepaint, 100);



  // A really lightweight plugin wrapper around the constructor,
  // preventing multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new ScrollStory(this, options));
      }
    });
  };
}));

/***/ }),

/***/ "./src/client/items/HorizontalSlideshow.js":
/*!*************************************************!*\
  !*** ./src/client/items/HorizontalSlideshow.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scrollstory_jquery_scrollstory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scrollstory/jquery.scrollstory */ "./node_modules/scrollstory/jquery.scrollstory.js");
/* harmony import */ var scrollstory_jquery_scrollstory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scrollstory_jquery_scrollstory__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var blueimp_gallery_js_blueimp_gallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! blueimp-gallery/js/blueimp-gallery */ "./node_modules/blueimp-gallery/js/blueimp-gallery.js");
/* harmony import */ var blueimp_gallery_js_blueimp_gallery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(blueimp_gallery_js_blueimp_gallery__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-env browser */
/* globals $ */



function loadItem(item) {
  const slides = item.el.find('.slide-container a').get();

  return blueimp_gallery_js_blueimp_gallery__WEBPACK_IMPORTED_MODULE_1___default()(slides, {
    container: item.el.find('.blueimp-gallery')[0],
    carousel: true,
    titleElement: '.slide-caption',
    srcsetProperty: 'urlset',
    startSlideshow: false,
    onslide(index, slide) {
      const text = this.list[index].getAttribute('data-credits');
      const node = this.container.find('.credits');
      node.empty();
      if (text) {
        node[0].appendChild(document.createTextNode(text));
      }
    },
  });
}

// code needed to bootstrap editor preview
$(document).ready(function() {
  const $story = $('#scrollytelling');

  const scrollStory = $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
    })
    .data('plugin_scrollStory');

  const storyItems = scrollStory.getItems();
  window.draftItem = storyItems[0];
  window.Gallery = loadItem(window.draftItem);
});

// code needed to refresh editor preview
window.refresh = function() {
  window.draftItem.el
    .find('.blueimp-gallery')
    .removeClass('blueimp-gallery-single');
  window.Gallery = loadItem(window.draftItem);
};


/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./src/client/items/HorizontalSlideshow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/naaro/Code/Mural/src/client/items/HorizontalSlideshow.js */"./src/client/items/HorizontalSlideshow.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ })

/******/ })));
//# sourceMappingURL=HorizontalSlideshow.js.map
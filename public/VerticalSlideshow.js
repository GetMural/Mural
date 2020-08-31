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

/***/ "./node_modules/stickybits/src/jquery.stickybits.js":
/*!**********************************************************!*\
  !*** ./node_modules/stickybits/src/jquery.stickybits.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stickybits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stickybits */ "./node_modules/stickybits/src/stickybits.js");


if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin (opts) {
      return Object(_stickybits__WEBPACK_IMPORTED_MODULE_0__["default"])(this, opts)
    }
  }
}


/***/ }),

/***/ "./node_modules/stickybits/src/stickybits.js":
/*!***************************************************!*\
  !*** ./node_modules/stickybits/src/stickybits.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stickybits; });
/*
  STICKYBITS 💉
  --------
  > a lightweight alternative to `position: sticky` polyfills 🍬
  --------
  - each method is documented above it our view the readme
  - Stickybits does not manage polymorphic functionality (position like properties)
  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
  --------
  defaults 🔌
  --------
  - version = `package.json` version
  - userAgent = viewer browser agent
  - target = DOM element selector
  - noStyles = boolean
  - offset = number
  - parentClass = 'string'
  - scrollEl = window || DOM element selector || DOM element
  - stickyClass = 'string'
  - stuckClass = 'string'
  - useStickyClasses = boolean
  - useFixed = boolean
  - useGetBoundingClientRect = boolean
  - verticalPosition = 'string'
  - applyStyle = function
  --------
  props🔌
  --------
  - p = props {object}
  --------
  instance note
  --------
  - stickybits parent methods return this
  - stickybits instance methods return an instance item
  --------
  nomenclature
  --------
  - target => el => e
  - props => o || p
  - instance => item => it
  --------
  methods
  --------
  - .definePosition = defines sticky or fixed
  - .addInstance = an array of objects for each Stickybits Target
  - .getClosestParent = gets the parent for non-window scroll
  - .getTopPosition = gets the element top pixel position from the viewport
  - .computeScrollOffsets = computes scroll position
  - .toggleClasses = older browser toggler
  - .manageState = manages sticky state
  - .removeInstance = removes an instance
  - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
*/
class Stickybits {
  constructor (target, obj) {
    const o = typeof obj !== 'undefined' ? obj : {}
    this.version = 'VERSION'
    this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser'
    this.props = {
      customStickyChangeNumber: o.customStickyChangeNumber || null,
      noStyles: o.noStyles || false,
      stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
      parentClass: o.parentClass || 'js-stickybit-parent',
      scrollEl: typeof o.scrollEl === 'string' ? document.querySelector(o.scrollEl) : o.scrollEl || window,
      stickyClass: o.stickyClass || 'js-is-sticky',
      stuckClass: o.stuckClass || 'js-is-stuck',
      stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
      useStickyClasses: o.useStickyClasses || false,
      useFixed: o.useFixed || false,
      useGetBoundingClientRect: o.useGetBoundingClientRect || false,
      verticalPosition: o.verticalPosition || 'top',
      applyStyle: o.applyStyle || ((item, style) => this.applyStyle(item, style)),
    }
    /*
      define positionVal after the setting of props, because definePosition looks at the props.useFixed
      ----
      -  uses a computed (`.definePosition()`)
      -  defined the position
    */
    this.props.positionVal = this.definePosition() || 'fixed'

    this.instances = []

    const {
      positionVal,
      verticalPosition,
      noStyles,
      stickyBitStickyOffset,
    } = this.props
    const verticalPositionStyle = verticalPosition === 'top' && !noStyles ? `${stickyBitStickyOffset}px` : ''
    const positionStyle = positionVal !== 'fixed' ? positionVal : ''

    this.els = typeof target === 'string' ? document.querySelectorAll(target) : target

    if (!('length' in this.els)) this.els = [this.els]

    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]

      var instance = this.addInstance(el, this.props)
      // set vertical position
      this.props.applyStyle(
        {
          styles: {
            [verticalPosition]: verticalPositionStyle,
            position: positionStyle,
          },
          classes: {},
        },
        instance,
      )
      this.manageState(instance)

      // instances are an array of objects
      this.instances.push(instance)
    }
  }

  /*
    setStickyPosition ✔️
    --------
    —  most basic thing stickybits does
    => checks to see if position sticky is supported
    => defined the position to be used
    => stickybits works accordingly
  */
  definePosition () {
    let stickyProp
    if (this.props.useFixed) {
      stickyProp = 'fixed'
    } else {
      const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-']
      const test = document.head.style
      for (let i = 0; i < prefix.length; i += 1) {
        test.position = `${prefix[i]}sticky`
      }
      stickyProp = test.position ? test.position : 'fixed'
      test.position = ''
    }
    return stickyProp
  }

  /*
    addInstance ✔️
    --------
    — manages instances of items
    - takes in an el and props
    - returns an item object
    ---
    - target = el
    - o = {object} = props
      - scrollEl = 'string' | object
      - verticalPosition = number
      - off = boolean
      - parentClass = 'string'
      - stickyClass = 'string'
      - stuckClass = 'string'
    ---
    - defined later
      - parent = dom element
      - state = 'string'
      - offset = number
      - stickyStart = number
      - stickyStop = number
    - returns an instance object
  */
  addInstance (el, props) {
    const item = {
      el,
      parent: el.parentNode,
      props,
    }
    if (props.positionVal === 'fixed' || props.useStickyClasses) {
      this.isWin = this.props.scrollEl === window
      const se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl)
      this.computeScrollOffsets(item)
      this.toggleClasses(item.parent, '', props.parentClass)
      item.state = 'default'
      item.stateChange = 'default'
      item.stateContainer = () => this.manageState(item)
      se.addEventListener('scroll', item.stateContainer)
    }
    return item
  }

  /*
    --------
    getParent 👨‍
    --------
    - a helper function that gets the target element's parent selected el
    - only used for non `window` scroll elements
    - supports older browsers
  */
  getClosestParent (el, match) {
    // p = parent element
    const p = match
    let e = el
    if (e.parentElement === p) return p
    // traverse up the dom tree until we get to the parent
    while (e.parentElement !== p) e = e.parentElement
    // return parent element
    return p
  }

  /*
    --------
    getTopPosition
    --------
    - a helper function that gets the topPosition of a Stickybit element
    - from the top level of the DOM
  */
  getTopPosition (el) {
    if (this.props.useGetBoundingClientRect) {
      return el.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop)
    }
    let topPosition = 0
    do {
      topPosition = el.offsetTop + topPosition
    } while ((el = el.offsetParent))
    return topPosition
  }

  /*
    computeScrollOffsets 📊
    ---
    computeScrollOffsets for Stickybits
    - defines
      - offset
      - start
      - stop
  */
  computeScrollOffsets (item) {
    const it = item
    const p = it.props
    const el = it.el
    const parent = it.parent
    const isCustom = !this.isWin && p.positionVal === 'fixed'
    const isTop = p.verticalPosition !== 'bottom'
    const scrollElOffset = isCustom ? this.getTopPosition(p.scrollEl) : 0
    const stickyStart = isCustom
      ? this.getTopPosition(parent) - scrollElOffset
      : this.getTopPosition(parent)
    const stickyChangeOffset = p.customStickyChangeNumber !== null
      ? p.customStickyChangeNumber
      : el.offsetHeight
    const parentBottom = stickyStart + parent.offsetHeight
    it.offset = !isCustom ? scrollElOffset + p.stickyBitStickyOffset : 0
    it.stickyStart = isTop ? stickyStart - it.offset : 0
    it.stickyChange = it.stickyStart + stickyChangeOffset
    it.stickyStop = isTop
      ? parentBottom - (el.offsetHeight + it.offset)
      : parentBottom - window.innerHeight
  }

  /*
    toggleClasses ⚖️
    ---
    toggles classes (for older browser support)
    r = removed class
    a = added class
  */
  toggleClasses (el, r, a) {
    const e = el
    const cArray = e.className.split(' ')
    if (a && cArray.indexOf(a) === -1) cArray.push(a)
    const rItem = cArray.indexOf(r)
    if (rItem !== -1) cArray.splice(rItem, 1)
    e.className = cArray.join(' ')
  }

  /*
    manageState 📝
    ---
    - defines the state
      - normal
      - sticky
      - stuck
  */
  manageState (item) {
    // cache object
    const it = item
    const p = it.props
    const state = it.state
    const stateChange = it.stateChange
    const start = it.stickyStart
    const change = it.stickyChange
    const stop = it.stickyStop
    // cache props
    const pv = p.positionVal
    const se = p.scrollEl
    const sticky = p.stickyClass
    const stickyChange = p.stickyChangeClass
    const stuck = p.stuckClass
    const vp = p.verticalPosition
    const isTop = vp !== 'bottom'
    const aS = p.applyStyle
    const ns = p.noStyles
    /*
      requestAnimationFrame
      ---
      - use rAF
      - or stub rAF
    */
    const rAFStub = function rAFDummy (f) { f() }
    const rAF = !this.isWin
      ? rAFStub
      : window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      rAFStub

    /*
      define scroll vars
      ---
      - scroll
      - notSticky
      - isSticky
      - isStuck
    */
    const scroll = this.isWin ? (window.scrollY || window.pageYOffset) : se.scrollTop
    const notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck')
    const isSticky = isTop && scroll <= start && (state === 'sticky' || state === 'stuck')
    const isStuck = scroll >= stop && state === 'sticky'
    /*
      Unnamed arrow functions within this block
      ---
      - help wanted or discussion
      - view test.stickybits.js
        - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
    */
    if (notSticky) {
      it.state = 'sticky'
    } else if (isSticky) {
      it.state = 'default'
    } else if (isStuck) {
      it.state = 'stuck'
    }

    const isStickyChange = scroll >= change && scroll <= stop
    const isNotStickyChange = scroll < change / 2 || scroll > stop
    if (isNotStickyChange) {
      it.stateChange = 'default'
    } else if (isStickyChange) {
      it.stateChange = 'sticky'
    }

    // Only apply new styles if the state has changed
    if (state === it.state && stateChange === it.stateChange) return
    rAF(() => {
      const stateStyles = {
        sticky: {
          styles: {
            position: pv,
            top: '',
            bottom: '',
            [vp]: `${p.stickyBitStickyOffset}px`,
          },
          classes: { [sticky]: true },
        },
        default: {
          styles: {
            [vp]: '',
          },
          classes: {},
        },
        stuck: {
          styles: {
            [vp]: '',
            /**
             * leave !this.isWin
             * @example https://codepen.io/yowainwright/pen/EXzJeb
             */
            ...((pv === 'fixed' && !ns) || !this.isWin ? {
              position: 'absolute',
              top: '',
              bottom: '0',
            } : {}),
          },
          classes: { [stuck]: true },
        },
      }

      if (pv === 'fixed') {
        stateStyles.default.styles.position = ''
      }

      const style = stateStyles[it.state]
      style.classes = {
        [stuck]: !!style.classes[stuck],
        [sticky]: !!style.classes[sticky],
        [stickyChange]: isStickyChange,
      }

      aS(style, item)
    })
  }

  /*
    applyStyle
    ---
    - apply the given styles and classes to the element
  */
  applyStyle ({ styles, classes }, item) {
    // cache object
    const it = item
    const e = it.el
    const p = it.props
    const stl = e.style
    // cache props
    const ns = p.noStyles

    const cArray = e.className.split(' ')
    // Disable due to bug with old versions of eslint-scope and for ... in
    // https://github.com/eslint/eslint/issues/12117
    // eslint-disable-next-line no-unused-vars
    for (const cls in classes) {
      const addClass = classes[cls]
      if (addClass) {
        if (cArray.indexOf(cls) === -1) cArray.push(cls)
      } else {
        const idx = cArray.indexOf(cls)
        if (idx !== -1) cArray.splice(idx, 1)
      }
    }

    e.className = cArray.join(' ')

    if (styles['position']) {
      stl['position'] = styles['position']
    }

    if (ns) return

    // eslint-disable-next-line no-unused-vars
    for (const key in styles) {
      stl[key] = styles[key]
    }
  }

  update (updatedProps = null) {
    this.instances.forEach((instance) => {
      this.computeScrollOffsets(instance)
      if (updatedProps) {
        // eslint-disable-next-line no-unused-vars
        for (const updatedProp in updatedProps) {
          instance.props[updatedProp] = updatedProps[updatedProp]
        }
      }
    })

    return this
  }

  /*
    removes an instance 👋
    --------
    - cleanup instance
  */
  removeInstance (instance) {
    const e = instance.el
    const p = instance.props

    this.applyStyle(
      {
        styles: { position: '', [p.verticalPosition]: '' },
        classes: { [p.stickyClass]: '', [p.stuckClass]: '' },
      },
      instance,
    )

    this.toggleClasses(e.parentNode, p.parentClass)
  }

  /*
    cleanup 🛁
    --------
    - cleans up each instance
    - clears instance
  */
  cleanup () {
    for (let i = 0; i < this.instances.length; i += 1) {
      const instance = this.instances[i]
      if (instance.stateContainer) {
        instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer)
      }
      this.removeInstance(instance)
    }
    this.manageState = false
    this.instances = []
  }
}

/*
  export
  --------
  exports StickBits to be used 🏁
*/
function stickybits (target, o) {
  return new Stickybits(target, o)
}


/***/ }),

/***/ "./src/editor/items/VerticalSlideshow.js":
/*!***********************************************!*\
  !*** ./src/editor/items/VerticalSlideshow.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var stickybits_src_jquery_stickybits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stickybits/src/jquery.stickybits */ "./node_modules/stickybits/src/jquery.stickybits.js");
/* eslint-env browser */
/* globals $ */



let $story;
let stickybitsInstance;

function loadItem(item) {
  stickybitsInstance = item.el.find('.bg-image').stickybits();
}

// code needed to bootstrap editor preview
$(document).ready(function() {
  $story = $('#scrollytelling');

  $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
      autoActivateFirstItem: true,
      containeractive: function() {
        const item = this.getActiveItem();
        loadItem(item);
      },
    })
    .data('plugin_scrollStory');
});

// code needed to refresh editor preview
window.refresh = function() {
  stickybitsInstance.cleanup();
  const item = $story.data('plugin_scrollStory').getActiveItem();
  loadItem(item);
};


/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/editor/items/VerticalSlideshow.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/naro/Code/Mural/src/editor/items/VerticalSlideshow.js */"./src/editor/items/VerticalSlideshow.js");


/***/ })

/******/ })));
//# sourceMappingURL=VerticalSlideshow.js.map
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/ink-spoiler.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var InkSpoiler = /*#__PURE__*/function () {
  function InkSpoiler(selector, options) {
    var _this = this;
    _classCallCheck(this, InkSpoiler);
    this.spoilers = document.querySelectorAll(selector);
    if (this.spoilers) {
      this.spoilers.forEach(function (el, i) {
        var defaultOptions = {
          activeContentClass: 'show',
          a11y: true,
          animation: true,
          duration: 350
        };
        _this.options = Object.assign(defaultOptions, options);
        _this.panel = el;
        _this.panelState = _this.panel.dataset.spoilerState;
        _this.panelId = "inkspoiler-".concat(Math.random().toString(16).slice(2));
        _this.box = _this.panel.closest('.spoiler');
        _this.content = _this.box.querySelector('.spoiler__content');
        _this.init();
        _this.events(_this.panel);
      });
    }
  }
  _createClass(InkSpoiler, [{
    key: "init",
    value: function init() {
      if (this.panel.hasAttribute('data-spoiler-target')) {
        this.content.id = this.panel.dataset.spoilerTarget.slice(1);
      } else {
        this.panel.dataset.spoilerTarget = '#' + this.panelId;
        this.content.id = this.panelId;
      }
      if (this.options.a11y) {
        this.panel.setAttribute('role', 'button');
        this.panel.setAttribute('aria-expanded', this.panelState == 'show' ? true : false);
        this.panel.setAttribute('aria-controls', this.content.id);
      }
      this.switchPanel(this.panel);
      this.switchText(this.panel, true);
    }
  }, {
    key: "events",
    value: function events(el) {
      var _this2 = this;
      el.addEventListener('click', function () {
        var content = document.querySelector(el.dataset.spoilerTarget);
        if (_this2.options.animation && content.classList.contains('animation')) return;
        var isExpanded = el.dataset.spoilerState == 'hide' ? true : false;
        var isGroup = el.getAttribute('data-spoiler-group');
        el.dataset.spoilerState = isExpanded ? el.dataset.spoilerState = 'show' : el.dataset.spoilerState = 'hide';
        _this2.switchPanel(el);
        _this2.switchText(el);
        if (isGroup) {
          document.querySelectorAll("[data-spoiler-group='".concat(isGroup, "']")).forEach(function (group) {
            if (el.dataset.spoilerTarget !== group.dataset.spoilerTarget) {
              var _content = document.querySelector(group.dataset.spoilerTarget);
              if (_this2.options.animation) {
                group.dataset.spoilerState = 'hide';
                _content.classList.add('animation');
                _content.style.height = "".concat(_content.offsetHeight, "px");
                _content.offsetHeight;
                _content.style.height = 0;
                _content.style.overflow = 'hidden';
                _content.style.transition = "height ".concat(_this2.options.duration, "ms ease");
                window.setTimeout(function () {
                  _content.style.height = '';
                  _content.style.transition = '';
                  _content.style.overflow = '';
                  _content.classList.remove(_this2.options.activeContentClass);
                  _content.classList.remove('animation');
                }, _this2.options.duration);
              } else {
                group.dataset.spoilerState = 'hide';
                _content.classList.remove(_this2.options.activeContentClass);
              }
              if (_this2.options.a11y) group.setAttribute('aria-expanded', false);
            }
          });
        }
      });
    }
  }, {
    key: "switchText",
    value: function switchText(el, init) {
      if (!el.getAttribute('data-spoiler-text')) return;
      var switchText = el.dataset.spoilerText;
      var panelText = el.querySelector('.spoiler__text').textContent;
      if (init && el.dataset.spoilerState == 'show' || init == undefined) {
        el.querySelector('.spoiler__text').textContent = switchText;
        el.dataset.spoilerText = panelText;
      }
    }
  }, {
    key: "switchPanel",
    value: function switchPanel(el) {
      var _this3 = this;
      var content = document.querySelector(el.dataset.spoilerTarget);
      if (el.dataset.spoilerState == 'show') {
        if (!content.hasAttribute(this.options.activeContentClass)) {
          if (this.options.animation) {
            if (content.classList.contains('animation')) return;
            content.classList.add(this.options.activeContentClass);
            content.classList.add('animation');
            var height = content.offsetHeight;
            content.style.height = 0;
            content.style.overflow = 'hidden';
            content.style.transition = "height ".concat(this.options.duration, "ms ease");
            content.offsetHeight;
            content.style.height = "".concat(height, "px");
            window.setTimeout(function () {
              content.style.height = '';
              content.style.transition = '';
              content.style.overflow = '';
              content.classList.remove('animation');
            }, this.options.duration);
          } else {
            content.classList.add(this.options.activeContentClass);
          }
          if (this.options.a11y) el.setAttribute('aria-expanded', true);
        }
      } else {
        if (this.options.animation) {
          if (content.classList.contains('animation')) return;
          content.classList.add('animation');
          content.style.height = "".concat(content.offsetHeight, "px");
          content.offsetHeight;
          content.style.height = 0;
          content.style.overflow = 'hidden';
          content.style.transition = "height ".concat(this.options.duration, "ms ease");
          window.setTimeout(function () {
            content.style.height = '';
            content.style.transition = '';
            content.style.overflow = '';
            content.classList.remove(_this3.options.activeContentClass);
            content.classList.remove('animation');
          }, this.options.duration);
        } else {
          content.classList.remove(this.options.activeContentClass);
        }
        if (this.options.a11y) el.setAttribute('aria-expanded', false);
      }
    }
  }]);
  return InkSpoiler;
}();

;// CONCATENATED MODULE: ./src/index.js


__webpack_require__.g.InkSpoiler = InkSpoiler;
/******/ })()
;
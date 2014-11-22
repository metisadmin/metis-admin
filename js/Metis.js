;(function (window) {
  'use strict';

  // Is Modernizr defined on the global scope
  var Modernizr = typeof Modernizr !== 'undefined' ? Modernizr : false;
  // whether or not is a touch device
  var isTouchDevice = Modernizr ? Modernizr.touch : !!('ontouchstart' in window || 'onmsgesturechange' in window);
  // Are we expecting a touch or a click?
  var buttonPressedEvent = (isTouchDevice) ? 'touchstart' : 'click';
  var Metis = function () {
    this.init();
  };

  // Initialization method
  Metis.prototype.init = function () {
    this.isTouchDevice = isTouchDevice;
    this.buttonPressedEvent = buttonPressedEvent;
  };

  // Creates a Metis object.
  window.Metis = new Metis();
})(this);

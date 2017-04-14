'use strict';
__inline('/config/game.config.js')

(function () {

  // var winHeight = $(window).height()
  //   , winWidth = $(window).width();


  /*if (winHeight < winWidth) {
   winWidth=_.clone(winHeight);
   winHeight=_.clone(winWidth);
   }*/

  FastClick.attach(document.body);

  $.extend({
    device: {
      h: $(window).height(),
      w: $(window).width()
      // h: document.documentElement.clientHeight,
      // w: document.documentElement.clientWidth
    },
    lsCache: new WebStorageCache({storage: 'localStorage'}),
    seCache: new WebStorageCache({storage: 'sessionStorage'})
  })
})();


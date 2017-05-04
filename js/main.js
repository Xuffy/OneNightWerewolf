'use strict';
__inline('/config/game.config.js')

(function () {

  // var winHeight = $(window).height()
  //   , winWidth = $(window).width();


  /*if (winHeight < winWidth) {
   winWidth=_.clone(winHeight);
   winHeight=_.clone(winWidth);
   }*/

  // 解决点击300毫秒延迟
  FastClick.attach(document.body);


  Number.prototype.toUpperCase = function () {
    var uc, num;

    uc = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七'];
    // num = this / 10;

    // if () {
    //
    // }
    // todo 完善自动匹配
    return uc[this];
  };

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


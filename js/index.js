'use strict';

(function () {
  var HEIGHT_NUM = 5 // 设置高需要显示多少张
    , WIDTH_NUM = 3 // 设置宽需要显示多少张
    , PEOPLE_NUM = 6 // 玩家数量
    , roleList = []
    , NUM_KEY
    , shortNum
    , longNum
    , cardSize
    , numFlag = 0
    , GAME_DATA = {};


  NUM_KEY = 'n' + PEOPLE_NUM;

  init();

  function init() {
    var sn, ln, data = [];

    // 禁止屏幕滑动
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault();
    }, false);

    shortNum = $.device.w > $.device.h ? $.device.h : $.device.w;
    longNum = $.device.w > $.device.h ? $.device.w : $.device.h;
    sn = (shortNum - ((WIDTH_NUM + 1) * 10)) / WIDTH_NUM;
    ln = (longNum - ((WIDTH_NUM + 1) * 10)) / HEIGHT_NUM;
    cardSize = parseInt(sn > ln ? ln : sn);

    $('.card-item').width(cardSize).height(cardSize);

    // 匹配人数角色
    _.map(ALL_ROLE, function (val) {
      if (!_.isEmpty(val.assignment) && val.assignment[NUM_KEY]) {
        for (var i = 0; i < val.assignment[NUM_KEY]; i++) {
          roleList.push(val);
        }
      }
    });

    // 随机打乱角色
    roleList = _.shuffle(roleList);
    for (var i = 1; i <= HEIGHT_NUM * WIDTH_NUM; i++) {
      var m = $.device.w > $.device.h ? ROLE_SEAT[NUM_KEY].w : ROLE_SEAT[NUM_KEY].h;
      if (m.indexOf(',' + i + ',') > -1) {
        data.push({});
      } else {
        data.push(roleList[0]);
        roleList = _.rest(roleList);
      }
    }
    roleList = data;

    // 游戏当前进度 game-distribution 发牌阶段、game-start 游戏开始
    GAME_DATA.step = 'game-distribution';
    GAME_DATA.roleList = roleList; // 桌上角色位置
    GAME_DATA.cardSize = cardSize; // 卡牌尺寸 宽=高
    GAME_DATA.lineNum = $.device.w > $.device.h ? HEIGHT_NUM : WIDTH_NUM; // 横向显示卡牌数量
    GAME_DATA.screenType = $.device.w > $.device.h ? 'transverse' : 'vertical'; // 屏幕状态：transverse横屏、vertical竖屏
  }

  new Vue({
    el: '#index',
    data: {game: GAME_DATA},
    methods: {
      startStep: function (e) {
        var ele = $(e.currentTarget);
        // 判断游戏进度
        switch (GAME_DATA.step) {
          case 'game-distribution':
            console.log(GAME_DATA.screenType)
            if ((GAME_DATA.screenType === 'transverse' && ',6,7,8,'.indexOf(',' + ele.index() + ',') > -1) ||
              (GAME_DATA.screenType === 'vertical' && ',4,7,10,'.indexOf(',' + ele.index() + ',') > -1)) {
              return false;
            }
            ele.removeClass('game-distribution').css({'z-index': 1});
            break;
        }
      }
    }
  });

})();
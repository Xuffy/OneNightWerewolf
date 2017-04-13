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
    , updatePage
    , GAME_ROLE = []
    , GAME_DATA = {};


  NUM_KEY = 'n' + PEOPLE_NUM;
  GAME_DATA.step = GAME_DATA.step || 'game-select';

  init();

  function init() {

    // 禁止屏幕滑动
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault();
    }, false);

  }

  new Vue({
    el: '#index',
    created: function () {
      switch (GAME_DATA.step) {
        case 'game-select':
          $('#select-card-box').removeClass('onw-hide');
          this.gameSelect();
          break;
      }
    },
    data: {game: GAME_DATA, updatePage: 0, playerNum: 0},
    methods: {
      /**
       * 点击卡牌事件
       * @param e
       * @param item
       */
      clickCard: function (e, item) {
        var ele = $(e.currentTarget);
        // 判断游戏进度
        switch (GAME_DATA.step) {
          case 'game-select':
            var playerNum = 0;
            item.active = !item.active;
            playerNum = _.where(this.$data.game.roleList, {active: true}).length;
            this.$data.playerNum = playerNum > 5 ? playerNum - 3 : 0;
            break;
          case 'game-distribution':
            this.gameDistribution(ele);
            break;
        }
        this.$data.updatePage = Math.random();
      },
      /**
       * 选择角色
       * 注：玩家人数必须是3~12人
       */
      clickStartGame: function () {
        if (!_.findWhere(this.$data.game.roleList, {type: 'WEREWOLF', active: true})) {
          alert('未选择狼人');
        } else if (this.$data.playerNum > 12) {
          alert('最多12个玩家');
        } else {
          GAME_ROLE = _.where(this.$data.game.roleList, {active: true});
          $('#select-card-box').addClass('onw-hide');
          $('#card-box').removeClass('onw-hide');
        }
      },
      /**
       * // ...
       */
      gameSelect: function () {
        GAME_DATA.roleList = [];
        _.map(ALL_ROLE, function (val) {
          for (var i = 0; i < val.maxNum; i++) {
            GAME_DATA.roleList.push(_.clone(val));
          }
        });
      },
      /**
       * 角色分配
       * @param ele
       * @returns {boolean}
       */
      gameDistribution: function (ele) {
        if ((GAME_DATA.screenType === 'transverse' && ',6,7,8,'.indexOf(',' + ele.index() + ',') > -1) ||
          (GAME_DATA.screenType === 'vertical' && ',4,7,10,'.indexOf(',' + ele.index() + ',') > -1)) {
          return false;
        }
        ele.removeClass('game-distribution').css({'z-index': 1});
      },
      initGame: function () {
        var sn, ln, data = [];

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

        // 游戏当前进度 game-select 选择角色、game-distribution 分配角色阶段、game-start 游戏开始
        GAME_DATA.step = 'game-distribution';
        GAME_DATA.roleList = roleList; // 桌上角色位置
        GAME_DATA.cardSize = cardSize; // 卡牌尺寸 宽=高
        GAME_DATA.lineNum = $.device.w > $.device.h ? HEIGHT_NUM : WIDTH_NUM; // 横向显示卡牌数量
        GAME_DATA.screenType = $.device.w > $.device.h ? 'transverse' : 'vertical'; // 屏幕状态：transverse横屏、vertical竖屏
      }
    }
  });

})();
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
      this.initDeviceInfo();

      // 当前游戏进度判断
      switch (GAME_DATA.step) {
        case 'game-select':
          this.initGameRole();
          break;
      }
    },
    data: {game: GAME_DATA, viewRandom: 0, playerNum: 0},
    methods: {
      /**
       * 强制更新视图
       * @returns {methods}
       */
      updateView: function () {
        return this.viewRandom = Math.random();
      },
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
            playerNum = _.where(this.game.roleList, {active: true}).length;
            this.playerNum = playerNum > 5 ? playerNum - 3 : 0;
            break;
          case 'game-distribution':
            this.gameDistribution(ele);
            break;
        }
        this.updateView();
      },
      /**
       * 初始化获取设备信息
       */
      initDeviceInfo: function () {
        var sn, ln;

        shortNum = $.device.w > $.device.h ? $.device.h : $.device.w;
        longNum = $.device.w > $.device.h ? $.device.w : $.device.h;
        sn = (shortNum - ((WIDTH_NUM + 1) * 10)) / WIDTH_NUM;
        ln = (longNum - ((WIDTH_NUM + 1) * 10)) / HEIGHT_NUM;
        cardSize = parseInt(sn > ln ? ln : sn);

        GAME_DATA.cardSize = cardSize; // 卡牌尺寸 宽=高
        GAME_DATA.lineNum = $.device.w > $.device.h ? HEIGHT_NUM : WIDTH_NUM; // 横向显示卡牌数量
        GAME_DATA.screenType = $.device.w > $.device.h ? 'transverse' : 'vertical'; // 屏幕状态：transverse横屏、vertical竖屏
      },
      /**
       * 初始化游戏角色
       */
      initGameRole: function () {
        GAME_DATA.roleList = [];
        _.map(ALL_ROLE, function (val) {
          for (var i = 0; i < val.maxNum; i++) {
            GAME_DATA.roleList.push(_.clone(val));
          }
        });
      },
      /**
       * 初始化角色座位
       */
      initGameSeat: function () {
        var seatConfig = ROLE_SEAT[this.playerNum];

        seatConfig = GAME_DATA.screenType === 'transverse' ? seatConfig.t : seatConfig.v;
        GAME_DATA.roleList = [];

        for (var i = 0; i < 15; i++) {
          if (seatConfig.indexOf(',' + (i + 1) + ',') > -1) {
            GAME_DATA.roleList.push({})
          } else {
            GAME_DATA.roleList.push(GAME_ROLE[0]);
            GAME_ROLE = _.rest(GAME_ROLE)
          }
          console.log(this.seatStyle(i + 1, GAME_DATA.roleList[i]))
          // GAME_DATA.roleList[i]=this.seatStyle(i,GAME_DATA.roleList[i])
        }
      },
      seatStyle: function (index, data) {
        var style = {};

        style.width = style.height = GAME_DATA.cardSize + 'px';
        switch (GAME_DATA.screenType) {
          case 'transverse':
            break;
          case 'vertical':
            if (index === 2 || index === 5 || index === 8 || index === 11 || index === 14) {
              style.left = '50%';
              style['margin-left'] = '-' + (GAME_DATA.cardSize / 2) + 'px';
            }
            if (index === 7 || index === 8 || index === 9) {
              style.top = '50%';
              style['margin-top'] = '-' + (GAME_DATA.cardSize / 2) + 'px';
            }
            if (index === 4 || index === 5 || index === 6) {
              style.top = '25%';
              // style['margin-top'] = '-' + (GAME_DATA.cardSize / 2) + 'px';
            }
            break;
        }
        return _.extend(data, {style: style});
      },
      /**
       * 选择角色
       * 注：玩家人数必须是3~12人
       */
      clickStartGame: function () {
        if (!_.findWhere(this.game.roleList, {type: 'WEREWOLF', active: true})) {
          alert('未选择狼人');
        } else if (this.playerNum > 12) {
          alert('最多12个玩家');
        } else {
          GAME_ROLE = _.where(this.game.roleList, {active: true});
          GAME_DATA.step = 'game-distribution';
          this.initGameSeat();
        }
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
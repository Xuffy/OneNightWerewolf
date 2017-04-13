// 角色座位配置
window.ROLE_SEAT = {
  'n6': {w: ',1,3,5,11,13,15,', h: ',1,3,7,9,13,15,'}
};

// 角色属性： name 角色名称、type 角色类型、sequence 角色出场顺序、maxNum 角色最大数量
window.ALL_ROLE = {
  DOPPELGANGER: {
    name: '化身幽灵',
    type: 'DOPPELGANGER',
    sequence: 1,
    maxNum: 1,
    image: __uri('/img/DOPPELGANGER.png')
  },
  WEREWOLF: {
    name: '狼人',
    type: 'WEREWOLF',
    sequence: 2,
    assignment: {'n6': 2},
    maxNum: 2,
    image: __uri('/img/WEREWOLF.png')
  },
  MINION: {
    name: '爪牙',
    type: 'MINION',
    sequence: 3,
    maxNum: 1,
    image: __uri('/img/MINION.png')
  },
  MASON: {
    name: '守夜人',
    type: 'MASON',
    sequence: 4,
    assignment: {'n6': 2},
    maxNum: 2,
    image: __uri('/img/MASON.png')
  },
  SEER: {
    name: '预言家',
    type: 'SEER',
    sequence: 5,
    assignment: {'n6': 1},
    maxNum: 1,
    image: __uri('/img/SEER.png')
  },
  ROBBER: {
    name: '强盗',
    type: 'ROBBER',
    sequence: 6,
    assignment: {'n6': 1},
    maxNum: 1,
    image: __uri('/img/ROBBER.png')
  },
  TROUBLEMAKER: {
    name: '捣蛋鬼',
    type: 'TROUBLEMAKER',
    sequence: 7,
    assignment: {'n6': 1},
    maxNum: 1,
    image: __uri('/img/TROUBLEMAKER.png')
  },
  DRUNK: {
    name: '酒鬼',
    type: 'DRUNK',
    sequence: 8,
    maxNum: 1,
    image: __uri('/img/DRUNK.png')
  },
  INSOMNIAC: {
    name: '失眠者',
    type: 'INSOMNIAC',
    sequence: 9,
    maxNum: 1,
    image: __uri('/img/INSOMNIAC.png')
  },
  HUNTER: {
    name: '猎人',
    type: 'HUNTER',
    sequence: 0,
    maxNum: 1,
    image: __uri('/img/HUNTER.png')
  },
  VILLAGER: {
    name: '村民',
    type: 'VILLAGER',
    sequence: 0,
    assignment: {'n6': 2},
    maxNum: 3,
    image: __uri('/img/VILLAGER.png')
  },
  TANNER: {
    name: '皮匠',
    type: 'TANNER',
    sequence: 0,
    maxNum: 1,
    image: __uri('/img/TANNER.png')
  }

};



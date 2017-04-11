'use strict';
var ROLE_SEAT = {
  'n6': {w: ',1,3,5,11,13,15,', h: ',1,3,7,9,13,15,'}
};

var ALL_ROLE = {
  DOPPELGANGER: {
    name: '化身幽灵',
    type: 'DOPPELGANGER',
    sequence: 1
  },
  WEREWOLF: {
    name: '狼人',
    type: 'WEREWOLF',
    sequence: 2,
    assignment: {'n6': 2}
  },
  MINION: {
    name: '爪牙',
    type: 'MINION',
    sequence: 3
  },
  MASON: {
    name: '守夜人',
    type: 'MASON',
    sequence: 4,
    assignment: {'n6': 2}
  },
  SEER: {
    name: '预言家',
    type: 'SEER',
    sequence: 5,
    assignment: {'n6': 1}
  },
  ROBBER: {
    name: '强盗',
    type: 'ROBBER',
    sequence: 6,
    assignment: {'n6': 1}
  },
  TROUBLEMAKER: {
    name: '捣蛋鬼',
    type: 'TROUBLEMAKER',
    sequence: 7,
    assignment: {'n6': 1}
  },
  DRUNK: {
    name: '酒鬼',
    type: 'DRUNK',
    sequence: 8
  },
  INSOMNIAC: {
    name: '失眠者',
    type: 'INSOMNIAC',
    sequence: 9
  },
  HUNTER: {
    name: '猎人',
    type: 'HUNTER',
    sequence: 0
  },
  VILLAGER: {
    name: '村民',
    type: 'VILLAGER',
    sequence: 0,
    assignment: {'n6': 2}
  }

};


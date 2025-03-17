// Created by carolsail 

// 状态
export enum ENUM_GAME_STATUS {
    UNRUNING = 'UNRUNING',
    RUNING = 'RUNING'
}

// 音效
export enum ENUM_AUDIO_CLIP {
    BGM = 'bgm',
    CLICK = 'click',
    CLICK_ITEM = 'click_item',
    LOSE = 'lose',
    WIN = 'win',
}

// ui层
export enum ENUM_UI_TYPE {
    MENU = 'MenuLayer',
    MAIN = 'MainLayer',
    SETTING = 'SettingLayer',
    EXIT = 'ExitLayer',
    LOSE = 'LoseLayer',
    WIN = 'WinLayer',
    MORE = 'MoreLayer',
}

// 事件
export enum ENUM_GAME_EVENT { }

// 资源
export const ENUM_RESOURCE_TYPE = ([
    { content: cc.AudioClip, path: 'audio', type: 'audio', ratio: 0.4 },
    { content: cc.Prefab, path: 'prefab', type: 'prefab', ratio: 0.3 },
    { content: cc.SpriteFrame, path: 'sprite', type: 'sprite', ratio: 0.3 },
    // {content: cc.JsonAsset, path: 'json', type: 'json', ratio: 0.1},
])
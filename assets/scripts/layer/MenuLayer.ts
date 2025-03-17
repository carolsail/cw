// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuLayer extends BaseLayer {

    btnStart: cc.Node = null
    btnSetting: cc.Node = null
    btnGames: cc.Node = null
    btnShare: cc.Node = null

    onLoad() {
        this.btnStart = cc.find('main/btn_start', this.node)
        this.btnSetting = cc.find('bottom/btn_setting', this.node)
        this.btnGames = cc.find('bottom/btn_games', this.node)
        this.btnShare = cc.find('bottom/btn_share', this.node)
        this.btnStart.on('click', this.onStartClick, this)
        this.btnSetting.on('click', this.onSettingClick, this)
        this.btnGames.on('click', this.onGamesClick, this)
        this.btnShare.on('click', this.onShareClick, this)
    }

    onDestroy() {
        this.btnStart.off('click', this.onStartClick, this)
        this.btnSetting.off('click', this.onSettingClick, this)
        this.btnGames.off('click', this.onGamesClick, this)
        this.btnShare.off('click', this.onShareClick, this)
    }

    onEnable() { }

    onDisable() { }

    async onStartClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        await StaticInstance.fadeManager.fadeIn()
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MAIN)
        StaticInstance.gameManager.onGameStart()
    }

    onSettingClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SETTING)
    }

    onGamesClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MORE)
    }

    onShareClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (SdkManager.instance.getPlatform()) {
            SdkManager.instance.activeShare()
        } else {
            ToastManager.instance.show('仅支持小游戏平台', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
        }
    }
}

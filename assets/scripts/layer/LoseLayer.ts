// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoseLayer extends BaseLayer {

    panel: cc.Node = null
    btnRestart: cc.Node = null
    btnShare: cc.Node = null

    onLoad() {
        this.panel = cc.find('style/panel', this.node)
        this.btnRestart = cc.find('buttons/btn_restart', this.panel)
        this.btnShare = cc.find('buttons/btn_share', this.panel)
        this.btnRestart.on('click', this.onRestartClick, this)
        this.btnShare.on('click', this.onShareClick, this)
    }

    onDestroy() {
        this.btnRestart.off('click', this.onRestartClick, this)
        this.btnShare.off('click', this.onShareClick, this)
    }

    onEnable() {
        this.zoomIn(this.panel)
        SdkManager.instance.toggleBannerAd(true)
    }

    onDisable() {
        SdkManager.instance.toggleBannerAd(false)
    }

    async onRestartClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        await StaticInstance.fadeManager.fadeIn()
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LOSE, false)
        StaticInstance.gameManager.onGameStart()
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

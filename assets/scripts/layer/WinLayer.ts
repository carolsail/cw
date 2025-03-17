// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinLayer extends BaseLayer {

    panel: cc.Node = null
    btnNext: cc.Node = null
    btnShare: cc.Node = null

    onLoad() {
        this.panel = cc.find('style/panel', this.node)
        this.btnNext = cc.find('buttons/btn_next', this.panel)
        this.btnShare = cc.find('buttons/btn_share', this.panel)
        this.btnNext.on('click', this.onNextClick, this)
        this.btnShare.on('click', this.onShareClick, this)
    }

    onDestroy() {
        this.btnNext.off('click', this.onNextClick, this)
        this.btnShare.off('click', this.onShareClick, this)
    }

    onEnable() {
        this.zoomIn(this.panel)
        SdkManager.instance.toggleBannerAd(true)
    }

    onDisable() {
        SdkManager.instance.toggleBannerAd(false)
    }

    async onNextClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        await StaticInstance.fadeManager.fadeIn()
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.WIN, false)
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

// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import { StaticInstance } from "../StaticInstance";
import BaseLayer from "./Baselayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainLayer extends BaseLayer {

    btnPause: cc.Node = null

    onLoad() {
        this.btnPause = cc.find('btn_pause', this.node)
        this.btnPause.on('click', this.onPauseClick, this)
    }

    onDestroy() {
        this.btnPause.off('click', this.onPauseClick, this)
    }

    onEnable() { }

    onDisable() { }

    onPauseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT)
    }
}

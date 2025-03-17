
// Created by carolsail 
const { ccclass, property } = cc._decorator;

import { ENUM_GAME_STATUS } from "../Enum";
import { StaticInstance } from "../StaticInstance";
import DataManager from "./DataManager";
import PoolManager from "./PoolManager";

@ccclass
export default class GameManager extends cc.Component {

    stage: cc.Node = null


    onLoad() {
        StaticInstance.setGameManager(this)
        this.stage = cc.find('Stage', this.node)
    }

    onDestroy() { }

    // 开始游戏
    onGameStart() {
        DataManager.instance.reset()
        this.initGame()
    }

    // 初始化游戏
    async initGame() {
        DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
        this.stage.removeAllChildren()
        DataManager.instance.status = ENUM_GAME_STATUS.RUNING
        await StaticInstance.fadeManager.fadeOut()
    }
}

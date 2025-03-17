// Created by carolsail

import { ENUM_GAME_STATUS } from '../Enum';

const STORAGE_KEY = 'GAME_STORAGE_KEY'

export type ICallBack = {
    status: boolean,
    data: any,
    msg: string
}

export type IUser = {
    openid: string,
    nickname: string,
    gender: number,
    avatar: string
}

export default class DataManager {

    private static _instance: any = null

    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<DataManager>()
    }

    // 游戏状态
    status: ENUM_GAME_STATUS = ENUM_GAME_STATUS.UNRUNING
    // 加载进度
    loadingRate: number = 0
    // 声音开启
    _isMusicOn: boolean = true
    _isSoundOn: boolean = true
    // 更多游戏
    games: any[] = [
        { title: '消灭星星', icon: 'xiao2d', appid: 'wxefd5a4ddd8e31b44', url: 'https://store.cocos.com/app/detail/4183' },
        { title: '实况足球杯', icon: 'football', appid: 'wx0c16e9d7f9e87dac', url: 'https://store.cocos.com/app/detail/4221' },
        { title: '爬了个爬', icon: 'stairway', appid: 'wx025bcf3a316bfa27', url: 'https://store.cocos.com/app/detail/4314' },
        { title: '咩了个咩3D', icon: 'xiao3d', appid: 'wx5841e5a26082b380', url: 'https://store.cocos.com/app/detail/4148' },
        { title: '经典泡泡龙', icon: 'bubble', appid: 'wxcc2f90afdf28ae3b', url: 'https://store.cocos.com/app/detail/4370' },
    ]
    // 关卡
    level: number = 1
    levelMax: number = 1

    get isMusicOn() {
        return this._isMusicOn
    }

    set isMusicOn(data: boolean) {
        this._isMusicOn = data
    }

    get isSoundOn() {
        return this._isSoundOn
    }

    set isSoundOn(data: boolean) {
        this._isSoundOn = data
    }

    reset() {
        this.status = ENUM_GAME_STATUS.UNRUNING
    }

    save() {
        cc.sys.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            isSoundOn: this.isSoundOn,
            isMusicOn: this.isMusicOn,
            level: this.level,
            levelMax: this.levelMax
        }))
    }

    restore() {
        const _data = cc.sys.localStorage.getItem(STORAGE_KEY) as any
        try {
            const data = JSON.parse(_data)
            this.isMusicOn = data?.isMusicOn === false ? false : true
            this.isSoundOn = data?.isSoundOn === false ? false : true
            this.level = typeof data.level == 'number' ? data.level : 1
            this.levelMax = typeof data.levelMax == 'number' ? data.levelMax : 1
        } catch {
            this.isMusicOn = true
            this.isSoundOn = true
            this.level = 1
            this.levelMax = 1
        }
    }
}

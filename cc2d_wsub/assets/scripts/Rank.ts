import RankItem from "./RankItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rank extends cc.Component {

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private itemPrefab: cc.Prefab = null;

    @property(cc.Node)
    private loading: cc.Node = null;

    protected onLoad() {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME_SUB) return;
        // 监听来自主域的消息
        window['wx'].onMessage((msg: any) => this.onMessage(msg));
    }

    /**
     * 消息回调
     * @param msg 消息
     */
    private onMessage(msg: any) {
        switch (msg.event) {
            case 'setRank':
                this.setRank(msg.data);
                break;
            case 'getRank':
                this.getRank();
                break;
        }
    }

    /**
     * 获取玩家排行数据
     */
    private getRankValue(): Promise<number> {
        return new Promise(resolve => {
            window['wx'].getUserCloudStorage({
                keyList: ['max_level'],
                success: (res: any) => {
                    resolve(res.KVDataList[0] ? parseInt(res.KVDataList[0].value) : 0);
                },
                fail: () => {
                    resolve(-1);
                }
            });
        });
    }

    /**
     * 设置玩家排行数据
     * @param value 排好时间
     */
    private async setRank(value: number) {
        let oldScore = await this.getRankValue();
        if (oldScore === -1) return;
        if (value > oldScore) {
            window['wx'].setUserCloudStorage({
                KVDataList: [{
                    key: 'max_level',
                    value: value.toString()
                }],
                success: () => {
                    console.log('[setScore]', 'success');
                },
                fail: () => {
                    console.log('[setScore]', 'fail');
                }
            });
        }
    }

    /**
     * 获取好友排行榜
     */
    private async getRank() {
        // 显示加载动画
        this.showLoading();
        // 调用微信的函数
        await new Promise((resolve: any) => {
            window['wx'].getFriendCloudStorage({
                keyList: ['max_level'],
                success: (res: any) => {
                    console.log('[getRank: capsule2048]')
                    let data = res.data
                    if (res.data.length) {
                        data = res.data.filter((item: any) => item.KVDataList.length > 0)
                    }
                    // 对数据进行排序
                    data.sort((a: any, b: any) => {
                        return parseInt(b.KVDataList[0].value) - parseInt(a.KVDataList[0].value);
                    });
                    // 排序之后进行展示
                    this.updateRankList(data);
                    resolve();
                },
                fail: (res: any) => {
                    console.log('[getRank]', 'fail');
                    resolve();
                }
            });
        });
        // 关闭加载动画
        this.hideLoading();
    }

    /**
     * 更新好友排行
     * @param data 数据
     */
    private updateRankList(data: any[]) {
        let count = Math.max(data.length, this.content.childrenCount);
        for (let i = 0; i < count; i++) {
            if (data[i] && this.content.children[i]) {
                // 已存在节点，更新并展示
                this.content.children[i].active = true;
                this.content.children[i].getComponent(RankItem).set(i + 1, data[i]);
            } else if (data[i] && !this.content.children[i]) {
                // 节点不足，再实例化一个，更新信息
                let node = cc.instantiate(this.itemPrefab);
                node.setParent(this.content);
                node.getComponent(RankItem).set(i + 1, data[i]);
            } else {
                // 节点多了，关掉吧
                this.content.children[i].active = false;
            }
        }
    }

    /**
     * 显示加载动画
     */
    private showLoading() {
        this.loading.active = true;
    }

    /**
     * 关闭加载动画
     */
    private hideLoading() {
        this.loading.active = false;
    }

}

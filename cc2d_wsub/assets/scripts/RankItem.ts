const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    @property(cc.Label)
    private rankingLabel: cc.Label = null;

    @property(cc.Sprite)
    private avatarSprite: cc.Sprite = null;

    @property(cc.Label)
    private nicknameLabel: cc.Label = null;

    @property(cc.Label)
    private scoreLabel: cc.Label = null;

    /**
     * 设置展示的信息
     * @param ranking 排名
     * @param user 用户数据
     */
    public set(ranking: number, user: any) {
        this.rankingLabel.string = ranking.toString();
        this.nicknameLabel.string = user.nickname;
        this.scoreLabel.string = `${user.KVDataList[0].value.toString()}`;
        this.updateAvatar(user.avatarUrl);
    }

    /**
     * 更新头像
     * @param url 头像链接
     */
    private updateAvatar(url: string) {
        let image = window['wx'].createImage();
        image.onload = () => {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            this.avatarSprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        if (url) image.src = url;
    }

}
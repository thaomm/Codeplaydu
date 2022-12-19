import { _decorator, Component, Node, WebView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('web')
export class web extends Component {
    @property({ type: WebView })
    webView: WebView = null;

    start() {

    }

    update(deltaTime: number) {

    }

    onNavigate() {
        this.webView.url = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4OTA2NDc2Mg==#wechat_redirect"
    }
}


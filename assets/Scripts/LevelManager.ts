import { _decorator, Component, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('LevelManager')
export class LevelManager extends Component {
    @property({ type: Node })
    mainGame: Node = null;

    @property({ type: Node })
    levelSelect: Node = null;

    public levels;

    private static instance: LevelManager;
    static GetInstance(): LevelManager {
        return this.instance;
    }

    onLoad() {
        LevelManager.instance = this;
        this.CreateLevel();
    }

    start() {


    }

    OpenLevel() {
        this.levelSelect.active = false;
        this.mainGame.active = true;

    }

    CreateLevel() {
        this.levels = [];
        let level1 = {
            startPoint: [4, 1],
            path: [[4, 2], [4, 3], [3, 3], [3, 4]],
            endPoint: [3, 5]
        }
        this.levels.push(level1);


        let level2 = {
            startPoint: [4, 1],
            path: [[4, 2], [4, 3], [4, 4], [3, 4], [3, 2], [2, 2], [1, 2], [1, 3], [1, 4]],
            endPoint: [2, 4]
        }
        this.levels.push(level2);

        console.log(this.levels);
    }
}


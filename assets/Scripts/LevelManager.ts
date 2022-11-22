import { _decorator, Component, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

type Level = {
    startPoint: number[], //[row, col]
    path: number[][],
    endPoint: number[]
}

@ccclass('LevelManager')
export class LevelManager extends Component {
    levels: Level[] = [];

    private static instance: LevelManager;
    static GetInstance():LevelManager{
        return this.instance;
    }

    start() {
        LevelManager.instance = this;

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
    }




}


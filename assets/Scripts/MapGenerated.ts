import { _decorator, Component, Node, Enum, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

export enum BlockType {
    START_BLOCK,
    PATH_BLOCK,
    END_BLOCK,
    HIGH_BLOCK
}

@ccclass('MapGenerated')
export class MapGenerated extends Component {
    mapSize: number = 7;

    private currentLevel;

    level1 = {
        startPoint: {x: 3, y: 2},
        path: [{x: 3, y: 3}, {x: 3, y: 4}, {x: 4, y: 4}],
        endPoint: {x: 5, y: 4}
    }

    onLoad() {
        this.SetMap();
        
    }

    private SetMap() {
        this.currentLevel = this.level1;
        console.log(this.currentLevel);
        
        let levelMap = Array.from({length: 7}, () => Array.from({length: 7})); 
        for (let i = 0; i < this.mapSize; i++) {   
            for (let j = 0; j < this.mapSize; j++) {
                levelMap[i][j] = BlockType.HIGH_BLOCK;
            }
        }

        levelMap[this.currentLevel.startPoint.x][this.currentLevel.startPoint.y] = BlockType.START_BLOCK;
        levelMap[this.currentLevel.endPoint.x][this.currentLevel.endPoint.y] = BlockType.END_BLOCK;
        for (let i = 0; i < this.currentLevel.path.length; i++)
        {
            levelMap[this.currentLevel.path[i].x][this.currentLevel.path[i].y] = BlockType.PATH_BLOCK;
        }

        console.log(levelMap);
        
    }

    update(deltaTime: number) {
        
    }


}


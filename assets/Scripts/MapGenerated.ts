import { _decorator, Component, Node, Enum, Vec2, Prefab, instantiate, Vec3, RichText } from 'cc';
import { LevelManager } from './LevelManager';
const { ccclass, property } = _decorator;

export enum BlockType {
    START_BLOCK,
    PATH_BLOCK,
    END_BLOCK,
    HIGH_BLOCK
}

@ccclass('MapGenerated')
export class MapGenerated extends Component {
    @property({type:Prefab})
    blocks:Prefab[]=[];

    @property({type:Node})
    tileMap:Node=null;

    @property({type:Node})
    player:Node=null;

    @property({type:Node})
    chest:Node=null;

    mapSize: number = 7;

    currentLevel;
    private levelMap
    startMoving: boolean = false;

    private chestPos;
    private levels;

    private static instance: MapGenerated;

    static GetInstance():MapGenerated{
        return this.instance;
    }

    onLoad() {
        MapGenerated.instance = this;
        this.CreateLevel();
        this.SetMap();
        this.GenerateMap();
    }

    private GenerateMap() {
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {

                let block;
                switch (this.levelMap[i][j]) {
                    case BlockType.START_BLOCK:
                        block = instantiate(this.blocks[0]);
                        block.parent = this.tileMap;                        
                        break;
                    case BlockType.PATH_BLOCK:
                        block = instantiate(this.blocks[1]);
                        block.parent = this.tileMap;
                        break;
                    case BlockType.HIGH_BLOCK:
                        const randomIndex = Math.floor(Math.random() * 3);
                        block = instantiate(this.blocks[randomIndex + 2]);
                        block.parent = this.tileMap;
                        break;
                    case BlockType.END_BLOCK:
                        block = instantiate(this.blocks[1]);
                        block.parent = this.tileMap;
                        this.chestPos = block;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    private SetMap() {       
        this.levelMap = Array.from({length: 7}, () => Array.from({length: 7})); 
        for (let i = 0; i < this.mapSize; i++) {   
            for (let j = 0; j < this.mapSize; j++) {
                this.levelMap[i][j] = BlockType.HIGH_BLOCK;
            }
        }

        this.levelMap[this.currentLevel.startPoint[0]][this.currentLevel.startPoint[1]] = BlockType.START_BLOCK;
        this.levelMap[this.currentLevel.endPoint[0]][this.currentLevel.endPoint[1]] = BlockType.END_BLOCK;
        for (let i = 0; i < this.currentLevel.path.length; i++)
        {
            this.levelMap[this.currentLevel.path[i][0]][this.currentLevel.path[i][1]] = BlockType.PATH_BLOCK;
        }
        
    }

    update(deltaTime: number) {
        const st = this.tileMap.getChildByName("StartBlock");

        if (st == null)
        {
            return;
        }

        if (st.position != Vec3.ZERO && !this.startMoving)   
        {            
            this.SetPlayerStartPoint();
        }     
    }

    SetPlayerStartPoint(){  
        const st = this.tileMap.getChildByName("StartBlock");           
        this.player.setWorldPosition(st.worldPosition);
        this.chest.setWorldPosition(this.chestPos.worldPosition);
    }

    SetPlayerPosition(x:number, y:number){
        let index = x * this.mapSize + y;
        const pos = this.tileMap.children[index];
        this.player.setWorldPosition(pos.worldPosition);
        console.log(index);
        
    }

    GetLevelMap(){
        return this.levelMap;
    }

    SetLevel(event: Event){
        const node = event.target as unknown as Node;
        const level = node.getChildByName("levelNumber").getComponent(RichText).string;

        
        this.currentLevel = LevelManager.GetInstance().levels[level];

        console.log(this.currentLevel);
        
    }

    CreateLevel(){
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


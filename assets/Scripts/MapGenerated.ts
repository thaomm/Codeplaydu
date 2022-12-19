import { _decorator, Component, Node, Enum, Vec2, Prefab, instantiate, Vec3, RichText, Label } from 'cc';
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
    @property({ type: Prefab })
    blocks: Prefab[] = [];

    @property({ type: Prefab })
    decors: Prefab[] = [];

    @property({ type: Node })
    tileMap: Node = null;

    @property({ type: Node })
    player: Node = null;

    @property({ type: Node })
    chest: Node = null;

    mapSize: number = 7;

    currentLevel;
    private levelMap
    startMoving: boolean = false;

    private chestPos;

    private static instance: MapGenerated;

    static GetInstance(): MapGenerated {
        return this.instance;
    }

    onLoad() {
        MapGenerated.instance = this;
    }

    onEnable() {

        // this.currentLevel = LevelManager.GetInstance().levels[0];
        this.SetLevel();
    }

    SetLevel() {
        // const node = event.target as unknown as Node;
        // const level = node.getChildByName("levelNumber").getComponent(Label).string;
        LevelManager.GetInstance().OpenLevel();

        this.currentLevel = LevelManager.GetInstance().levels[1];

        console.log(this.currentLevel);


        this.SetMap();
        this.GenerateMap();

    }

    private SetMap() {

        this.levelMap = Array.from({ length: 7 }, () => Array.from({ length: 7 }));
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {
                this.levelMap[i][j] = BlockType.HIGH_BLOCK;
            }
        }

        this.levelMap[this.currentLevel.startPoint[0]][this.currentLevel.startPoint[1]] = BlockType.START_BLOCK;
        this.levelMap[this.currentLevel.endPoint[0]][this.currentLevel.endPoint[1]] = BlockType.END_BLOCK;
        for (let i = 0; i < this.currentLevel.path.length; i++) {
            this.levelMap[this.currentLevel.path[i][0]][this.currentLevel.path[i][1]] = BlockType.PATH_BLOCK;
        }

    }

    private GenerateMap() {
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {

                let block;
                let decor: Node;
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
                        const randomBlockIndex = Math.floor(Math.random() * 3);
                        block = instantiate(this.blocks[randomBlockIndex + 2]);
                        block.parent = this.tileMap;

                        const randomDecorIndex = Math.floor(Math.random() * this.decors.length);
                        decor = instantiate(this.decors[randomDecorIndex]);
                        decor.parent = block;

                        const randomScale = Math.random() + 0.5;
                        decor.setWorldScale(new Vec3(randomScale, randomScale, 1));
                        break;
                    case BlockType.END_BLOCK:
                        block = instantiate(this.blocks[1]);
                        block.parent = this.tileMap;
                        break;
                    default:
                        break;
                }
            }
        }
    }



    update(deltaTime: number) {
        if (this.tileMap.children.length > 0 && this.tileMap.children[this.mapSize].position.x != 0 && !this.startMoving) {
            this.SetPlayerStartPoint();
        }
    }

    SetPlayerStartPoint() {
        let playeridx = this.currentLevel.startPoint[0] * this.mapSize + this.currentLevel.startPoint[1];
        const playerpos = this.tileMap.children[playeridx];
        this.player.setWorldPosition(playerpos.worldPosition);

        let chestidx = this.currentLevel.endPoint[0] * this.mapSize + this.currentLevel.endPoint[1];
        const chestpos = this.tileMap.children[chestidx];
        this.chest.setWorldPosition(chestpos.worldPosition);
    }

    SetPlayerPosition(x: number, y: number) {
        let index = x * this.mapSize + y;
        const pos = this.tileMap.children[index];
        this.player.setWorldPosition(pos.worldPosition);
    }

    GetLevelMap() {
        return this.levelMap;
    }


}


import { _decorator, Component, Node, instantiate, Prefab } from 'cc';
import { BlockType, MapGenerated } from './MapGenerated';
const { ccclass, property } = _decorator;

enum Moves {
    STAY,
    FORWARD,
    TURN_LEFT,
    TURN_RIGHT
}

@ccclass('MoveController')
export class MoveController extends Component {
    @property({type:Prefab})
    moveBlocks:Prefab[]=[];

    @property({type:Node})
    stepMap:Node=null;

    currentPos = [0,0];
    rotation = [0,1];
    nextMove: Moves = Moves.STAY;
    nextPos = [0,0];
    nextRotation = [0,1];

    private moves:Moves[];

    start() {
        this.moves = [];
    }

    init() {
        this.currentPos = [0,0];
        this.rotation = [0,1];
        this.nextPos = [0,0];
        this.nextRotation = [0,1];
        this.currentPos = MapGenerated.GetInstance().currentLevel.startPoint;
    }

    update(deltaTime: number) {

    }

    SetNextPosition(nextMove: Moves) {
        const x:number = this.rotation[0];
        const y:number = this.rotation[1];
        switch (nextMove) {
            case Moves.FORWARD:
                {
                    this.nextPos[0] = this.currentPos[0] + this.rotation[0];
                    this.nextPos[1] = this.currentPos[1] + this.rotation[1];
                    break;
                }
            case Moves.TURN_LEFT:
                {
                    this.nextRotation[0] = -y;
                    this.nextRotation[1] = x;
                    break;
                }
            case Moves.TURN_RIGHT:
                {
                    this.nextRotation[0] = y;
                    this.nextRotation[1] = -x;
                    break;
                }
        }
    }

    public ResetMove(){
        this.stepMap.destroyAllChildren();
        this.moves = [];
        MapGenerated.GetInstance().startMoving = false;
        this.init();
    }

    public MoveForward(){
        this.moves.push(Moves.FORWARD);
        this.AddMove(Moves.FORWARD)
    }

    public TurnLeft(){
        this.moves.push(Moves.TURN_LEFT);
        this.AddMove(Moves.TURN_LEFT)
    }

    public TurnRight(){
        this.moves.push(Moves.TURN_RIGHT);
        this.AddMove(Moves.TURN_RIGHT)
    }

    PlayMove(){
        this.currentPos = MapGenerated.GetInstance().currentLevel.startPoint;
        MapGenerated.GetInstance().startMoving = true;
        const map = MapGenerated.GetInstance().GetLevelMap();
        for(let i = 0; i < this.moves.length; i++)
        {
            const curr = this.currentPos;
            console.log(curr);
            
            this.SetNextPosition(this.moves[i]);
            if (map[this.nextPos[0]][this.nextPos[1]] == BlockType.PATH_BLOCK)
                {        
                    console.log("move");
                                
                   this.currentPos = this.nextPos; 
                   this.rotation = this.nextRotation;
                   MapGenerated.GetInstance().SetPlayerPosition(this.currentPos[0], this.currentPos[1]);
                }
        }
    }

    AddMove(dir:Moves){
        let moveBlock;
        switch (dir) {
            case Moves.FORWARD:
                moveBlock = instantiate(this.moveBlocks[0]);
                moveBlock.parent = this.stepMap;
                break;
            case Moves.TURN_LEFT:
                moveBlock = instantiate(this.moveBlocks[1]);
                moveBlock.parent = this.stepMap;
                break;
            case Moves.TURN_RIGHT:
                moveBlock = instantiate(this.moveBlocks[2]);
                moveBlock.parent = this.stepMap;
                break;
            default:
                break;
        }
    }
}


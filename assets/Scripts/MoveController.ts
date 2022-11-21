import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

enum Moves {
    STAY,
    FORWARD,
    TURN_LEFT,
    TURN_RIGHT
}

@ccclass('MoveController')
export class MoveController extends Component {
    currentPos = { x: 0, y: 0 };
    rotation = { x: 0, y: 1 };
    nextMove: Moves = Moves.STAY;
    nextPos = { x: 0, y: 0 };
    nextRotation = { x: 0, y: 1 };

    start() {

    }

    update(deltaTime: number) {

    }

    SetNextPosition(nextMove: Moves) {
        switch (nextMove) {
            case Moves.FORWARD:
                {
                    this.nextPos.x = this.currentPos.x + this.rotation.x;
                    this.nextPos.y = this.currentPos.y + this.rotation.y;
                    break;
                }
            case Moves.TURN_LEFT:
                {
                    this.nextRotation.x = this.rotation.y;
                    this.nextRotation.y = -this.rotation.x;
                    break;
                }
            case Moves.TURN_RIGHT:
                {
                    this.nextRotation.x = -this.rotation.y;
                    this.nextRotation.y = this.rotation.x;
                    break;
                }
        }
    }
}


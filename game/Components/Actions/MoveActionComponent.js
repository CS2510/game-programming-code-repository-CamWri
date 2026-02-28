class MoveActionComponent extends ActionComponent{
    static requiredStats = ["Speed", "MaxMovement", "RemainingMovement"]
    static maxCooldown = 1

    remainingMovement

    constructor(){
        super()
    }

    start(){        
        this.remainingMovement = this.characterStats["RemainingMovement"]
    }

    endExecution(){
        super.endExecution()
    }

    update() {
        let movementChange = new Vector2(0, 0)

        if(Input.keysDown.includes("ArrowRight")){
            movementChange.x = 1
        }
        if(Input.keysDown.includes("ArrowLeft")){
            movementChange.x = -1
        }
        if(Input.keysDown.includes("ArrowDown")){
            movementChange.y = 1
        }
        if(Input.keysDown.includes("ArrowUp")){
            movementChange.y = -1
        }

        let totalMovementChange = new Vector2(movementChange.x * this.characterStats["Speed"] * Time.deltaTime, movementChange.y * this.characterStats["Speed"] * Time.deltaTime)

        this.remainingMovement -= Math.sqrt(totalMovementChange.x ** 2 + totalMovementChange.y ** 2)

        this.gameObject.getComponent(CharacterComponent).stats["RemainingMovement"] = this.remainingMovement

        this.transform.position.x += totalMovementChange.x
        this.transform.position.y += totalMovementChange.y

        if (this.remainingMovement <= 0) {
            this.endExecution()
        }
    }

    canCancel(){
        return true
    }
}
class MoveActionComponent extends ActionComponent{
    static requiredStats = ["Speed", "MaxMovement"]
    static maxCooldown = 1

    characterStats = {}

    player

    constructor(){
        super()
        this.movementLeft = 300        
    }

    start(){
        //START DOESN"T WORK YET WHEN ADDING GAMEOBJECT AFTER RUNTIME
        
        //Get the value from MaxMovement and set it equal to movmentLeft
        //this.movementLeft = this.characterStats["MaxMovement"]
        console.log(this.characterStats)
    }

    endExecution(){
        this.gameObject.components.find(a => a instanceof CharacterComponent).activeAbility = null
        this.gameObject.components = this.gameObject.components.filter(a => !(a instanceof this.constructor))
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

        this.movementLeft -= Math.sqrt(totalMovementChange.x ** 2 + totalMovementChange.y ** 2)

        this.transform.position.x += totalMovementChange.x
        this.transform.position.y += totalMovementChange.y

        //Command Objects can do, undo, and lifecycle 

        /*
        Once advanced inputs are done, then I can change this to if Space was pressed down this frame to
        allow a movement toggle rather than having a whole seperate button needed
        */
        if (this.movementLeft <= 0) {
            this.endExecution()
        }
    }
}
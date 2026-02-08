class MoveActionComponent extends ActionComponent{
    static requiredStats = ["Speed", "MaxMovement"]
    static maxCooldown = 1

    characterStats = {}

    cooldown = 0

    constructor(){
        super()
        this.movementLeft = 300        
    }

    start(){
        //START DOESN"T WORK YET WHEN ADDING GAMEOBJECT AFTER RUNTIME
        
        //Get the value from MaxMovement and set it equal to movmentLeft
        //this.movementLeft = this.characterStats["MaxMovement"]
        //console.log(this.characterStats)
    }

    endExecution(){
        this.gameObject.components.find(a => a instanceof CharacterComponent).activeAbility = null
        this.gameObject.components = this.gameObject.components.filter(a => !(a instanceof this.constructor))
    }

    update() {
        if(Input.keysDown.includes("ArrowRight")){
            this.transform.position.x += Time.deltaTime * this.characterStats["Speed"]
            this.movementLeft--
        }
        if(Input.keysDown.includes("ArrowLeft")){
            this.transform.position.x -= Time.deltaTime * this.characterStats["Speed"]
            this.movementLeft--
        }
        if(Input.keysDown.includes("ArrowDown")){
            this.transform.position.y += Time.deltaTime * this.characterStats["Speed"]
            this.movementLeft--
        }
        if(Input.keysDown.includes("ArrowUp")){
            this.transform.position.y -= Time.deltaTime * this.characterStats["Speed"]
            this.movementLeft--
        }

        //Command Objects can do, undo, and lifecycle 

        /*
        Once advanced inputs are done, then I can change this to if "KeyM" was pressed down this frame to
        allow a movement toggle rather than having a whole seperate button needed
        */
        if (this.movementLeft <= 0) {
            this.endExecution()
        }
    }
}
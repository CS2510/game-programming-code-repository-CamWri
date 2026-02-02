class MoveActionComponent extends ActionAbilityComponent{
    /* 
    To Do: Slight Optimization
    May be a bit more optimized to count down from max movement rather than keeping 
    a variable for max distance and then incrementing distance traveled
    */
    constructor(){
        super()
        this.distanceTraveled = 0
        this.maxDistance = 0

        this.inUse = false
    }

    start(){
        this.turnBaseGameMangerGameObject = Engine.currentScene.gameObjects.find(a => a instanceof TurnBasedManagerGameObject)
        this.turnBaseGameMangerComponent = this.turnBaseGameMangerGameObject.components.find(a => a instanceof TurnBaseManagerComponent)
    }

    startExecution(totalDistancePossible) {
        this.inUse = true

        this.maxDistance = totalDistancePossible
    }

    endExecution(){
        if(this.distanceTraveled >= this.maxDistance){
            this.turnBaseGameMangerComponent.hasMovement = false
        }
        
        super.endExecution()
    }

    update() {
        if(this.inUse){
            console.log(this.maxDistance - this.distanceTraveled)
            if(Input.keysDown.includes("ArrowRight")){
                this.transform.position.x++
                this.distanceTraveled++
            }
            if(Input.keysDown.includes("ArrowLeft")){
                this.transform.position.x--
                this.distanceTraveled++
            }
            if(Input.keysDown.includes("ArrowDown")){
                this.transform.position.y++
                this.distanceTraveled++
            }
            if(Input.keysDown.includes("ArrowUp")){
                this.transform.position.y--
                this.distanceTraveled++
            }

            /*
            Once advanced inputs are done, then I can change this to if "KeyM" was pressed down this frame to
            allow a movement toggle rather than having a whole seperate button needed
            */
            if (Input.keysDown.includes("Space") || this.distanceTraveled >= this.maxDistance) {
                this.inUse = false
                this.endExecution()
            }
        }
    }

}
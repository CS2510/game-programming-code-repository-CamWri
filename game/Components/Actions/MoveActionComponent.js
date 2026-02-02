class MoveActionComponent extends ActionAbilityComponent{
    constructor(){
        super()
        this.distanceTraveled = 0
        this.maxDistance = 0

        this.inUse = false
    }

    startExecution(totalDistancePossible) {
        this.inUse = true

        this.maxDistance = totalDistancePossible
    }

    endExecution(){
        if(this.distanceTraveled >= this.maxDistance){
            this.turnBaseGameMangerGameObject = Engine.currentScene.gameObjects.find(a => a instanceof TurnBasedManagerGameObject)
            this.turnBaseGameMangerComponent = this.turnBaseGameMangerGameObject.components.find(a => a instanceof TurnBaseManagerComponent)
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

            if(Input.keysDown.includes("Space") || this.distanceTraveled >= this.maxDistance){
                this.inUse = false
                this.endExecution()
            }
        }
    }

}
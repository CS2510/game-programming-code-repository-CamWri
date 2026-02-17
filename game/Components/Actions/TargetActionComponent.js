class TargetActionComponent extends ActionComponent{
     static maxTargets = 1
 
    targetSelectionIndex = 0
    targets = []
    currentSelectedTarget

    firedProjectiles = false

    actionProjectiles = []

    constructor(){
        super()
    }

    start(targets){
        this.targets = targets
        this.currentTargets = []

        this.currentSelectedTarget = this.targets[this.targetSelectionIndex]

        this.changeSelectedEnemy(0)
    }

    update(){
        this.actionProjectiles = this.actionProjectiles.filter(proj => !proj.markForDestroy)

        if(!this.firedProjectiles){
            if (Input.keysDown.includes("ArrowRight")) this.changeSelectedEnemy(1)
            if (Input.keysDown.includes("ArrowLeft")) this.changeSelectedEnemy(-1)

            if(Input.keysDown.includes("Space")) {
                if (this.currentTargets.includes(this.currentSelectedTarget)){
                    this.deselectEnemy()
                }

                // @ts-ignore
                if(!this.currentTargets.includes(this.currentSelectedTarget) && this.constructor.maxTargets > this.currentTargets.length){
                    this.selectEnemy()
                }
            }
        }

        if (this.isExecutionComplete()){
            this.endExecution(this.constructor)
        }
    } 

    isExecutionComplete(){
        return this.actionProjectiles.length == 0 && this.firedProjectiles
    }

    endExecution(ActionComponent){
        for (let target of this.targets){
            //Need to have some way of getting the original stroke style before any adjustments
            target.getComponent(Polygon).strokeStyle = "red"
        }

        super.endExecution(ActionComponent)
    }

    changeSelectedEnemy(direction) {
        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon && polygon.strokeStyle != "blue") polygon.strokeStyle = "red"

        this.targetSelectionIndex = (this.targetSelectionIndex + direction + this.targets.length) % this.targets.length

        this.currentSelectedTarget = this.targets[this.targetSelectionIndex]

        let newPolygon = this.currentSelectedTarget.getComponent(Polygon)
        if (newPolygon && newPolygon.strokeStyle != "blue") newPolygon.strokeStyle = "yellow"
    }

    selectEnemy(){
        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedTarget)
    }

    deselectEnemy(){
        this.currentTargets = this.currentTargets.filter(
            target => target !== this.currentSelectedTarget
        )

        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "yellow"
    }
}
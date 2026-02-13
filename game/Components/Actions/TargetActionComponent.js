class TargetActionComponent extends ActionComponent{
    targetSelectionIndex = 0
    targets = []
    currentSelectedTarget

    constructor(){
        super()
    }

    start(targets){
        this.targets = targets
        this.currentTargets = []

        this.currentSelectedTarget = this.targets[this.targetSelectionIndex]

        this.changeSelectedEnemy(0)
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
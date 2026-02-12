class TargetActionComponent extends ActionComponent{
    targetSelectionIndex = 0
    targets = []
    currentSelectedTargets

    constructor(){
        super()
    }

    start(targets){
        this.targets = targets
        this.currentTargets = []

        this.currentSelectedTargets = this.targets[this.targetSelectionIndex]

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
        let polygon = this.currentSelectedTargets.getComponent(Polygon)
        if (polygon && polygon.strokeStyle != "blue") polygon.strokeStyle = "red"

        this.targetSelectionIndex = (this.targetSelectionIndex + direction + this.targets.length) % this.targets.length

        this.currentSelectedTargets = this.targets[this.targetSelectionIndex]

        let newPolygon = this.currentSelectedTargets.getComponent(Polygon)
        if (newPolygon && newPolygon.strokeStyle != "blue") newPolygon.strokeStyle = "yellow"
    }

    selectEnemy(){
        let polygon = this.currentSelectedTargets.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedTargets)
    }

    deselectEnemy(){
        this.currentTargets = this.currentTargets.filter(
            target => target !== this.currentSelectedTargets
        )

        let polygon = this.currentSelectedTargets.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "yellow"
    }
}
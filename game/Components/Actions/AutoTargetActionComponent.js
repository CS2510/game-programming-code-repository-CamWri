class AutoTargetActionComponent extends ActionComponent{ 
    targetSelectionIndex = 0

    targets = []
    currentTargets = []
    
    currentSelectedTarget

    firedProjectiles = false

    actionProjectiles = []

    constructor(){
        super()
    }

    start(){
        // @ts-ignore
        instantiate(new SpellRangeGameObject(this.constructor.range), this.gameObject.transform.position.clone())

        Events.registerListener("Enemy Can Be Targeted", this)
    }

    update(){
        this.actionProjectiles = this.actionProjectiles.filter(proj => !proj.markForDestroy)

        if(!this.firedProjectiles){
            if (Input.keysDownThisFrame.includes("ArrowRight")) this.changeSelectedEnemy(1)
            if (Input.keysDownThisFrame.includes("ArrowLeft")) this.changeSelectedEnemy(-1)

            // @ts-ignore
            if (Input.keysDownThisFrame.includes("Space") && this.constructor.maxTargets > this.currentTargets.length) {
                this.selectEnemy();
            }

            if (Input.keysDownThisFrame.includes("Backspace")) {
                this.deselectLastEnemy();
            }
        }

        if (this.isExecutionComplete()){
            this.endExecution()
        }
    } 

    isExecutionComplete(){
        return this.actionProjectiles.length == 0 && this.firedProjectiles
    }

    endExecution(){
        for (let target of this.targets){
            if(target instanceof EnemyCharacterGameObject){
                target.getComponent(Polygon).strokeStyle = "red"
            } else {
                target.getComponent(Polygon).strokeStyle = "green"
            }

        }

        super.endExecution()
    }

    changeSelectedEnemy(direction, attempts = 0) {
        if (this.targets.length === 0) return;

        if (attempts >= this.targets.length) return;

        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon && !this.currentTargets.includes(this.currentSelectedTarget)) polygon.strokeStyle = "red"

        this.targetSelectionIndex = (this.targetSelectionIndex + direction + this.targets.length) % this.targets.length
        this.currentSelectedTarget = this.targets[this.targetSelectionIndex]

        if (this.currentTargets.includes(this.currentSelectedTarget)) {
            this.changeSelectedEnemy(direction, attempts + 1)
        } else {
            let newPolygon = this.currentSelectedTarget.getComponent(Polygon)
            if (newPolygon) newPolygon.strokeStyle = "yellow"
        }
    }

    selectEnemy(){
        if (this.currentTargets.includes(this.currentSelectedTarget)) return; // prevent duplicates

        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedTarget)

        this.changeSelectedEnemy(1)
    }


    deselectLastEnemy(){
        let lastSelected = this.currentTargets.pop();
        if (lastSelected) {
            let polygon = lastSelected.getComponent(Polygon);
            if (polygon) polygon.strokeStyle = "red";
            this.changeSelectedEnemy(0)
        }
    }

    onDestroy(){
        GameObject.find("Spell Range Game Object").destroy()
    }

    canCancel(){
        return !this.firedProjectiles
    }

    handleEvent(message, args){
        if(args[0].getComponent(EnemyComponent)){
            this.targets.push(args[0])
            this.currentSelectedTarget = this.targets[this.targetSelectionIndex]
            if(this.targets.length == 1){
                this.changeSelectedEnemy(0)
            }
        }
    }
}
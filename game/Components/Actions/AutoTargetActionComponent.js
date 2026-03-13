class AutoTargetActionComponent extends ActionComponent{ 
    targetSelectionIndex = 0

    targets = []
    currentTargets = []
    
    currentSelectedTarget

    firedProjectiles = false

    actionProjectiles = []

    canSelectPlayerCharacters = false
    canSelectEnemyCharacters = false
    onlySelectSelf = false

    constructor(){
        super()
    }

    start(){
        // @ts-ignore
        instantiate(new SpellRangeGameObject(this.constructor.range), this.gameObject.transform.position.clone())
        if(this.canSelectEnemyCharacters) Events.registerListener("Enemy Can Be Targeted", this)
        if(this.canSelectPlayerCharacters) Events.registerListener("Player Can Be Targeted", this)
        if(this.onlySelectSelf) {
            this.targets.push(this.gameObject)
            this.currentSelectedTarget = this.gameObject
            this.changeSelectedCharacter(0)
        }
    }

    update(){
        this.actionProjectiles = this.actionProjectiles.filter(proj => !proj.markForDestroy)

        if(!this.firedProjectiles){
            if (Input.keysDownThisFrame.includes("ArrowRight")) this.changeSelectedCharacter(1)
            if (Input.keysDownThisFrame.includes("ArrowLeft")) this.changeSelectedCharacter(-1)

            console.log(this.currentTargets.length)

            // @ts-ignore
            if (Input.keysDownThisFrame.includes("Space") && this.constructor.maxTargets > this.currentTargets.length) {
                this.selectCharacter();
            }

            if (Input.keysDownThisFrame.includes("Backspace")) {
                this.deselectLastCharacter();
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
        Events.unregisterAllListeners(this)

        for (let target of this.targets){
            this.updateOutlineColor(target)
        }

        this.targets = []

        super.endExecution()
    }

    changeSelectedCharacter(direction, attempts = 0) {
        if (this.targets.length === 0 || !this.currentSelectedTarget) return;

        if (attempts >= this.targets.length) return;

        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon && !this.currentTargets.includes(this.currentSelectedTarget)) this.updateOutlineColor(this.currentSelectedTarget)

        this.targetSelectionIndex = (this.targetSelectionIndex + direction + this.targets.length) % this.targets.length
        this.currentSelectedTarget = this.targets[this.targetSelectionIndex]

        if (this.currentTargets.includes(this.currentSelectedTarget)) {
            this.changeSelectedCharacter(direction, attempts + 1)
        } else {
            let newPolygon = this.currentSelectedTarget.getComponent(Polygon)
            if (newPolygon) newPolygon.strokeStyle = "yellow"
        }
    }

    selectCharacter(){
        if (this.currentTargets.includes(this.currentSelectedTarget) || !this.currentSelectedTarget ) return; // prevent duplicates

        let polygon = this.currentSelectedTarget.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedTarget)

        this.changeSelectedCharacter(1)
    }


    deselectLastCharacter(){
        let lastSelected = this.currentTargets.pop();
        if (lastSelected) {
            let polygon = lastSelected.getComponent(Polygon);
            if (polygon) this.updateOutlineColor(lastSelected)
            this.changeSelectedCharacter(0)
        }
    }

    onDestroy(){
        GameObject.find("Spell Range Game Object").destroy()
    }

    canCancel(){
        return !this.firedProjectiles
    }

    //May Want to change this to a static variable
    updateOutlineColor(entity){
        if(entity instanceof EnemyCharacterGameObject){
            entity.getComponent(Polygon).strokeStyle = "red"
        } else {
            entity.getComponent(Polygon).strokeStyle = "green"
        }
    }

    handleEvent(message, args){
        if(args[0].getComponent(EnemyComponent) && message == "Enemy Can Be Targeted"){
            console.log("Enemy")
            this.targets.push(args[0])
            this.currentSelectedTarget = this.targets[this.targetSelectionIndex]
            if(this.targets.length == 1){
                this.changeSelectedCharacter(0)
            }
        }

        if(args[0].getComponent(PlayerComponent) && message == "Player Can Be Targeted"){
            console.log("Player")
            this.targets.push(args[0])
            if(this.targets.length == 1){
                this.currentSelectedTarget = this.targets[this.targetSelectionIndex]
                this.changeSelectedCharacter(0)
            }
        }
    }
}
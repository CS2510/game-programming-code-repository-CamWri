class ClickTargetActionComponent extends ActionComponent{
    AOEEnd = false

    spawnedAOE = false

    actionAOE

    constructor(){
        super()
    }

    start(){
        Events.registerListener("AOE End", this)

        // @ts-ignore
        let spellRangeGameObject = instantiate(new SpellRangeGameObject(this.constructor.range), new Vector2(0, 0))
        spellRangeGameObject.transform.setParent(this.transform)
    }

    update(){
        if (this.isExecutionComplete()){
            this.endExecution()
        }
    }

    isExecutionComplete(){
        return this.AOEEnd
    }

    endExecution(){
        super.endExecution()
    }

    onDestroy(){
        GameObject.find("Spell Range Game Object")?.destroy()
    }

    canCancel(){
        return !this.spawnedAOE
    }

    handleEvent(message, args){
        this.AOEEnd = true
    }
}
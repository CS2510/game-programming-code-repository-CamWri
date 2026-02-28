class ClickTargetActionComponent extends ActionComponent{
    AOEEnd = false

    spawnedAOE = false

    actionAOE

    constructor(){
        super()
    }

    start(){
        // @ts-ignore
        instantiate(new SpellRangeGameObject(this.constructor.range), this.gameObject.transform.position.clone())
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
        GameObject.find("Spell Range Game Object").destroy()
    }

    canCancel(){
        return !this.spawnedAOE
    }
}
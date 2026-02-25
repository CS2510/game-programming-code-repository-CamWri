class TargetAOEActionComponent extends TargetActionComponent{
    AOEEnd = false

    constructor(){
        super()
    }

    start(){
        super.start()
    }

    update(){
        super.update()
    }

    isExecutionComplete(){
        return this.AOEEnd
    }
}
class ActionComponent extends Component{
    static requiredStats = []
    static maxCooldown = 1

    characterStats = {}

    constructor(){
        super()
    }

    start(){
        
    }

    endExecution(){
        this.gameObject.getComponent(CharacterComponent).activeAbility = null
        this.gameObject.getComponent(CharacterComponent).canPassTurn = true
        
        this.destroy()
    }

    canCancel(){
        return false
    }
}
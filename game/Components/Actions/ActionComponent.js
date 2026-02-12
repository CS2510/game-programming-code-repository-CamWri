class ActionComponent extends Component{
    static requiredStats = []
    static maxCooldown = 1

    characterStats = {}

    constructor(){
        super()
    }

    start(){
        
    }

    startExecution(){
        
    }

    pauseExecution(){
        
    }

    endExecution(ActionComponent){
        this.gameObject.getComponent(CharacterComponent).activeAbility = null
        this.gameObject.components = this.gameObject.components.filter(a => !(a instanceof ActionComponent))
    }
}
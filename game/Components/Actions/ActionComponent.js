class ActionComponent extends Component{
    static requiredStats = []
    static maxCooldown = 1

    characterStats = {}

    constructor(){
        super()
    }

    start(){
        
    }

    getUpdatedStats(){
        /*
        return the Action Stats that are needed after being updated. 
        Thing of it like if you have an item that increases range, you would return the static range + the items range extensions
        */
    }

    endExecution(){
        this.gameObject.getComponent(CharacterComponent).activeAbility = null
        this.gameObject.getComponent(CharacterComponent).canPassTurn = true
        
        this.destroy()
    }

    canCancel(){
        return false
    }

    static setStrokeStyle(character, isCurrentTurn, isSelected, isTargetable) {
        let color = "#000000"
        
        if (isCurrentTurn) color = "purple"
        if (isSelected) color = "blue"
        if (isTargetable) color = "yellow"

        character.getComponent(Polygon).strokeStyle = color
    }
}
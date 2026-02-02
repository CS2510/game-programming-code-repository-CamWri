class ActionAbilityComponent extends Component{
    constructor(){
        super()
    }

    start(){
        
    }

    startExecution(){
        
    }

    endExecution(){
        this.turnBaseGameMangerGameObject = Engine.currentScene.gameObjects.find(a => a instanceof TurnBasedManagerGameObject)
        this.turnBaseGameMangerComponent = this.turnBaseGameMangerGameObject.components.find(a => a instanceof TurnBaseManagerComponent)
        console.log(this.turnBaseGameMangerComponent.hasMovement)
        this.turnBaseGameMangerComponent.endTurn()
    }
}
class TurnManagerComponent extends Component{
    constructor(characterGameObjects, enemyGameObjects , turnIndicatior){
        super()

        this.turnIndicatior = turnIndicatior

        this.currentIndex = 0
        this.turnOrder = [...characterGameObjects, ...enemyGameObjects].sort((a, b) => b.speed - a.speed)
        this.currentCharacter = this.turnOrder[0]
    }

    start(){
        Events.registerListener("End Turn", this)
    }

    update(){
        this.turnIndicatior.transform.position = this.currentCharacter.transform.position.minus(new Vector2(0, 50))

        if(!(this.currentCharacter instanceof EnemyCharacterGameObject)){
            this.waitForPlayerAction()
        } else {
            this.enemyTurn()
        }
    }

    nextTurn(){
        this.currentIndex++
        this.currentCharacter = this.turnOrder[this.currentIndex % this.turnOrder.length]
    }

    waitForPlayerAction(){
        this.currentCharacterComponent = this.currentCharacter.getComponent(CharacterComponent)
        
        this.currentCharacterComponent.hasPriority = true
    }

    enemyTurn(){
        if(Input.keysDownThisFrame.includes("KeyR")){
            this.nextTurn()
        }
    }

    handleEvent(message, args){
        this.nextTurn()
    }
}
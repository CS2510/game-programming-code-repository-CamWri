class TurnManagerComponent extends Component{
    constructor(characterGameObjects, enemyGameObjects , turnIndicatior){
        super()

        this.turnIndicatior = turnIndicatior

        this.currentIndex = 0
        this.turnOrder = [...characterGameObjects, ...enemyGameObjects].sort((a, b) => b.getComponent(CharacterComponent).stats["Speed"] - a.getComponent(CharacterComponent).stats["Speed"])
        this.currentCharacter = this.turnOrder[0]
    }

    start(){
        //Turn Order Logic at the top of the screen (Think like initiative order)
        /*const spacing = 80
        const y = 50

        console.log(Engine.canvas.width)

        for(let i = 0; i < this.turnOrder.length; i++){
            const character = this.turnOrder[i]
            const initalXPosition = 350 + i * spacing

            instantiate(new TurnOrderIndexGameObject(character), new Vector2(initalXPosition, 50))
        }*/

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
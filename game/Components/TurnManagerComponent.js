class TurnManagerComponent extends Component{
    constructor(characterGameObjects, enemyGameObjects , turnIndicatiorUI, turnIndicatiorPlayer){
        super()

        this.turnIndicatiorUI = turnIndicatiorUI
        this.turnIndicatiorPlayer = turnIndicatiorPlayer

        this.currentIndex = 0
        this.turnOrder = [...characterGameObjects, ...enemyGameObjects].sort((a, b) => b.getComponent(CharacterComponent).stats["Speed"] - a.getComponent(CharacterComponent).stats["Speed"])
        this.turnOrderUI = []

        this.currentCharacter = this.turnOrder[0]
    }

    start() {
        const spacing = 90
        const y = 70
        const count = this.turnOrder.length

        // total width of the row
        const totalWidth = (count - 1) * spacing

        // starting X so the whole row is centered
        const startX = Engine.canvas.width / 2 - totalWidth / 2

        for (let i = 0; i < count; i++) {
            const character = this.turnOrder[i]
            const x = startX + i * spacing
            const characterTurnIndicator = instantiate(new TurnOrderIndexGameObject(character), new Vector2(x, y))
            this.turnOrderUI.push(characterTurnIndicator)
        }

        Events.registerListener("End Turn", this)
        
        this.turnIndicatiorUI.transform.position = this.turnOrderUI[this.currentIndex % this.turnOrder.length].transform.position.minus(new Vector2(0, 65))
    }

    update(){
        this.turnIndicatiorPlayer.transform.position = this.turnOrder[this.currentIndex % this.turnOrder.length].transform.position.minus(new Vector2(0, 50))


        if(!(this.currentCharacter instanceof EnemyCharacterGameObject)){
            this.waitForPlayerAction()
        } else {
            this.enemyTurn()
        }
    }

    nextTurn(){
        this.currentIndex++
        this.currentCharacter = this.turnOrder[this.currentIndex % this.turnOrder.length]
        this.turnIndicatiorUI.transform.position = this.turnOrderUI[this.currentIndex % this.turnOrder.length].transform.position.minus(new Vector2(0, 65))
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
class TurnManagerComponent extends Component{
    constructor(characterGameObjects, enemyGameObjects , turnIndicatiorUI, turnIndicatiorPlayer){
        super()

        this.characterGameObjects = characterGameObjects
        this.enemyGameObjects = enemyGameObjects

        this.turnIndicatiorUI = turnIndicatiorUI
        this.turnIndicatiorPlayer = turnIndicatiorPlayer

        this.currentIndex = 0
        this.turnOrder = []
        this.turnOrderUI = []

        this.currentCharacter = null
    }

    start() {
        this.startRound() // Initialize first round

        Events.registerListener("End Turn", this)
    }

    startRound(){
        const spacing = 90
        const y = 70
        const count = this.characterGameObjects.length + this.enemyGameObjects.length
        const totalWidth = (count - 1) * spacing
        const startX = Engine.canvas.width / 2 - totalWidth / 2

        // Build or update initiative list
        if(!this.initiativeList){
            this.initiativeList = []
            for(let i = 0; i < this.characterGameObjects.length; i++){
                const character = this.characterGameObjects[i]
                const x = startX + i * spacing
                const ui = instantiate(new TurnOrderIndexGameObject(character), new Vector2(x, y))
                this.initiativeList.push({
                    character,
                    ui,
                    initiative: character.getComponent(CharacterComponent).getStat("Speed")
                })
            }
            for(let i = 0; i < this.enemyGameObjects.length; i++){
                const character = this.enemyGameObjects[i]
                const x = startX + (this.characterGameObjects.length + i) * spacing
                const ui = instantiate(new TurnOrderIndexGameObject(character), new Vector2(x, y))
                this.initiativeList.push({
                    character,
                    ui,
                    initiative: character.getComponent(CharacterComponent).getStat("Speed")
                })
            }
        } else {
            // Update initiative values only
            for(const entry of this.initiativeList){
                entry.initiative = entry.character.getComponent(CharacterComponent).getStat("Speed")
            }
        }

        console.log(this.initiativeList)

        // Sort by initiative descending
        this.initiativeList.sort((a, b) => b.initiative - a.initiative)

        // Update UI positions based on sorted list
        for(let i = 0; i < this.initiativeList.length; i++){
            const x = startX + i * spacing
            this.initiativeList[i].ui.transform.position = new Vector2(x, y)
        }

        // Reset current turn
        this.currentIndex = 0
        this.currentCharacter = this.initiativeList[0].character
        this.turnIndicatiorUI.transform.position = this.initiativeList[0].ui.transform.position.minus(new Vector2(0, 65))
    }

    update(){
        const entry = this.initiativeList[this.currentIndex]
        this.turnIndicatiorPlayer.transform.position = entry.character.transform.position.minus(new Vector2(0, 50))

        if(!(this.currentCharacter instanceof EnemyCharacterGameObject)){
            this.waitForPlayerAction()
        } else {
            this.enemyTurn()
        }
    }

    nextTurn(){
        this.currentIndex++

        if(this.currentIndex >= this.initiativeList.length){
            this.startRound()
        } else {
            const entry = this.initiativeList[this.currentIndex]
            this.currentCharacter = entry.character
            this.turnIndicatiorUI.transform.position = entry.ui.transform.position.minus(new Vector2(0, 65))
        }
    }

    waitForPlayerAction(){
        const currentCharacterComponent = this.currentCharacter.getComponent(CharacterComponent)
        currentCharacterComponent.hasPriority = true
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
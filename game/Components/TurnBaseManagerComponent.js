class TurnBaseManagerComponent extends Component{
    constructor(characterGameObjects, enemyGameObjects , selectorGameObject){
        super()
        this.playableCharacters = characterGameObjects
        this.enemeyCharacters = enemyGameObjects
        this.currentIndex = 0

        this.spacePressedLastFrame = false

        this.selectorGameObject = selectorGameObject

        this.turnOrder = [...characterGameObjects, ...enemyGameObjects].sort((a, b) => b.speed - a.speed)

        this.currentCharacter = this.turnOrder[0]

        this.actionsRemaining = 1

        this.hasMovement = true
    }

    start(){
        this.currentMoveAction = this.currentCharacter.components.find(a => a instanceof MoveActionComponent)

        this.selectorGameObject.transform.position = new Vector2(this.currentCharacter.transform.position.x - 25, this.currentCharacter.transform.position.y - 25)
    }

    update(){
        //Update position of the selector game object
        this.selectorGameObject.transform.position = new Vector2(this.currentCharacter.transform.position.x - 25, this.currentCharacter.transform.position.y - 25)

        //See if the current person is an enemy or a player character
        let isEnemy = this.currentCharacter instanceof EnemyCharacterGameObject

        if(!isEnemy){
            this.waitForPlayerAction()
        } else {
            this.enemyTurn()
        }

        //Temporarily remove enemy logic so I can skip enemies turns
        if(Input.keysDown.includes("KeyE")){// && !isEnemy){
            this.endTurn()
        }
    }

    endTurn(){
        this.nextTurn()
    }

    nextTurn(){
        if (this.currentMoveAction) {
            this.currentMoveAction.distanceTraveled = 0
        }

        this.currentIndex++
        this.currentCharacter = this.turnOrder[this.currentIndex % this.turnOrder.length]

        this.currentMoveAction = this.currentCharacter.components.find(a => a instanceof MoveActionComponent)

        this.hasMovement = true
    }

    waitForPlayerAction(){
        if(Input.keysDown.includes("KeyM") && this.hasMovement && !this.currentMoveAction.inUse && this.currentMoveAction){
            this.currentMoveAction.startExecution(1000)
        }
    }

    enemyTurn(){
        
    }
}
class TurnManagerComponent extends Component{
    constructor(characterGameObjects, enemyGameObjects , turnIndicatior){
        super()

        //Will be able to remove when doing GameObject Heirarchies 
        this.turnIndicatior = turnIndicatior

        //REQUIRED
        this.currentIndex = 0
        this.turnOrder = [...characterGameObjects, ...enemyGameObjects].sort((a, b) => b.speed - a.speed)
        this.currentCharacter = this.turnOrder[0]
    }

    start(){
        //Will be able to remove when doing GameObject Heirarchies 
        this.turnIndicatior.transform.position = new Vector2(this.currentCharacter.transform.position.x, this.currentCharacter.transform.position.y - 50)
    }

    update(){
        //Will be able to remove when doing GameObject Heirarchies 
        this.turnIndicatior.transform.position = new Vector2(this.currentCharacter.transform.position.x, this.currentCharacter.transform.position.y - 50)

        //See if the current person is an enemy or a player character
        let isEnemy = this.currentCharacter instanceof EnemyCharacterGameObject

        if(!isEnemy){
            this.waitForPlayerAction()
        } else {
            this.enemyTurn()
        }
    }

    endTurn(){
        this.currentCharacterComponent.hasPriority = false
        this.nextTurn()
    }

    nextTurn(){
        this.currentIndex++
        this.currentCharacter = this.turnOrder[this.currentIndex % this.turnOrder.length]
    }

    waitForPlayerAction(){
        this.currentCharacterComponent = this.currentCharacter.components.find(a => a instanceof CharacterComponent)
        
        this.currentCharacterComponent.hasPriority = true

        //Once you update priority, update text to signitfy the change, in that compoenetnt with it, inside of update, listen for input
            //If input happened, then see fi I can use that compoenent. If it returns true, then call excecute
            // if false, signify why
    }

    enemyTurn(){
        if(Input.keysDownThisFrame.includes("KeyR")){
            this.nextTurn()
        }
    }
}
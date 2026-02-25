class CharacterComponent extends Component{
    hasPriority = false
    
    // Stats keyword: value
    stats = {"Speed": 100, "MaxMovement": 350, "MovementLeft": 350}

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null
    canPassTurn = true

    canceledThisFrame = false

    constructor(){
        super()
    }

    start(){
        for (const key in this.abilities) {
            this.abilitiyCooldowns.set(this.abilities[key], 0)
        }
    }

    update(){  
        this.canceledThisFrame = false

        if(this.hasPriority){
            if (Input.keysDownThisFrame.includes(this.key) && this.activeAbility?.canCancel()) {
                this.activeAbility.endExecution()
                this.abilitiyCooldowns.set(this.ActionClass, 0)
                this.canceledThisFrame = true
            }
            
            for (const key in this.abilities) {
                // @ts-ignore
                if (Input.keysDownThisFrame.includes(key) && !this.activeAbility) {
                    this.ActionClass = this.abilities[key]

                    if(this.abilitiyCooldowns.get(this.ActionClass) == 0 && !this.canceledThisFrame){
                        let action = new this.ActionClass()

                        this.key = key

                        // Pull only what the action wants
                        let neededStats = {}
                        for (const stat of this.ActionClass.requiredStats) {
                            neededStats[stat] = this.stats[stat]
                        }

                        this.activeAbility = action
                        this.abilitiyCooldowns.set(this.ActionClass, this.ActionClass.maxCooldown)

                        this.gameObject.addComponent(action, {characterStats: neededStats, player: this.gameObject})
                        this.canPassTurn = false
                        this.canceledThisFrame = false
                    }
                }
            }

            if(Input.keysDownThisFrame.includes("KeyE") && this.canPassTurn){
                if(this.activeAbility){
                    this.activeAbility.endExecution()
                }
                this.endTurn()
            }
        }
    }

    endTurn(){
        this.abilitiyCooldowns.forEach((value, key, map) => {
            map.set(key, Math.max(0, value - 1));
        });

        this.stats["MovementLeft"] = this.stats["MaxMovement"]

        Engine.currentScene.gameObjects.find(a => a instanceof TurnManagerGameObject).components.find(b => b instanceof TurnManagerComponent).endTurn()
    }
}
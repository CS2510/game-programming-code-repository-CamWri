class CharacterComponent extends Component{
    hasPriority = false
    
    // Stats keyword: value
    stats = {"Speed": 100, "MaxMovement": 350}

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null
    canPassTurn = true

    constructor(){
        super()
    }

    start(){
        for (const key in this.abilities) {
            this.abilitiyCooldowns.set(this.abilities[key], 0)
        }
    }

    update(){  
        if(this.hasPriority){
            for (const key in this.abilities) {
                // @ts-ignore
                if (Input.keysDown.includes(key) && !this.activeAbility) {
                    this.ActionClass = this.abilities[key]

                    let action = new this.ActionClass()

                    if(this.abilitiyCooldowns.get(this.ActionClass) == 0){
                        // Pull only what the action wants
                        let neededStats = {}
                        for (const stat of this.ActionClass.requiredStats) {
                            neededStats[stat] = this.stats[stat]
                        }

                        this.activeAbility = action
                        this.abilitiyCooldowns.set(this.ActionClass, this.ActionClass.maxCooldown)

                        this.gameObject.addComponent(action, {characterStats: neededStats, player: this.gameObject})
                        this.canPassTurn = false
                    }
                }
            }


            if(Input.keysDown.includes("KeyE") && this.canPassTurn){
                if(this.activeAbility){
                    this.activeAbility.endExecution(this.ActionClass)
                }
                this.endTurn()
            }
        }
    }

    endTurn(){
        this.abilitiyCooldowns.forEach((value, key, map) => {
            map.set(key, Math.max(0, value - 1));
        });


        this.gameObject.components = this.gameObject.components.filter(b => !(b instanceof ActionComponent))
        Engine.currentScene.gameObjects.find(a => a instanceof TurnManagerGameObject).components.find(b => b instanceof TurnManagerComponent).endTurn()
    }
}
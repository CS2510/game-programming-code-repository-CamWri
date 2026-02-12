class CharacterComponent extends Component{
    hasPriority = false
    
    // Stats keyword: value
    stats = {"Speed": 100, "MaxMovement": 350}

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null

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
                    let ActionClass = this.abilities[key]

                    let action = new ActionClass()

                    if(this.abilitiyCooldowns.get(ActionClass) == 0){
                        // Pull only what the action wants
                        let neededStats = {}
                        for (const stat of ActionClass.requiredStats) {
                            neededStats[stat] = this.stats[stat]
                        }

                        this.activeAbility = action
                        this.abilitiyCooldowns.set(ActionClass, ActionClass.maxCooldown)

                        this.gameObject.addComponent(action, {characterStats: neededStats, player: this.gameObject})
                    }
                }
            }


            if(Input.keysDown.includes("KeyE")){
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


        this.gameObject.components = this.gameObject.components.filter(b => !(b instanceof ActionComponent))
        Engine.currentScene.gameObjects.find(a => a instanceof TurnManagerGameObject).components.find(b => b instanceof TurnManagerComponent).endTurn()
    }
}
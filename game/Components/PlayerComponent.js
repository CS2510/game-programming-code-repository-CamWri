class PlayerComponent extends CharacterComponent{
    canceledThisFrame = false
    
    constructor(){
        super()
    }

    start(){
        super.start()
    }

    update(){
        this.canceledThisFrame = false

        if(this.hasPriority){
            //console.log("Priority:", this.statusEffects)

            if(this.canStartTurn){
                console.log("Start Turn")
                this.startTurn()
            }
        
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
                            neededStats[stat] = this.getStat(stat)
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

                Events.handleEvent("End Turn", [this.gameObject])

                this.endTurn()
            }
        }
    }

    onTriggerEnter(other, mtv){
        if(other instanceof SpellRangeGameObject){
            Events.handleEvent("Player Can Be Targeted", [this.gameObject])
        }
    }
}
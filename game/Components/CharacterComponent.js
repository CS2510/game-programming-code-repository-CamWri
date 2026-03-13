class CharacterComponent extends Component{
    hasPriority = false
    
    // Stats keyword: value
    stats = {"Speed": 100, "MaxMovement": 800, "RemainingMovement": 800, "MaxHealth": 16, "CurrentHealth": 16}

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null
    canPassTurn = true

    outlineColor = "magenta"

    constructor(){
        super()
    }

    start(){
        Events.registerListener("End Turn", this)
        Events.registerListener("Update Stats", this)
        for (const key in this.abilities) {
            this.abilitiyCooldowns.set(this.abilities[key], 0)
        }
    }

    applyDamage(damageAmount){
        this.stats["CurrentHealth"] = Math.max(0, this.stats["CurrentHealth"] - damageAmount)
    }

    handleEvent(message, args){
            if(this.gameObject == args[0]){
            if(message == "End Turn"){
                console.log("End Turn Is Called")
                this.abilitiyCooldowns.forEach((value, key, map) => {
                    map.set(key, Math.max(0, value - 1));
                });

                this.hasPriority = false

                this.stats["RemainingMovement"] = this.stats["MaxMovement"]
            }

            if(message == "Update Stats"){
                const statToUpdate = args[1]
                const amount = args[2]

                this.stats[statToUpdate] += amount
            }
        }
    }

    onMouseOver(){
        let playerCharacter = GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue(`${playerCharacter.transform.position.minus(this.transform.position).magnitude.toFixed(2)}`)
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue(`${this.stats["CurrentHealth"]}/${this.stats["MaxHealth"]}`)
    }

    onMouseExit(){
        GameObject.find("Range Text Game Object").getComponent(StartText).setValue("")
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue("")
    }
}
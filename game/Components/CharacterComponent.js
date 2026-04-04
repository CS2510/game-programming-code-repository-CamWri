class CharacterComponent extends Component{
    hasPriority = false
    
    canStartTurn = true

    // What your character is
    baseStats = {"Speed": 100, "MaxMovement": 800, "MaxHealth": 16, }

    //What your character currently has
    derivedStats = {}

    statusEffects = []

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null
    canPassTurn = true

    outlineColor = "magenta"

    constructor(){
        super()
    }

    start(){
        this.derivedStats["CurrentHealth"] = this.getStat("MaxHealth")
        this.derivedStats["RemainingMovement"] = this.getStat("MaxMovement")

        for (const key in this.abilities) {
            this.abilitiyCooldowns.set(this.abilities[key], 0)
        }
    }

    applyDamage(damageAmount){
        this.updateDerivedStat("CurrentHealth", Math.max(0,this.derivedStats["CurrentHealth"] - damageAmount))
    }

   startTurn(){
        for(const effect of this.statusEffects){
            effect.onTurnStart(this)
        }
        this.canStartTurn = false
   }

    endTurn() {
        // Reduce cooldowns
        this.abilitiyCooldowns.forEach((value, key, map) => {
            map.set(key, Math.max(0, value - 1));
        });

        // Process status effects
        for (const effect of this.statusEffects) {
            effect.onTurnEnd(this)
            effect.duration--
        }

        this.statusEffects = this.statusEffects.filter(e => e.duration > 0)

        this.hasPriority = false

        // Reset movement using computed stat
        this.derivedStats["RemainingMovement"] = this.getStat("MaxMovement")
    }

    //Permanent Updates
    modifyBaseStat(stat, amount){
        this.baseStats[stat] += amount
    }

    getStat(statName) {
        let value = this.baseStats[statName]

        for(const effect of this.statusEffects){
            value = effect.modifyStat(statName, value)
        }

        return value
    }

    updateDerivedStat(statName, value){
        if(this.derivedStats.hasOwnProperty(statName)){
            this.derivedStats[statName] = value
        }
    }

    onMouseOver(){
        let playerCharacter = GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue(`${playerCharacter.transform.position.minus(this.transform.position).magnitude.toFixed(2)}`)
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue(`${this.derivedStats["CurrentHealth"]}/${this.getStat("MaxHealth")}`)
    }

    onMouseExit(){
        GameObject.find("Range Text Game Object").getComponent(StartText).setValue("")
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue("")
    }
}
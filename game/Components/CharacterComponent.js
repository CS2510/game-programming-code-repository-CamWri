class CharacterComponent extends Component {
    hasPriority = false

    canStartTurn = true

    // What your character is (core stats before modifiers and any actions taken or recieved)
    baseStats = { "Speed": 100, "MaxMovement": 800, "MaxHealth": 16, }

    //What your character currently has
    derivedStats = {}

    statusEffects = []

    abilities

    abilitiyCooldowns = new Map()

    activeAbility = null
    canPassTurn = true

    outlineColor = "magenta"

    constructor() {
        super()
    }

    start() {
        this.derivedStats["CurrentHealth"] = this.getStat("MaxHealth")
        this.derivedStats["MaxHealth"] = this.getStat("MaxHealth")
        this.derivedStats["RemainingMovement"] = this.getStat("MaxMovement")

        for (const key in this.abilities) {
            this.abilitiyCooldowns.set(this.abilities[key], 0)
        }
    }

    applyDamage(damageAmount) {
        this.updateDerivedStat("CurrentHealth", Math.max(0, this.getDerivedStat("CurrentHealth") - damageAmount))
    }

    applyHeal(healingAmount) {
        this.updateDerivedStat("CurrentHealth", Math.min(this.getDerivedStat("MaxHealth"), this.getDerivedStat("CurrentHealth") + healingAmount))
    }

    startTurn() {
        for (const effect of this.statusEffects) {
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
    modifyBaseStat(stat, amount) {
        this.baseStats[stat] += amount
    }

    getStat(statName) {
        let value = this.baseStats[statName]

        for (const effect of this.statusEffects) {
            value = effect.modifyStat(statName, value)
        }

        return value
    }

    updateDerivedStat(statName, value) {
        if (this.derivedStats.hasOwnProperty(statName)) {
            this.derivedStats[statName] = value
        }
    }

    getDerivedStat(statName) {
        if (this.derivedStats.hasOwnProperty(statName)) {
            return this.derivedStats[statName]
        }
    }

    onMouseEnter() {
        console.log("On Mouse Enter")
        Globals.CharacterToolTipLayer = "default"
        SceneManager.loadScene(ToolTipCharacterScene, true)

        console.log(GameObject.find("Parent Tool Tip").transform.position)

        GameObject.find("Parent Tool Tip")?.getComponent(ManageCharacterUIToolTipComponent).updateToolTipPosition(this.transform.position.add(new Vector2(-100, 100)))
        GameObject.find("Parent Tool Tip")?.getComponent(ManageCharacterUIToolTipComponent).updateDisplayedStats(this.gameObject)

    }

    onMouseExit() {
        for (let gameObject of SceneManager.getActiveScene().gameObjects) {
            if (gameObject.scene.constructor.name == "ToolTipCharacterScene") {
                gameObject.destroy()
            }
        }
    }
}
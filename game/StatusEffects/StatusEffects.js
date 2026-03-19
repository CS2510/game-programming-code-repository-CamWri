class StatusEffect {
    constructor(duration, name) {
        this.duration = duration
        this.name = name
    }

    onTurnStart(character) {}
    onTurnEnd(character) {}

    modifyStat(statName, value) {
        return value
    }
}
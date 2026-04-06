class BurnEffect extends StatusEffect {
    constructor(duration, damage) {
        super(duration, "Burn")
        this.damage = damage
    }

    onTurnEnd(character) {
        character.applyDamage(this.damage)
    }
}
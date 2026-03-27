class BurnEffect extends StatusEffect {
    constructor(duration, damage) {
        super(duration)
        this.damage = damage
    }

    onTurnEnd(character) {
        character.applyDamage(this.damage)
    }
}
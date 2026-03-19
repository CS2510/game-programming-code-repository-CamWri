class BurnEffect extends StatusEffect {
    constructor(duration, damage) {
        super(duration)
        this.damage = damage
    }

    onTurnStart(character) {
        character.applyDamage(this.damage)
    }
}
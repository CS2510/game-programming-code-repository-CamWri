class SpeedBuff extends StatusEffect {
    constructor(duration, percent) {
        super(duration, "Speed Percentage Buff")
        this.percent = percent
    }

    modifyStat(statName, value) {
        if(statName === "Speed") {
            return value + value * this.percent
        }
        return value
    }
}
class SpeedDebuff extends StatusEffect {
    constructor(duration, percent) {
        super(duration)
        this.percent = percent
    }

    modifyStat(statName, value) {
        if(statName === "Speed") {
            return value * (1 - this.percent)
        }
        return value
    }
}
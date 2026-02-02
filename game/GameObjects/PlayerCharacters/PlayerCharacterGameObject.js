class PlayerCharacterGameObject extends GameObject {
    constructor(customStats = {}) {
        super()

        // Attach stats component with defaults overridden by customStats
        this.addComponent(new StatsComponent(customStats))
    }
}
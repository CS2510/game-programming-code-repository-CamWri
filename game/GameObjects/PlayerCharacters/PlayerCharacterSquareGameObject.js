class PlayerCharacterSquareGameObject extends PlayerCharacterGameObject{
    constructor(){
        super("Player Character Square Game Object")

        this.addComponent(new Polygon, {points: [new Vector2(-20, -20), new Vector2(-20, 20), new Vector2(20, 20), new Vector2(20, -20)], strokeStyle: "green", lineWidth: 5})
        this.addComponent(new PlayerComponent(), {
            abilities: {"Space": MoveActionComponent, "Digit1": SlashActionComponent, "Digit2": FireballActionComponent, "Digit3": PummelActionComponent, "Digit4": WhirlwindActionComponent, "Digit5": HealSelfActionComponent, "Digit6": MassHealActionComponent}, 
            stats: {"Speed": 200, "MaxMovement": 350, "RemainingMovement": 350, "MaxHealth": 20, "CurrentHealth": 20}
        })
    }
}
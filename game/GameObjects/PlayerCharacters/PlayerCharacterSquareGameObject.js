class PlayerCharacterSquareGameObject extends PlayerCharacterGameObject{
    constructor(){
        super("Player Character Square Game Object")

        this.addComponent(new Polygon, {points: [new Vector2(-20, -20), new Vector2(-20, 20), new Vector2(20, 20), new Vector2(20, -20)], strokeStyle: "green", lineWidth: 5})
        this.addComponent(new PlayerComponent(), {abilities: {"Space": MoveActionComponent, "Digit1": SlashActionComponent, "Digit2": FireballActionComponent, "Digit3": PummelActionComponent}})
    }
}
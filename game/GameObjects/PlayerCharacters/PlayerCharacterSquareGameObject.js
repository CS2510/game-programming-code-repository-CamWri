class PlayerCharacterSquareGameObject extends PlayerCharacterGameObject{
    constructor(){
        super("Player Character Square Game Object")

        this.addComponent(new Polygon, {points: [new Vector2(-25, -25), new Vector2(-25, 25), new Vector2(25, 25), new Vector2(25, -25)], strokeStyle: "green", lineWidth: 10})
        this.addComponent(new CharacterComponent(), {abilities: {"Space": MoveActionComponent, "Digit1": SlashActionComponent, "Digit2": FireballActionComponent}})
    }
}
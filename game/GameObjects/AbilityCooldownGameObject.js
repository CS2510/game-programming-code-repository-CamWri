class ActionCooldownGameObject extends GameObject{
    constructor(action){
        super("Ability Cooldown Game Object")

        this.addComponent(new Polygon(), {points: [new Vector2(50, 50), new Vector2(-50, 50), new Vector2(-50, -50), new Vector2(50, -50)]})
        this.addComponent(new AbilityUIComponent(), {action: action} )
    }
}
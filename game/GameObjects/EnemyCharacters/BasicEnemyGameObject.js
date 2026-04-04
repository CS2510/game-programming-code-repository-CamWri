class BasicEnemyGameObject extends EnemyCharacterGameObject{
    constructor(name = "Basic Enemy Game Object"){
        super(name)
        
        this.addComponent(new Polygon, {points: 
            [new Vector2(-20, -20), new Vector2(-20, 20), new Vector2(20, 20), new Vector2(20, -20)], 
            fillStyle: "red", strokeStyle: "black", 
            lineWidth: 3}
        )
        
        this.addComponent(new EnemyComponent(), {
            baseStats: {"Speed": 175, "MaxMovement": 150, "RemainingMovement": 150, "MaxHealth": 12, "CurrentHealth": 12}
        })
    }
}
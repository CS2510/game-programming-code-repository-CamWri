class BasicEnemyGameObject extends EnemyCharacterGameObject{
    constructor(name = "Basic Enemy Game Object"){
        super(name)
        
        this.addComponent(new Polygon, {points: [new Vector2(-20, -20), new Vector2(-20, 20), new Vector2(20, 20), new Vector2(20, -20)], strokeStyle: "red", lineWidth: 5})
        this.addComponent(new EnemyComponent())
        this.addComponent(new Collider())
    }
}
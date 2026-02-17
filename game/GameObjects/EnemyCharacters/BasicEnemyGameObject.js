class BasicEnemyGameObject extends EnemyCharacterGameObject{
    constructor(name = "Basic Enemy Game Object"){
        super()
        
        this.addComponent(new Polygon, {points: [new Vector2(-25, -25), new Vector2(-25, 25), new Vector2(25, 25), new Vector2(25, -25)], strokeStyle: "red", lineWidth: 10})
    }
}
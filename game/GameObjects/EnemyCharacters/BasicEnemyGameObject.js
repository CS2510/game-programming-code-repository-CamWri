class BasicEnemyGameObject extends EnemyCharacterGameObject{
    constructor(customStats = {}){
        //To Do: Adjust Stats
        const defaultStats = {
            hp: 10,
            maxHp: 10,
            speed: 5,
        }

        /*
        Always updates stats the be the latest one, so if defaultStats has HP and customStats has HP, then it would take
            the customStats one
        */
        super({ ...defaultStats, ...customStats })
        
        this.addComponent(new Polygon, {points: [new Vector2(0, 0), new Vector2(0, 50), new Vector2(-50, 50), new Vector2(-50, 0)], strokeStyle: "red", lineWidth: 10})
    }
}
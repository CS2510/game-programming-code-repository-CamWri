class BattleScene extends Scene{
    constructor(){
        super()
        let playerSquare = this.instantiate(new PlayerCharacterSquareGameObject(), new Vector2(400, 400))

        let enemy1 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 100))
        let enemy2 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 250))
        let enemy3 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 400))
        let enemy4 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 550))
        let enemy5 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 700))

        let turnIndicatior = this.instantiate(new TurnIndicatorGameObject(), new Vector2(0, 0))

        this.instantiate(new TurnManagerGameObject([playerSquare], [enemy1, enemy2, enemy3, enemy4, enemy5], turnIndicatior), new Vector2(0, 0))

        let enemyRangeText = this.instantiate(new GameObject("Range Text Game Object"), new Vector2(10, 25))
        enemyRangeText.addComponent(new TextLabel())
        enemyRangeText.addComponent(new StartText(), {label: "Range"})

        let enemyHealthText = this.instantiate(new GameObject("Health Text Game Object"),new Vector2(10, 50))
        enemyHealthText.addComponent(new TextLabel())
        enemyHealthText.addComponent(new StartText(), {label: "Enemy Health"})
    }
}
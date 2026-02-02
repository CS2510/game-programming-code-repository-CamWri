class MainScene extends Scene{
    constructor(){
        super()
        let playerSquare = this.instantiate(new PlayerCharacterSquareGameObject(), new Vector2(400, 400))

        let enemy1 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1200, 100))
        let enemy2 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1200, 400))
        let enemy3 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1200, 700))

        let playerSelectionGameObejct = this.instantiate(new SelectionIndicatorGameObject(), new Vector2(0, 0))

        this.instantiate(new TurnBasedManagerGameObject([playerSquare], [enemy1, enemy2, enemy3], playerSelectionGameObejct), new Vector2(0, 0))
    }
}
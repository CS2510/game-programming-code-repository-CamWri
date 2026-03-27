class BattleScene extends Scene{
    constructor(){
        super()
        //Players
        let playerSquare = this.instantiate(new PlayerCharacterSquareGameObject([]), new Vector2(400, 350))
        let playerSquare2 = this.instantiate(new PlayerCharacterSquareGameObject([]), new Vector2(400, 550))

        //Enemies
        let enemy1 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 300))
        let enemy2 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 400))
        let enemy3 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 500))
        let enemy4 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 600))

        //Turn Logic Indicators, UI, and Manager
        let turnIndicatiorUI = this.instantiate(new TurnIndicatorGameObject(), new Vector2(0, 0))
        let turnIndicatiorCharacter = this.instantiate(new TurnIndicatorGameObject(), new Vector2(0, 0))
        this.instantiate(new TurnManagerGameObject([playerSquare, playerSquare2], [enemy1, enemy2, enemy3, enemy4], turnIndicatiorUI, turnIndicatiorCharacter), new Vector2(0, 0))

        let enemyRangeText = this.instantiate(new GameObject("Range Text Game Object"), new Vector2(10, 25))
        enemyRangeText.addComponent(new TextLabel())
        enemyRangeText.addComponent(new StartText(), {label: "Range"})

        let enemyHealthText = this.instantiate(new GameObject("Health Text Game Object"),new Vector2(10, 50))
        enemyHealthText.addComponent(new TextLabel())
        enemyHealthText.addComponent(new StartText(), {label: "Enemy Health"})

        //this.instantiate(new ParticleSystemExampleGameObject(), new Vector2(500, 500))

        this.instantiate(new HorizontalWallGameObject(), new Vector2(800, 130))
        this.instantiate(new HorizontalWallGameObject(), new Vector2(800, 700))
    }
}
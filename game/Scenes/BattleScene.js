class BattleScene extends Scene{
    constructor(){
        super()
        let playerSquare = this.instantiate(new PlayerCharacterSquareGameObject(), new Vector2(400, 300))

        let enemy1 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 100))
        let enemy2 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 250))
        let enemy3 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 400))
        let enemy4 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 550))
        let enemy5 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1000, 700))

        let turnIndicatior = this.instantiate(new TurnIndicatorGameObject(), new Vector2(0, 0))

        this.instantiate(new TurnManagerGameObject([playerSquare], [enemy1, enemy2, enemy3, enemy4, enemy5], turnIndicatior), new Vector2(0, 0))

        //let tittleTextGameObject = this.instantiate(new GameObject(), new Vector2(675, 100))
        //tittleTextGameObject.addComponent(new TextLabel(), {text: "Hello World"})

        //Eventually, create an action display game object that shows the input needed to activate it, the cooldown,
            //and what the ability is
    }
}
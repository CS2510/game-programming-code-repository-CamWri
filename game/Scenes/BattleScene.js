class BattleScene extends Scene{
    constructor(){
        super()
        let playerSquare = this.instantiate(new PlayerCharacterSquareGameObject(), new Vector2(400, 400))


        let enemy1 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1200, 100))
        let enemy2 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1200, 400))
        let enemy3 = this.instantiate(new BasicEnemyGameObject(), new Vector2(1200, 700))

        let turnIndicatior = this.instantiate(new TurnIndicatorGameObject(), new Vector2(0, 0))

        this.instantiate(new TurnManagerGameObject([playerSquare], [enemy1, enemy2, enemy3], turnIndicatior), new Vector2(0, 0))

        //let tittleTextGameObject = this.instantiate(new GameObject(), new Vector2(675, 100))
        //tittleTextGameObject.addComponent(new TextLabel(), {text: "Hello World"})

        //Eventually, create an action display game object that shows the input needed to activate it, the cooldown,
            //and what the ability is
    }
}
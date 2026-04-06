class BattleScene extends Scene{
    constructor(){
        super()

        console.log("Scene: ", this)

        //Players
        let playerSquare = this.instantiate(new PlayerCharacterSquareGameObject([new SpeedBuff(5, 10), new SpeedDebuff(5, 10), new BurnEffect(5, 1)]), new Vector2(400, 350))
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

        //this.instantiate(new ParticleSystemExampleGameObject(), new Vector2(500, 500))
        let ActionUIModule = this.instantiate(new GameObject("Action UI Parent Tool Tip"), new Vector2(750, 750))
        ActionUIModule.addComponent(new ManageActionUIToolTipComponent())

        let ActionUI1 = this.instantiate(new ActionUIGameObject(), new Vector2(0, 0))
        ActionUI1.transform.setParent(ActionUIModule.transform)

        let ActionUI1Name = this.instantiate(new GameObject(""),new Vector2(-35, 0))
        ActionUI1Name.addComponent(new TextLabel())
        ActionUI1Name.transform.setParent(ActionUIModule.transform)
    }
}
class MainScene extends Scene{
    constructor(){
        super()
        this.instantiate(new BatSymbolGameObject(), new Vector2(300, 300))
        this.instantiate(new BatSymbolGameObject(), new Vector2(100, 50))
    }
}
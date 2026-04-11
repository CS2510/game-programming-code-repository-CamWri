class TurnIndicatorUIGameObject extends GameObject{
    constructor(){
        super("Turn Indicator Game Object", {layer: "UI"})
        this.addComponent(new Polygon(), {points: [new Vector2(10, 0), new Vector2(-10, 0), new Vector2(0, 10)]})
    }
}
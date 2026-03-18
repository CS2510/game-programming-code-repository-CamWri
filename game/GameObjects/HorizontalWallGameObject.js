class HorizontalWallGameObject extends GameObject{
    constructor(){
        super()

        this.addComponent(new Polygon(), { points: [new Vector2(-800, -2), new Vector2(800, -2), new Vector2(800, 2), new Vector2(-800, 2)]})
        this.addComponent(new Collider())
    }
}
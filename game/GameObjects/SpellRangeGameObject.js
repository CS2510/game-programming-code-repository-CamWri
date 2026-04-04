class SpellRangeGameObject extends GameObject{
    constructor(range){
        super("Spell Range Game Object")

        this.addComponent(new Polygon(), {
            points: Polygon.generateCircle(64), 
            fillStyle: "transparent",
            strokeStyle: "black",
            lineWidth: 5
        })
        this.addComponent(new Collider(), {isTrigger: true})

        this.transform.scale = new Vector2(range, range)
    }
}
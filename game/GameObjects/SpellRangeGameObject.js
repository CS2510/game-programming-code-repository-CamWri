class SpellRangeGameObject extends GameObject{
    constructor(range){
        super("Spell Range Game Object")

        this.addComponent(new Polygon(), {
            points: Polygon.generateCircle(64), 
            fillStyle: "transparent",
            strokeStyle: "black",
            lineWidth: 5
        })

        this.addComponent(new SpellRangeIndicatorComponent(), {spellRange: new Vector2(range, range)})
    }
}
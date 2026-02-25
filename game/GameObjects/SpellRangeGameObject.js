class SpellRangeGameObject extends GameObject{
    constructor(range){
        super("Spell Range Game Object")

        this.addComponent(new Polygon(), {
            points: [
                new Vector2(Math.cos(0), Math.sin(0)),
                new Vector2(Math.cos(Math.PI/8), Math.sin(Math.PI/8)),
                new Vector2(Math.cos(Math.PI/4), Math.sin(Math.PI/4)),
                new Vector2(Math.cos(3*Math.PI/8), Math.sin(3*Math.PI/8)),
                new Vector2(Math.cos(Math.PI/2), Math.sin(Math.PI/2)),
                new Vector2(Math.cos(5*Math.PI/8), Math.sin(5*Math.PI/8)),
                new Vector2(Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4)),
                new Vector2(Math.cos(7*Math.PI/8), Math.sin(7*Math.PI/8)),
                new Vector2(Math.cos(Math.PI), Math.sin(Math.PI)),
                new Vector2(Math.cos(9*Math.PI/8), Math.sin(9*Math.PI/8)),
                new Vector2(Math.cos(5*Math.PI/4), Math.sin(5*Math.PI/4)),
                new Vector2(Math.cos(11*Math.PI/8), Math.sin(11*Math.PI/8)),
                new Vector2(Math.cos(3*Math.PI/2), Math.sin(3*Math.PI/2)),
                new Vector2(Math.cos(13*Math.PI/8), Math.sin(13*Math.PI/8)),
                new Vector2(Math.cos(7*Math.PI/4), Math.sin(7*Math.PI/4)),
                new Vector2(Math.cos(15*Math.PI/8), Math.sin(15*Math.PI/8)),
                new Vector2(Math.cos(2*Math.PI), Math.sin(2*Math.PI)),
            ], 
            fillStyle: "transparent",
            strokeStyle: "black",
            lineWidth: 5
        })

        this.addComponent(new SpellRangeIndicatorComponent(), {spellRange: new Vector2(range, range)})
    }
}
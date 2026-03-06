class WhirlwindGameObject extends GameObject{
    constructor(){
        super("Whirlwind Game Object")
        this.addComponent(new Polygon(), {
            points: Polygon.generateCircle(64), 
            fillStyle: "grey",
            strokeStyle: "black"
        })

        this.addComponent(new ExpansionComponent(), {targetScale: new Vector2(100, 100), duration: 1.5})

        this.addComponent(new Collider(), {isTrigger: true})

        this.addComponent(new DamagingComponent(), {reference: WhirlwindActionComponent})
    }
}
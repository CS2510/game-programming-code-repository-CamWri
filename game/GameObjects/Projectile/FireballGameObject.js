class FireballGameObject extends GameObject{
    constructor(){
        super("Fire Ball Game Object")
        this.addComponent(new Polygon(), {
            points: Polygon.generateCircle(64), 
            fillStyle: "red",
            strokeStyle: "orange"
        })

        this.addComponent(new ExpansionComponent(), {targetScale: new Vector2(200, 200), duration: 1.5})
        this.addComponent(new CompletedComponent())

        this.addComponent(new Collider(), {isTrigger: true})

        this.addComponent(new DamagingComponent(), {reference: FireballActionComponent})
    }
}
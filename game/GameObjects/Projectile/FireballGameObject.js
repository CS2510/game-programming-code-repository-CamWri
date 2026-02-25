class FireballGameObject extends GameObject{
    constructor(){
        super()
        this.addComponent(new Polygon(), {
            points: [
                new Vector2(25, 0),
                new Vector2(20, 15),
                new Vector2(15, 20),
                new Vector2(0, 25), 
                new Vector2(-15, 20), 
                new Vector2(-20, 15), 
                new Vector2(-25, 0), 
                new Vector2(-20, -15), 
                new Vector2(-15, -20), 
                new Vector2(0, -25), 
                new Vector2(15, -20), 
                new Vector2(20, -15), 
            ], 
            fillStyle: "red",
            strokeStyle: "orange"
        })

        this.addComponent(new ExpansionComponent(), {scaleRate: 4, duration: 1.5})
        this.addComponent(new CompletedComponent())
    }
}
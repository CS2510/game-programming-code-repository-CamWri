class WhirlwindGameObject extends GameObject{
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
            fillStyle: "grey",
            strokeStyle: "black"
        })

        this.addComponent(new ExpansionComponent(), {scaleRate: 3.5, duration: 1.5})
    }
}
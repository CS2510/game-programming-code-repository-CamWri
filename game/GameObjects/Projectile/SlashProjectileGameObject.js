class SlashProjectileGameObject extends GameObject {
    constructor() {
        super()

        this.addComponent(new Polygon(), {
            points: [
                new Vector2(-25, 0),
                new Vector2(-22.5, 10),
                new Vector2(-20, 15),
                new Vector2(-15, 20),
                new Vector2(-10, 22.5),
                new Vector2(-5, 24.25),

                new Vector2(0, 25),

                new Vector2(5, 24.25),
                new Vector2(10, 22.5),
                new Vector2(15, 20),
                new Vector2(20, 15),
                new Vector2(22.5, 10),

                new Vector2(25, 0),

                new Vector2(20, 6.25),
                new Vector2(15, 8.75),
                new Vector2(10, 11.25),
                new Vector2(5, 13.125),

                new Vector2(0, 13.75),

                new Vector2(-5, 13.125),
                new Vector2(-10, 11.25),
                new Vector2(-15, 8.75),
                new Vector2(-20, 6.25)
            ]
        })
    }
}
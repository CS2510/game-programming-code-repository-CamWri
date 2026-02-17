class FireballProjectileGameObject extends GameObject {
    constructor(player, targetEnemy) {
        super("Fireball Game Object")

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
        this.addComponent(new ProjectileComponent(), {sourceTransform: player.transform.position,  targetTransform: targetEnemy.transform.position, speed: 750})
        this.addComponent(new FireballObjectComponent())
        //Add a new fireball component that when it collides with the target enemy, it expands for acouple seconds 
    }
} 
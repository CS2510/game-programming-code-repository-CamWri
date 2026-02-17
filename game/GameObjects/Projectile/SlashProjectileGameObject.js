class SlashProjectileGameObject extends GameObject {
    constructor(player, targetEnemy) {
        super("Slash Projectile Game Object")

        this.addComponent(new Polygon(), {
            points: [
                new Vector2(0, 15), 
                new Vector2(-15, -15), 
                new Vector2(15, -15), 
            ]
        })
        this.addComponent(new ProjectileComponent(), {sourceTransform: player.transform.position,  targetTransform: targetEnemy.transform.position, speed: 1000})
    }
}
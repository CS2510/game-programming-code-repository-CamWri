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

        this.addComponent(new Collider(), {isTrigger: true})

        this.addComponent(new DamagingComponent(), {reference: SlashActionComponent})

        this.addComponent(new ProjectileComponent(), {source: player,  target: targetEnemy, speed: 1000})
    }
}
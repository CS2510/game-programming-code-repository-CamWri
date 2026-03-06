class PummelGameObject extends GameObject{
    constructor(player, targetEnemy){
        super("Pummel Game Object")

        this.addComponent(new Polygon(), {
            points: [
                new Vector2(10, 10),
                new Vector2(-10, 10),
                new Vector2(-10, -10),
                new Vector2(10, -10),
            ], 
            fillStyle: "brown",
            strokeStyle: "orange"
        })

        this.addComponent(new Collider(), {isTrigger: true})

        this.addComponent(new DamagingComponent(), {reference: PummelActionComponent})

        this.addComponent(new ProjectileComponent(), {source: player,  target: targetEnemy, speed: 200})

    }
}
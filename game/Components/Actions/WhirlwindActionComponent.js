class WhirlwindActionComponent extends AutoTargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 1
    static maxTargets = 1
    static range = 25

    constructor(){
        super()
    }

    start(){
        this.targets = [this.gameObject]

        // @ts-ignore
        instantiate(new SpellRangeGameObject(this.constructor.range), this.gameObject.transform.position.clone())
    }

    update() {
        super.update()

        if(!this.firedProjectiles && Input.keysDownThisFrame.includes("Enter")){
            this.firedProjectiles = true
            let whirlwindProjectile = instantiate(new WhirlwindGameObject(), new Vector2(this.transform.position.x, this.transform.position.y))
            this.actionProjectiles.push(whirlwindProjectile)
        }
    }
}
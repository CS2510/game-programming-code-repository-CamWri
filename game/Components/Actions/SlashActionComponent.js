class SlashActionComponent extends AutoTargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 1
    static maxTargets = 2
    static range = 750

    constructor(){
        super()
    }

    start(){
        this.targets = Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject)
        super.start()
    }

    update() {
        super.update()

        if(!this.firedProjectiles){
            if(Input.keysDownThisFrame.includes("Enter") && this.currentTargets.length != 0){
                this.firedProjectiles = true
                for(let enemy of this.currentTargets){
                    let slashProjectile = instantiate(new SlashProjectileGameObject(this.gameObject, enemy), this.transform.position.clone())
                    this.actionProjectiles.push(slashProjectile)
                }
            }
        }
    }
}
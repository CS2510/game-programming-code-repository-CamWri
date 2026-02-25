class SlashActionComponent extends TargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 1
    static maxTargets = 2
    static range = 500

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
            if(Input.keysDownThisFrame.includes("Enter")){
                this.firedProjectiles = true
                for(let enemy of this.currentTargets){
                    let slashProjectile = instantiate(new SlashProjectileGameObject(this.gameObject, enemy), new Vector2(this.transform.position.x, this.transform.position.y))
                    this.actionProjectiles.push(slashProjectile)
                }
            }
        }
    }
}
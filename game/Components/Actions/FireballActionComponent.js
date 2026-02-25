class FireballActionComponent extends TargetAOEActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 3
    static maxTargets = 1
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
                    let slashProjectile = instantiate(new FireballGameObject(), enemy.transform.position.clone())
                    this.actionProjectiles.push(slashProjectile)
                }
            }
        }
    }
}
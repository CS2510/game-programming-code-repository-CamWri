class FireballActionComponent extends TargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 3
    static maxTargets = 1
    
    fireballAOEEnd = false

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
                    let slashProjectile = instantiate(new FireballProjectileGameObject(this.gameObject, enemy), new Vector2(this.transform.position.x, this.transform.position.y))
                    this.actionProjectiles.push(slashProjectile)
                }
            }
        }
    }

    isExecutionComplete(){
        return this.fireballAOEEnd
    }
}
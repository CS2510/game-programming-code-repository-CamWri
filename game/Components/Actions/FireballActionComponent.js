class FireballActionComponent extends TargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 3
    static maxTargets = 1
    
    fireballAOEEnd = false

    constructor(){
        super()
    }

    start(){
        let enemies = Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject)
        super.start(enemies)
    }

    update() {
        super.update()

        if(!this.firedProjectiles){
            if(Input.keysDown.includes("Enter")){
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
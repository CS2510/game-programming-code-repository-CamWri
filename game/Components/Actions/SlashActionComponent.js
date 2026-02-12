class SlashActionComponent extends TargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 2
    static maxTargets = 2

    slashProjectials = []

    firedProjectiles = false

    constructor(){
        super()
    }

    start(){
        super.start(Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject))
    }

    update() {
        this.slashProjectials = this.slashProjectials.filter(proj => !proj.markForDestroy)

        if(!this.firedProjectiles){
            if (Input.keysDown.includes("ArrowRight")) this.changeSelectedEnemy(1)
            if (Input.keysDown.includes("ArrowLeft")) this.changeSelectedEnemy(-1)

            if(Input.keysDown.includes("Space")) {
                if (this.currentTargets.includes(this.currentSelectedTargets)){
                    this.deselectEnemy()
                }

                if(!this.currentTargets.includes(this.currentSelectedTargets) && SlashActionComponent.maxTargets > this.currentTargets.length){
                    this.selectEnemy()
                }
            }

            if(Input.keysDown.includes("Enter")){
                this.firedProjectiles = true
                for(let enemy of this.currentTargets){
                    let slashProjectile = Engine.currentScene.instantiate(new SlashProjectileGameObject(this.gameObject, enemy), new Vector2(this.transform.position.x, this.transform.position.y))
                    this.slashProjectials.push(slashProjectile)
                }
            }
        }
        if (this.slashProjectials.length == 0 && this.firedProjectiles){
            this.endExecution()
        }
    }

    changeSelectedEnemy(direction) {
        super.changeSelectedEnemy(direction)
    }

    selectEnemy(){
        super.selectEnemy()
    }

    deselectEnemy() {
        super.deselectEnemy()
    }

    endExecution(){
        super.endExecution(this.constructor)
    }
}
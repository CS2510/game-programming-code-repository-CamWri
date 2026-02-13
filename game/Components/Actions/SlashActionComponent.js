class SlashActionComponent extends TargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 2
    static maxTargets = 1

    slashProjectials = []

    firedProjectiles = false

    constructor(){
        super()
    }

    start(){
        let enemies = Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject)
        super.start(enemies)
    }

    update() {
        this.slashProjectials = this.slashProjectials.filter(proj => !proj.markForDestroy)

        if(!this.firedProjectiles){
            if (Input.keysDown.includes("ArrowRight")) this.changeSelectedEnemy(1)
            if (Input.keysDown.includes("ArrowLeft")) this.changeSelectedEnemy(-1)

            if(Input.keysDown.includes("Space")) {
                if (this.currentTargets.includes(this.currentSelectedTarget)){
                    this.deselectEnemy()
                }

                if(!this.currentTargets.includes(this.currentSelectedTarget) && SlashActionComponent.maxTargets > this.currentTargets.length){
                    this.selectEnemy()
                }
            }

            if(Input.keysDown.includes("Enter")){
                this.firedProjectiles = true
                for(let enemy of this.currentTargets){
                    let slashProjectile = instantiate(new SlashProjectileGameObject(this.gameObject, enemy), new Vector2(this.transform.position.x, this.transform.position.y))
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
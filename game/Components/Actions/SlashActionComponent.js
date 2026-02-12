class SlashActionComponent extends ActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 2
    static maxTargets = 2

    characterStats = {}
    
    player

    enemySelectorIndex = 0

    slashProjectials = []

    firedProjectiles = false

    constructor(){
        super()
    }

    //Maybe have it so where backspace/delete removes the latest one being added instead of clicking space on an already selected one
    //You would need to add and remove it from currentTargets, I would have to make it where its a list of this.enimes but I exlciude anything from this.currentTargets

    start(){
        this.enemies = Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject)
        this.currentTargets = []

        this.currentSelectedEnemy = this.enemies[this.enemySelectorIndex]

        this.changeSelectedEnemy(0)
    }

    update() {
        this.slashProjectials = this.slashProjectials.filter(proj => !proj.markForDestroy)

        if(!this.firedProjectiles){
            if (Input.keysDown.includes("ArrowRight")) this.changeSelectedEnemy(1)
            if (Input.keysDown.includes("ArrowLeft")) this.changeSelectedEnemy(-1)

            if(Input.keysDown.includes("Space")) {
                if (this.currentTargets.includes(this.currentSelectedEnemy)){
                    this.deselectEnemy()
                }

                if(!this.currentTargets.includes(this.currentSelectedEnemy) && SlashActionComponent.maxTargets > this.currentTargets.length){
                    this.selectEnemy()
                }
            }

            if(Input.keysDown.includes("Enter")){
                this.firedProjectiles = true
                for(let enemy of this.currentTargets){
                    let slashProjectile = Engine.currentScene.instantiate(new SlashProjectileGameObject(this.gameObject, enemy), new Vector2(this.player.transform.position.x, this.player.transform.position.y))
                    this.slashProjectials.push(slashProjectile)
                }
            }
        }
        if (this.slashProjectials.length == 0 && this.firedProjectiles){
            this.endExecution()
        }
    }

    changeSelectedEnemy(direction) {
        let polygon = this.currentSelectedEnemy.getComponent(Polygon)
        if (polygon && polygon.strokeStyle != "blue") polygon.strokeStyle = "red"

        this.enemySelectorIndex = (this.enemySelectorIndex + direction) % this.enemies.length

        this.currentSelectedEnemy = this.enemies[this.enemySelectorIndex]

        let newPolygon = this.currentSelectedEnemy.getComponent(Polygon)
        if (newPolygon && newPolygon.strokeStyle != "blue") newPolygon.strokeStyle = "yellow"
    }

    selectEnemy(){
        let polygon = this.currentSelectedEnemy.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedEnemy)
    }

    deselectEnemy() {
        this.currentTargets = this.currentTargets.filter(
            enemy => enemy !== this.currentSelectedEnemy
        )

        let polygon = this.currentSelectedEnemy.getComponent(Polygon)
        if (polygon) polygon.strokeStyle = "yellow"
    }

    endExecution(){
        for (let enemy of this.enemies){
            enemy.getComponent(Polygon).strokeStyle = "red"
        }

        this.gameObject.components.find(a => a instanceof CharacterComponent).activeAbility = null
        this.gameObject.components = this.gameObject.components.filter(a => !(a instanceof this.constructor))
    }
}
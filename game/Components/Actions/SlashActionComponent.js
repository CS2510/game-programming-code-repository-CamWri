class SlashActionComponent extends ActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 2
    static maxTargets = 2

    characterStats = {}
    
    player

    enemySelectorIndex = 0

    constructor(){
        super()
    }

    start(){
        this.enemies = Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject)
        this.currentTargets = []

        this.currentSelectedEnemy = this.enemies[this.enemySelectorIndex]

        this.changeEnemy(0)
    }

    update() {
        if (Input.keysDown.includes("ArrowRight")) this.changeEnemy(1)
        if (Input.keysDown.includes("ArrowLeft")) this.changeEnemy(-1)

        if(Input.keysDown.includes("Space")) {
            if (this.currentTargets.includes(this.currentSelectedEnemy)){
                this.deselectEnemy()
            }

            if(!this.currentTargets.includes(this.currentSelectedEnemy) && SlashActionComponent.maxTargets > this.currentTargets.length){
                this.selectEnemy()
            }
        }

        if(Input.keysDown.includes("Enter")){
            for(let enemy of this.currentTargets){
                Engine.currentScene.instantiate(new SlashProjectileGameObject(), new Vector2(this.player.transform.position.x, this.player.transform.position.y))
            }
        }
    }

    changeEnemy(direction) {
        let polygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (polygon && polygon.strokeStyle != "blue") polygon.strokeStyle = "red"

        this.enemySelectorIndex = (this.enemySelectorIndex + direction) % this.enemies.length

        this.currentSelectedEnemy = this.enemies[this.enemySelectorIndex]

        let newPolygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (newPolygon && newPolygon.strokeStyle != "blue") newPolygon.strokeStyle = "yellow"
    }

    selectEnemy(){
        let polygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedEnemy)
    }

    deselectEnemy() {
        this.currentTargets = this.currentTargets.filter(
            enemy => enemy !== this.currentSelectedEnemy
        )

        let polygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (polygon) polygon.strokeStyle = "yellow"
    }
}
class SlashActionComponent extends ActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 2
    static maxTargets

    characterStats = {}
    
    player

    enemySelectorIndex = 0

    //Stroke Styles to persist, so I need to make sure I have a reference to how it was before I hovered on it
    //If I press space over a already selected enemy, it should be deselected
        //If I do this, I need to update current targets to remove it and it should be the base color again
        //I may have to have a static color reference in each Enemy Game Object to make it easy to keep track of what enemy has what color

    constructor(){
        super()
        console.log("Instantiate Slash Action Component")
    }

    start(){
        //Get the list of all the enemies
        this.enemies = Engine.currentScene.gameObjects.filter(a => a instanceof EnemyCharacterGameObject)
        this.currentTargets = []

        this.currentSelectedEnemy = this.enemies[this.enemySelectorIndex]

        this.changeEnemy(0)
    }

    update() {
        if (Input.keysDown.includes("ArrowRight")) this.changeEnemy(1)
        if (Input.keysDown.includes("ArrowLeft")) this.changeEnemy(-1)

        if(Input.keysDown.includes("Space")) {
            if(this.currentTargets.length == SlashActionComponent.maxTargets){
                Engine.currentScene.instantiate(new SlashProjectileGameObject(), new Vector2(this.player.transform.position.x, this.player.transform.position.y))
            } else if (!this.currentTargets.includes(this.currentSelectedEnemy)){
                this.selectEnemy()
            }
        }
    }

    changeEnemy(direction) {
        let polygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (polygon) polygon.strokeStyle = "red"

        this.enemySelectorIndex = (this.enemySelectorIndex + direction) % this.enemies.length

        // Set new current enemy
        this.currentSelectedEnemy = this.enemies[this.enemySelectorIndex]

        // Highlight new enemy
        let newPolygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (newPolygon && newPolygon.strokeStyle != "blue") newPolygon.strokeStyle = "yellow"
    }

    selectEnemy(){
        let polygon = this.currentSelectedEnemy.components.find(a => a instanceof Polygon)
        if (polygon) polygon.strokeStyle = "blue"

        this.currentTargets.push(this.currentSelectedEnemy)
    }
}
class PummelActionComponent extends AutoTargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 1
    static maxTargets = 1
    static range = 100
    static damage = 15

    constructor(){
        super()
    }

    start(){
        this.canSelectEnemyCharacters = true
        super.start()
    }

    update() {
        super.update()

        if(!this.firedProjectiles){
            if(Input.keysDownThisFrame.includes("Enter") && this.currentTargets.length != 0){
                this.firedProjectiles = true
                for(let enemy of this.currentTargets){
                    let pummelProjectile = instantiate(new PummelGameObject(this.gameObject, enemy), new Vector2(this.transform.position.x, this.transform.position.y))
                    this.actionProjectiles.push(pummelProjectile)
                }
            }
        }
    }
}
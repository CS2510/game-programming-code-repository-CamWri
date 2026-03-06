class FireballActionComponent extends ClickTargetActionComponent{
    static requiredStats = ["DamageMult"]
    static maxCooldown = 3
    static maxTargets = 1
    static range = 500
    static damage = 5
    
    constructor(){
        super()
    }

    start(){
        super.start()
    }

    update() {
        super.update()

        if(!this.spawnedAOE){
            if(Input.mouseButtonsDownThisFrame.includes(0) && Math.abs(this.transform.position.minus(Input.mousePosition).magnitude) < FireballActionComponent.range){
                this.spawnedAOE = true
                let fireball = instantiate(new FireballGameObject(), Input.mousePosition.clone())
                this.actionAOE = fireball
            }
        }
    }
}
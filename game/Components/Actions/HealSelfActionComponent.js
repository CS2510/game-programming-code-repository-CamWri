class HealSelfActionComponent extends AutoTargetActionComponent{
    static requiredStats = []
    static maxCooldown = 3
    static maxTargets = 1
    static range = 0
    static healingAmount = 7

    constructor(){
        super()
    }

    start(){
        this.onlySelectSelf = true
        super.start()
    }

    update() {
        super.update()

        if(!this.firedProjectiles && Input.keysDownThisFrame.includes("Enter")){
            this.firedProjectiles = true

            let characterComponent = this.gameObject.getComponent(CharacterComponent)
            
            characterComponent.applyHeal(HealSelfActionComponent.healingAmount)
        }
    }
}
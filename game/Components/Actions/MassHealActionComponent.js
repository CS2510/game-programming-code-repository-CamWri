class MassHealActionComponent extends AutoTargetActionComponent{
    static requiredStats = []
    static maxCooldown = 5
    static maxTargets = 5
    static range = 600
    static healingAmount = 5

    constructor(){
        super()
    }

    start(){
        this.canSelectPlayerCharacters = true
        super.start()
    }

    update() {
        super.update()

        if(!this.firedProjectiles && Input.keysDownThisFrame.includes("Enter")){
            this.firedProjectiles = true

            for(let player of this.currentTargets){
                let characterComponent = player.getComponent(CharacterComponent)

                characterComponent.applyHeal(MassHealActionComponent.healingAmount)
            }
        }
    }
}
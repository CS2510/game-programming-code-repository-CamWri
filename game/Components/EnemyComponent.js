class EnemyComponent extends CharacterComponent{    
    
    abilityHeatMap
    
    // n opponents
    // 2n or C(n, k) where k is the highest amount of targetsany action can take
    // m actions

    //Create 2d array, C(n, k) x n
    // Have two seperate lists where one is actions and one is total targets

    constructor(){
        super()
    }

    start(){
        super.start()
    }

    update(){
        
    }

    calculateActionScore(AbilityAction, Target){

    }

    onMouseOver(){
        let playerCharacter = GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue(`${playerCharacter.transform.position.minus(this.transform.position).magnitude.toFixed(2)}`)
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue(`${this.stats["CurrentHealth"]}/${this.stats["MaxHealth"]}`)
    }

    onMouseExit(){
        GameObject.find("Range Text Game Object").getComponent(StartText).setValue("")
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue("")
    }

    onTriggerEnter(other){
        if(other[0] instanceof SpellRangeGameObject){
            console.log("Collision With Spell")
            Events.handleEvent("Enemy Can Be Targeted", [this.gameObject])
        }

        let damageCompoennt = other[0].getComponent(DamagingComponent)
        if(damageCompoennt)
            this.gameObject.getComponent(CharacterComponent).applyDamage(damageCompoennt.getDamage())
    }
}
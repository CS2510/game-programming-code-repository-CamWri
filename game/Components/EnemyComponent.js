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
        this.outlineColor = "red"
        super.start()
    }

    update(){
        
    }

    calculateActionScore(AbilityAction, Target){

    }

    onTriggerEnter(other){
        if(other[0] instanceof SpellRangeGameObject){
            Events.handleEvent("Enemy Can Be Targeted", [this.gameObject])
        }

        let damageCompoennt = other[0].getComponent(DamagingComponent)
        if(damageCompoennt)
            this.gameObject.getComponent(CharacterComponent).applyDamage(damageCompoennt.getDamage())
    }
}
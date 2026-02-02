class EnemyCharacterGameObject extends GameObject{
    constructor(customStats = {}){
        super()
        
        this.addComponent(new StatsComponent(customStats))
    }
}
class TurnManagerGameObject extends GameObject{
    constructor(characterGameObjects, enemyGameObjects ,turnIndicatior){
        super("Turn Manager Game Object")
        this.addComponent(new TurnManagerComponent(characterGameObjects, enemyGameObjects, turnIndicatior))
    }
}
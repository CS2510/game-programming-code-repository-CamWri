class TurnManagerGameObject extends GameObject{
    constructor(characterGameObjects, enemyGameObjects ,turnIndicatior){
        super()
        this.addComponent(new TurnManagerComponent(characterGameObjects, enemyGameObjects, turnIndicatior))
    }
}
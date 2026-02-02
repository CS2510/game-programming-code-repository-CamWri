class TurnBasedManagerGameObject extends GameObject{
    constructor(characterGameObjects, enemyGameObjects ,selectorGameObject){
        super()
        this.addComponent(new TurnBaseManagerComponent(characterGameObjects, enemyGameObjects, selectorGameObject))
    }
}
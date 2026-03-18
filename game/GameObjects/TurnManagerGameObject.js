class TurnManagerGameObject extends GameObject{
    constructor(characterGameObjects, enemyGameObjects ,turnIndicatiorUI, turnIndicatiorCharacter){
        super("Turn Manager Game Object")
        this.addComponent(new TurnManagerComponent(characterGameObjects, enemyGameObjects, turnIndicatiorUI, turnIndicatiorCharacter))
    }
}
class FireballObjectComponent extends Component{
    constructor(){
        super()
    }

    onDestroy(){
        GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter.getComponent(CharacterComponent).activeAbility = null
        instantiate(new FireballAOEGameObject(), this.transform.position.clone())
    }
}
class ActionUIScene extends Scene{
    constructor(){
        super()

        let ActionUI1 = this.instantiate(new ActionUIGameObject(), new Vector2(200, 750))

        let ActionUI1Name = this.instantiate(new GameObject("Health Text Game Object"),new Vector2(200, 775))
        ActionUI1Name.addComponent(new TextLabel())
        ActionUI1Name.transform.setParent(ActionUI1.transform)

        
    }
}
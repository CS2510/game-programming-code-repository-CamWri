class ActionUIScene extends Scene{
    constructor(){
        super()

        let ActionUI1 = this.instantiate(new ActionUIGameObject(), new Vector2(0, 0))

        let ActionUI1Name = this.instantiate(new GameObject("Health Text Game Object", {layer: "UI"}),new Vector2(0, 0))
        ActionUI1Name.addComponent(new TextLabel())
        ActionUI1Name.transform.setParent(ActionUI1.transform)

        
    }
}
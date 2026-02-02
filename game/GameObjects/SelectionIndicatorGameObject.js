class SelectionIndicatorGameObject extends GameObject{
    constructor(){
        super()
        this.addComponent(new SelectorIndicatorComponent())
    }
}
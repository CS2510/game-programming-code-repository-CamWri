class CompletedComponent extends Component{
    constructor(){
        super()
    }

    onDestroy(){
        GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter.getComponent(ClickTargetActionComponent).AOEEnd = true
    }
}
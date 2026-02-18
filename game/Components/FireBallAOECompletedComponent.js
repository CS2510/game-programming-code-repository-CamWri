class FireBallAOECompletedComponent extends Component{
    constructor(){
        super()
    }

    onDestroy(){
        GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter.getComponent(FireballActionComponent).fireballAOEEnd = true
    }
}
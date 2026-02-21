class FireBallAOECompletedComponent extends Component{
    constructor(){
        super()
    }

    update(){
        if(Input.mousePosition){
            console.log(Collisions.isCollision(Input.mousePosition, this.gameObject))
        }
    }

    onDestroy(){
        GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter.getComponent(FireballActionComponent).fireballAOEEnd = true
    }
}
class TurnOrderManagerComponent extends Component{
    player
    
    constructor(){
        super()
    }

    start(){

    }

    onMouseOver(){
        let playerCharacter = GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter
        let stats = this.player.getComponent(CharacterComponent).stats

        this.player.getComponent(Polygon).fillStyle = "DeepSkyBlue"

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue(`${playerCharacter.transform.position.minus(this.player.transform.position).magnitude.toFixed(2)}`)
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue(`${stats["CurrentHealth"]}/${stats["MaxHealth"]}`)
    }

    onMouseExit(){
        this.player.getComponent(Polygon).fillStyle = "black"

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue("")
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue("")
    }
}
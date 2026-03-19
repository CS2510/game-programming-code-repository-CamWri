class TurnOrderManagerComponent extends Component{
    player
    
    constructor(){
        super()
    }

    start(){
        this.player.getComponent(Polygon).fillStyle = this.player instanceof PlayerCharacterGameObject ? "green" : "red";
        this.gameObject.getComponent(Polygon).strokeStyle = this.player instanceof PlayerCharacterGameObject ? "green" : "red";
    }

    onMouseOver(){
        let playerCharacter = GameObject.find("Turn Manager Game Object").getComponent(TurnManagerComponent).currentCharacter
        let stats = this.player.getComponent(CharacterComponent)

        this.player.getComponent(Polygon).fillStyle = "purple"

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue(`${playerCharacter.transform.position.minus(this.player.transform.position).magnitude.toFixed(2)}`)
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue(`${stats.derivedStats["CurrentHealth"]}/${stats.getStat("MaxHealth")}`)
    }

    onMouseExit(){
        this.player.getComponent(Polygon).fillStyle = this.player instanceof PlayerCharacterGameObject ? "green" : "red";

        GameObject.find("Range Text Game Object").getComponent(StartText).setValue("")
        GameObject.find("Health Text Game Object").getComponent(StartText).setValue("")
    }
}
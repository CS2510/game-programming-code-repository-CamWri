class ManageCharacterUIToolTipComponent extends Component{
    constructor(){
        super()
    }

    updateToolTipPosition(newPosition){
        this.transform.position = newPosition
    }

    updateDisplayedStats(character){
        let stats = character.getComponent(CharacterComponent)

        GameObject.find("Health Text Game Object").getComponent(StartText).setValue(`${stats.derivedStats["CurrentHealth"]}/${stats.getStat("MaxHealth")}`)

        let statusEffectString = ""

        statusEffectString = "\n    " + stats.statusEffects.map(e => e.name).join("\n    ")

        GameObject.find("Status Effects Text Game Object").getComponent(StartText).setValue(statusEffectString)
    }
}

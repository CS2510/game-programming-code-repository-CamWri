class ToolTipCharacterScene extends Scene{
    constructor(){
        super()

        let toolTipParent = this.instantiate(new GameObject("Parent Tool Tip", {layer: Globals.CharacterToolTipLayer}), new Vector2(200, 200))
        toolTipParent.addComponent(new ManageCharacterUIToolTipComponent())

        let toolTip = this.instantiate(new ToolTipGameObject(new Vector2(100, 100), Globals.CharacterToolTipLayer), new Vector2(0, 0))
        toolTip.transform.setParent(toolTipParent.transform)

        let healthText = this.instantiate(new GameObject("Health Text Game Object", {layer: Globals.CharacterToolTipLayer}),new Vector2(-90, -75))
        healthText.addComponent(new TextLabel())
        healthText.addComponent(new StartText(), {label: "Health"})
        healthText.transform.setParent(toolTipParent.transform)


        let statusEffectsText = this.instantiate(new GameObject("Status Effects Text Game Object", {layer: Globals.CharacterToolTipLayer}),new Vector2(-90, -30))
        statusEffectsText.addComponent(new TextLabel())
        statusEffectsText.addComponent(new StartText(), {label: "Status Effects"})
        statusEffectsText.transform.setParent(toolTipParent.transform)
    }
}
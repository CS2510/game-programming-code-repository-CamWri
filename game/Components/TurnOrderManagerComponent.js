class TurnOrderManagerComponent extends Component {
    player

    constructor() {
        super()
    }

    start() {
        this.player.getComponent(Polygon).fillStyle = this.player instanceof PlayerCharacterGameObject ? "green" : "red";
        this.gameObject.getComponent(Polygon).strokeStyle = this.player instanceof PlayerCharacterGameObject ? "green" : "red";
    }

    onPointerEnter() {
        Globals.CharacterToolTipLayer = "UI"
        SceneManager.loadScene(ToolTipCharacterScene, true)
        GameObject.find("Parent Tool Tip")?.getComponent(ManageCharacterUIToolTipComponent).updateToolTipPosition(this.transform.position.add(new Vector2(-100, 100)))
        GameObject.find("Parent Tool Tip")?.getComponent(ManageCharacterUIToolTipComponent).updateDisplayedStats(this.player)


        this.player.getComponent(Polygon).fillStyle = "purple"
    }

    onPointerExit() {
        for (let gameObject of SceneManager.getActiveScene().gameObjects) {
            if (gameObject.scene.constructor.name == "ToolTipCharacterScene") {
                gameObject.destroy()
            }
        }

        this.player.getComponent(Polygon).fillStyle = this.player instanceof PlayerCharacterGameObject ? "green" : "red";
    }
}
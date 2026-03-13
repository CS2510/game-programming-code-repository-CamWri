class TurnOrderIndexGameObject extends GameObject{
    constructor(player){
        super()

        this.addComponent(new Polygon(), {
            points: [new Vector2(40, 50), new Vector2(-40, 50), new Vector2(-40, -50), new Vector2(40, -50)],
            fillStyle: "transparent",
            strokeStyle: "black",
            lineWidth: 5
        })

        this.addComponent(new TurnOrderManagerComponent(), {player: player})

        this.addComponent(new Collider(), {isTrigger: true})
    }
}
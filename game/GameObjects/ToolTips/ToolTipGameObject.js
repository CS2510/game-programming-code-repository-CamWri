class ToolTipGameObject extends GameObject{
    constructor(scale, layer = "default"){
        super("ToolTipGameObject", {layer: layer})

        this.addComponent(new Polygon(), {
            points: [new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(1, 1), new Vector2(1, -1)], 
            fillStyle: "rgb(0, 0, 0, 0.1)",
            strokeStyle: "rgb(0, 0, 0, 0.75)",
            lineWidth: 1, 
        })

        this.transform.scale = scale
    }
}
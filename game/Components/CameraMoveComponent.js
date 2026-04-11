class CameraMoveComponent extends Component {
    constructor() {
        super()
    }

    start() {
        this.entities = GameObject.findGameObjectByTag("entity");

        let center = new Vector2(0, 0)

        for (let entity of this.entities) {
            center = center.add(entity.transform.position)
        }

        this.transform.position = new Vector2(center.x/this.entities.length, center.y/this.entities.length)
    }

    update(){
        let center = new Vector2(0, 0)

        for (let entity of this.entities) {
            center = center.add(entity.transform.position)
        }

        this.transform.position = new Vector2(center.x/this.entities.length, center.y/this.entities.length)
    }
}
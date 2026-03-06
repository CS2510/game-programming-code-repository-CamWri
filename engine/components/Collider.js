class Collider extends Component{
    colliderPoints = []
    
    isTrigger = false

    constructor(){
        super()
    }

    get points(){
        if(this.colliderPoints.length == 0)
            return this.gameObject.getComponent(Polygon).points
        else
            return this.colliderPoints
    }
}
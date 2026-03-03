class ProjectileComponent extends Component{
    //I don't know if I want to have it be a trasnform or the actual game object
    sourceTransform
    targetTransform
    speed = 30
    direction

    constructor(){
        super()
    }

    start(){
        // Direction = (target - source).normalized
        const direction = this.targetTransform.minus(this.sourceTransform)

        this.direction = {
            x: direction.x / direction.magnitude,
            y: direction.y / direction.magnitude
        }
    }

    update(){
        this.transform.position.x += this.direction.x * this.speed * Time.deltaTime
        this.transform.position.y += this.direction.y * this.speed * Time.deltaTime

        if(this.transform.position.minus(this.targetTransform).magnitude < 5){
            this.gameObject.destroy()
        }
    }
}
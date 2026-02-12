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
        const dx = this.targetTransform.x - this.sourceTransform.x
        const dy = this.targetTransform.y - this.sourceTransform.y

        const length = Math.hypot(dx, dy)
        this.direction = {
            x: dx / length,
            y: dy / length
        }
    }

    update(){
        this.transform.position.x += this.direction.x * this.speed * Time.deltaTime
        this.transform.position.y += this.direction.y * this.speed * Time.deltaTime

        if(Math.hypot(this.transform.position.x - this.targetTransform.x, this.transform.position.y - this.targetTransform.y) < 5){
            this.gameObject.destroy()
        }
    }
}
class ProjectileComponent extends Component{
    //I don't know if I want to have it be a trasnform or the actual game object
    source
    target
    speed = 30
    direction

    constructor(){
        super()
    }

    start(){
        // Direction = (target - source).normalized
        this.direction = this.target.transform.position.minus(this.source.transform.position).normalized()
    }

    update(){
        this.transform.position.x += this.direction.x * this.speed * Time.deltaTime
        this.transform.position.y += this.direction.y * this.speed * Time.deltaTime
    }

    onTriggerEnter(other){
        if(other[0] == this.target){
            this.gameObject.destroy()
        }
    }
}
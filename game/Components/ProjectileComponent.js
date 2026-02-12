class ProjectileComponent extends Component{
    //I don't know if I want to have it be a trasnform or the actual game object
    sourceTransform
    targetTransform
    speed

    constructor(){
        super()
    }

    start(){
        //calculate the angle between target and position
        //use sin and cosine to determine the scale between x and y
    }

    update(){
        //update the current position by doing:
            //transform.position.x += Time.deltaTime * cos(angle) * speed
            //transform.position.y += Time.deltaTime * sin(angle) * speed
    }
}
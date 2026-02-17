class ExpansionComponent extends Component{
    scaleRate
    duration

    time = 0
    
    constructor(){
        super()
    }

    update(){
        this.time += Time.deltaTime

        if(this.time < this.duration){
            this.transform.scale.x *= this.scaleRate
            this.transform.scale.y *= this.scaleRate
        } else {
            this.gameObject.destroy()
        }
    }
}
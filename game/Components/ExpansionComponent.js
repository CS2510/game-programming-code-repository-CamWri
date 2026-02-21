class ExpansionComponent extends Component {
    scaleRate
    duration

    time = 0
    
    constructor(){
        super()
    }

    update(){
        this.time += Time.deltaTime
        const factor = Math.pow(this.scaleRate, Time.deltaTime);

        if(this.time < this.duration){
            this.transform.scale.x *= factor;
            this.transform.scale.y *= factor;
        } else {
            this.gameObject.destroy()
        }
    }
}
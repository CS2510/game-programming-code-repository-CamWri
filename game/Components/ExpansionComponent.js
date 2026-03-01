class ExpansionComponent extends Component {
    startScale = new Vector2(1, 1)
    targetScale = new Vector2(2, 2)
    duration = 1

    time = 0
    
    constructor(){
        super()
    }

    update(){
        this.time += Time.deltaTime

        let t = Math.min(this.time / this.duration, 1)

        // linear interpolation for x and y scales
        this.transform.scale.x = this.startScale.x + (this.targetScale.x - this.startScale.x) * t
        this.transform.scale.y = this.startScale.y + (this.targetScale.y - this.startScale.y) * t

        // destroy the object after the duration
        if(this.time >= this.duration){
            this.gameObject.destroy()
        }
    }
}
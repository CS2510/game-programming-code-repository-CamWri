class Camera extends Component{
    constructor(){
        super()
    }

    static get main(){
        return GameObject.find("Camera")
    }
}
class FireballObjectComponent extends Component{
    constructor(){
        super()
    }

    onDestroy(){
        instantiate(new FireballAOEGameObject(), this.transform.position.clone())
    }
}
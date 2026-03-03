class CompletedComponent extends Component{
    constructor(){
        super()
    }

    onDestroy(){
        Events.handleEvent("AOE End", [])
    }
}
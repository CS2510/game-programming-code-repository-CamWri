class Component{
    gameObject
    markForDestroy = false

    get transform(){
        return this.gameObject.transform
    }

    start(){
        
    }

    destroy(){
        this.markForDestroy = true
    }
}
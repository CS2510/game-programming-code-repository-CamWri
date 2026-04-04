class GameObject{
    static nextID = 0

    components = []
    hasStarted = false
    markForDestroy = false
    name
    physicsStatic = false
    id

    constructor(name){
        this.addComponent(new Transform())
        this.name = name
        this.id = GameObject.nextID
        GameObject.nextID++
    }

    addComponent(component, options){
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this

        if(this.hasStarted){
            component.start?.()
        }

        return component
    }

    //Only tells the parents
    sendMessage(message, args = []){
        for(const compoenent of this.components){
            compoenent[message]?.(...args)
        }
    }

    //Tell the children game Objects and parent 
    broadCastMessage(message, args = []){
        for(const compoenent of this.components){
            compoenent[message]?.(...args)
        }

        for(const child of SceneManager.getActiveScene().gameObjects.filter(go => go.transform.parent == this)){
            child.broadCastMessage(message, args)
        }
    }

    start() {
        this.sendMessage("start")
    }

    update(){
        if (!this.hasStarted) {
            this.hasStarted = true
            this.start()
        }

        this.sendMessage("update")
    }

    draw(ctx){
        ctx.save()

        ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()))

        this.sendMessage("draw", [ctx])

        ctx.restore()
    }

    destroy(){
        this.markForDestroy = true
        
        for (let component of this.components){
            component.destroy()
        }
    }

    getComponent(type){
        return this.components.find(c => c instanceof type)
    }

    get transform(){
        return this.components[0]
    }

    static find(name){
        return SceneManager.getActiveScene().gameObjects.find(go => go.name == name)
    }
}
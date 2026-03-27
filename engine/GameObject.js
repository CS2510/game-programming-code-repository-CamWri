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

    broadCastMessage(message, args = []){
        for(const compoenent of this.components){
            compoenent[message]?.(...args)
        }
    }

    start() {
        this.broadCastMessage("start")
    }

    update(){
        if (!this.hasStarted) {
            this.hasStarted = true
            this.start()
        }

        this.broadCastMessage("update")
    }

    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
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
        return Engine.currentScene.gameObjects.find(go => go.name == name)
    }
}
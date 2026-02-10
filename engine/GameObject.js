class GameObject{
    components = []
    hasStarted = false

    constructor(){
        this.addComponent(new Transform())
    }

    addComponent(component, options){
        Object.assign(component, options)
        this.components.push(component)
        component.gameObject = this

        if (this.hasStarted) {
            component.start?.()
        }

        return component
    }

    start() {
        for (const component of this.components) {
            component.start()
        }
    }1

    update(){
        if (!this.hasStarted) {
            this.hasStarted = true
            this.start()
        }

        for(const component of this.components){
            component.update?.()
        }
    }

    draw(ctx){
        for(const component of this.components){
            component.draw?.(ctx)
        }
    }

    get transform(){
        return this.components[0]
    }
}
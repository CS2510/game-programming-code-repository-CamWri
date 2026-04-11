class Scene {
    gameObjects = []

    lastFrameMouseCollisions = []
    //Added Point Collisions
    lastFramePointCollisions = []
    lastFrameCollisions = []
    previousMouseDowns = []
    //Added for previousPointDowns
    previousPointDowns = []

    constructor(isAddative = false){
        if(typeof Camera != "undefined" && !isAddative){
            const camera = this.instantiate(new GameObject("Camera"), new Vector2(0, 0))
            camera.addComponent(new Camera())
        }
    }

    instantiate(gameObject, position = new Vector2(0, 0)) {
        gameObject.scene = this
        this.gameObjects.push(gameObject)
        gameObject.components[0].position = position

        return gameObject
    }

    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
            gameObject.hasStarted = true
        }
    }

    update() {
        for (const gameObject of this.gameObjects) {
            gameObject.sendMessage("fixedUpdate", [])
        }

        let thisFrameMouseCollisions = []
        //Added an extra variable for MousePointers
        let thisFrameMousePointers = []
        let collidables = this.gameObjects.filter(go => go.getComponent(Collider))
        let rigidBodies = this.gameObjects.filter(go => go.getComponent(RigidBody))

        if (Input.mousePosition) {
            const matrix = new DOMMatrix()
            matrix.translateSelf(Engine.canvas.width / 2, Engine.canvas.height / 2)
            matrix.multiplySelf(Camera.main.transform.getWorldMatrix().inverse())
            const mouse = Vector2.fromDOMPoint(matrix.inverse().transformPoint(Input.mousePosition.toDOMPoint()))

            for (const collidable of collidables) {
                if (Collisions.isCollisionPointGameObject(Input.mousePosition, collidable))
                    thisFrameMouseCollisions.push(collidable)
            }

            //Added a second for loop for Mouse Pointer Collisions In UI
            for (const gameObject of this.gameObjects.filter(go => go.layer == "UI")){
                if (Collisions.isCollisionPointGameObject(Input.mousePosition, gameObject))
                    thisFrameMousePointers.push(gameObject)
            }
        }

        //Mouse Collisions in the Game
        for (const collidable of thisFrameMouseCollisions) {
            if (this.lastFrameMouseCollisions.includes(collidable))
                collidable.sendMessage("onMouseOver")
            else
                collidable.sendMessage("onMouseEnter")
        }
        for (const collidable of this.lastFrameMouseCollisions) {
            if (!thisFrameMouseCollisions.includes(collidable)) {
                collidable.sendMessage("onMouseExit")
                this.previousMouseDowns = this.previousMouseDowns.filter(go => go != collidable)
            }
        }

        if (Input.mouseButtonsDownThisFrame.includes(0)) {
            for (const collidable of thisFrameMouseCollisions) {
                collidable.sendMessage("onMouseDown")
                if (!this.previousMouseDowns.includes(collidable)) {
                    this.previousMouseDowns.push(collidable)
                }
            }
        }

        if (Input.mouseButtonsUpThisFrame.includes(0)) {
            for (const collidable of thisFrameMouseCollisions) {
                collidable.sendMessage("onMouseUp")
                if (this.previousMouseDowns.includes(collidable)) {
                    collidable.sendMessage("onMouseUpAsButton")
                }
            }
            this.previousMouseDowns = []
        }

        if (Input.mouseButtonsDown.includes(0) && Input.mousePositionDelta?.magnitude != 0) {
            // @ts-ignore
            const union = [...new Set([...thisFrameMouseCollisions, ...this.lastFrameMouseCollisions])]
            for (const collidable of union) {
                collidable.sendMessage("onMouseDrag")
                if (this.lastFrameMouseCollisions.includes(collidable)
                    && !thisFrameMouseCollisions.includes(collidable)) {
                    thisFrameMouseCollisions.push(collidable)
                }
            }
        }

        //Mouse Pointers for collisions with UI
        for (const collidable of thisFrameMousePointers) {
            if (this.lastFramePointCollisions.includes(collidable))
                collidable.sendMessage("onPointerOver")
            else
                collidable.sendMessage("onPointerEnter")
        }
        for (const collidable of this.lastFramePointCollisions) {
            if (!thisFrameMousePointers.includes(collidable)) {
                collidable.sendMessage("onPointerExit")
                this.previousPointDowns = this.previousPointDowns.filter(go => go != collidable)
            }
        }

        if (Input.mouseButtonsDownThisFrame.includes(0)) {
            for (const collidable of thisFrameMousePointers) {
                collidable.sendMessage("onPointerDown")
                if (!this.previousPointDowns.includes(collidable)) {
                    this.previousPointDowns.push(collidable)
                }
            }
        }

        if (Input.mouseButtonsUpThisFrame.includes(0)) {
            for (const collidable of thisFrameMousePointers) {
                collidable.sendMessage("onPointerUp")
                if (this.previousPointDowns.includes(collidable)) {
                    collidable.sendMessage("onPointerUpAsButton")
                }
            }
            this.previousPointDowns = []
        }


        this.lastFrameMouseCollisions = thisFrameMouseCollisions
        this.lastFramePointCollisions = thisFrameMousePointers
        const activeCollisions = []
        const rigidbodyCollisions = []

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                const one = collidables[i]
                const two = collidables[j]
                if (!one.getComponent(RigidBody) && !two.getComponent(RigidBody))
                    continue
                const result = Collisions.isCollisionGameObjectGameObject(one, two)
                if (!result)
                    continue
                const collision = one.id < two.id ? { one: one, two: two, result: result } : { one: two, two: one, result: result.times(-1) }
                activeCollisions.push(collision)
            }
        }

        for (const collision of activeCollisions) {
            let type = "onTrigger"
            if (!collision.one.getComponent(Collider)?.isTrigger && !collision.two.getComponent(Collider)?.isTrigger)
                type = "onCollision"
            if (this.lastFrameCollisions.some(pair => pair.one == collision.one && pair.two == collision.two)) {
                collision.one.sendMessage(type + "Stay", [collision.two, collision.result])
                collision.two.sendMessage(type + "Stay", [collision.one, collision.result.times(-1)])
            }
            else {
                collision.one.sendMessage(type + "Enter", [collision.two, collision.result])
                collision.two.sendMessage(type + "Enter", [collision.one, collision.result.times(-1)])
            }
            if (type == "onCollision") {
                rigidbodyCollisions.push(collision)
            }
        }

        for (const collision of this.lastFrameCollisions) {
            let type = "onTrigger"
            if (!collision.one.getComponent(Collider)?.isTrigger && !collision.two.getComponent(Collider)?.isTrigger)
                type = "onCollision"
            if (!activeCollisions.some(pair => pair.one == collision.one && pair.two == collision.two)) {
                collision.one.sendMessage(type + "Exit", [collision.two, collision.result])
                collision.two.sendMessage(type + "Exit", [collision.one, collision.result.times(-1)])
            }
        }

        for (const rigidBody of rigidBodies) {
            const rbCollisions = rigidbodyCollisions.filter(col => col.one == rigidBody || col.two == rigidBody)
            rbCollisions.sort((a, b) => b.result.magnitude - a.result.magnitude)
            for (const collision of rbCollisions) {
                const result = Collisions.isCollisionGameObjectGameObject(collision.one, collision.two)
                if (!result) break
                if (collision.one.getComponent(RigidBody)) {
                    collision.one.transform.position = collision.one.transform.position.add(collision.result.times(1))
                }
                else {
                    collision.two.transform.position = collision.two.transform.position.add(collision.result.times(-1))
                }
            }
        }

        this.lastFrameCollisions = activeCollisions

        for (const gameObject of this.gameObjects) {
            if (!gameObject.hasStarted) {
                gameObject.start()
                gameObject.hasStarted = true
            }

            gameObject.update()
        }

        for (const gameObject of this.gameObjects) {
            gameObject.components.filter(comp => comp.markForDestroy).forEach(comp => comp.onDestroy?.())

            gameObject.components = gameObject.components.filter(comp => !comp.markForDestroy)
        }

        this.gameObjects.filter(go => go.markForDestroy).forEach(go => go.broadCastMessage("onDestroy"))

        this.gameObjects = this.gameObjects.filter(go => !go.markForDestroy)
    }

    draw(ctx) {
        ctx.save()

        ctx.translate(Engine.canvas.width/2, Engine.canvas.height/2)

        ctx.setTransform(ctx.getTransform().multiply(Camera.main.transform.getWorldMatrix().inverse()))

        for(const layer of Engine.layers.filter(l => l != "UI")){   
            for (const gameObject of this.gameObjects.filter(go => go.layer == layer)) {
                gameObject.draw(ctx)
            }
        }

        ctx.restore()

        for(const gameObject of this.gameObjects.filter(go => go.layer == "UI")){
            gameObject.draw(ctx)
        }
    }
}

function instantiate(gameObject, position) {
    return SceneManager.getActiveScene().instantiate(gameObject, position)
}
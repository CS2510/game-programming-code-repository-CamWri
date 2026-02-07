class Scene{
    gameObjects = []

    instantiate(gameObject, position){
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

    update(){
        for(const gameObject of this.gameObjects){
            if (!gameObject.hasStarted) {
                gameObject.start()
                gameObject.hasStarted = true
            }

            gameObject.update()
        }
    }

    draw(ctx){
        for(const gameObject of this.gameObjects){
            gameObject.draw(ctx)
        }
    }
}
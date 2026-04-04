class Engine {
    static canvas 
    static ctx 

    static lastTimeStamp

    static start() {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight

        addEventListener("keydown", Input.keyDown)
        addEventListener("keyup", Input.keyUp)

        addEventListener("mousedown", Input.mouseDown)
        addEventListener("mouseup", Input.mouseUp)
        
        addEventListener("mousemove", Input.mouseMove)

        addEventListener("contextmemu", e=>e.preventDefault())

        SceneManager.getActiveScene().start()
        Engine.gameLoop()
    }

    static gameLoop(time){
        if(Engine.lastTimeStamp){
            const diff = time - Engine.lastTimeStamp
            const diffInSeconds = diff/1000
            Time.deltaTime = diffInSeconds
            Engine.lastTimeStamp = time
        } else {
            Engine.lastTimeStamp = time
        }
        Engine.update()
        Engine.draw()
        Input.update()
        Time.update()
        SceneManager.update()
        requestAnimationFrame(Engine.gameLoop)
    }

    static update(){
        SceneManager.getActiveScene().update()
    }

    static draw(){        
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight
            
        SceneManager.getActiveScene().draw(Engine.ctx)
    }
}
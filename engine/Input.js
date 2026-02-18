class Input{
    static keysDown = []
    static keysDownThisFrame = []

    static mousePosition

    static keyDown(event) {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    static keyUp(event){
        Input.keysDown = Input.keysDown.filter(k => k != event.code)
    }

    static mouseMove(event){
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    static update() {
        Input.keysDownThisFrame = []
    }
}
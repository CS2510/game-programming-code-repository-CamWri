class Input{
    static keysDown = []
    static keysDownThisFrame = []
    static keysUpThisFrame = []

    static mousePosition
    static mousePositionLastFrame
    static mousePositionDelta

    static mouseButtonsDown = []
    static mouseButtonsDownThisFrame = []
    static mouseButtonsUpThisFrame = []

    static keyDown(event) {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    static keyUp(event){
        Input.keysDown = Input.keysDown.filter(k => k != event.code)
        Input.keysUpThisFrame.push(event.code)
    }

    static mouseMove(event){
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
    }

    static mouseDown(event){
        if (!Input.mouseButtonsDown.includes(event.button)) {
            Input.mouseButtonsDown.push(event.button)
            Input.mouseButtonsDownThisFrame.push(event.button)
        }
    }

    static mouseUp(event){
        Input.mouseButtonsDown = Input.mouseButtonsDown.filter(k => k != event.button)
        Input.mouseButtonsUpThisFrame.push(event.button)
    }

    static update() {
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []

        Input.mouseButtonsDownThisFrame = []
        Input.mouseButtonsUpThisFrame = []

        if(Input.mousePosition && Input.mousePositionLastFrame){
            Input.mousePositionDelta = Input.mousePosition.minus(Input.mousePositionLastFrame)
        }

        if(Input.mousePosition){
            Input.mousePositionLastFrame = Input.mousePosition.clone()
        }
    }
}
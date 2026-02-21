class Vector2 {
    x
    y
    
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static right = new Vector2(1, 0)
    static left = new Vector2(-1, 0)

    static top = new Vector2(0, -1)
    static bottom = new Vector2(0, 1)

    add(other){
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    minus(other){
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    orthogonal(){
        return new Vector2(-this.y, this.x)
    }

    dot(other){
        return this.x * other.x + this.y * other.y
    }

    get magnitude(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    normalized(){
        let magnitude = this.magnitude
        if(magnitude == 0) return new Vector2(0, 0)

        return new Vector2(this.x/magnitude, this.y/magnitude)
    }

    elementWiseMultiplication(other){
        return new Vector2(this.x * other.x, this.y * other.y)
    }

    clone(){
        return new Vector2(this.x, this.y)
    }
}
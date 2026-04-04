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

    plusEquals(other){
        this.x += other.x
        this.y += other.y
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

    times(scalar){
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    elementWiseMultiplication(other){
        return new Vector2(this.x * other.x, this.y * other.y)
    }

    clone(){
        return new Vector2(this.x, this.y)
    }

    toDOMPoint(){
        return new DOMPoint(this.x, this.y)
    }

    static fromDOMPoint(domPoint){
        return new Vector2(domPoint.x, domPoint.y)
    }
}
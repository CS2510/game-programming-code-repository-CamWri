class Collisions{
    static isOverlapPointVertices(point, vertices){
        return point >= Math.min(...vertices) && point <= Math.max(...vertices)
    }

    static isOverlapPointVerticesDirection(point, vertices, direction){
        const pointProjection = point.dot(direction)
        const vertexProjections = []

        for(const vertex of vertices){
            vertexProjections.push(vertex.dot(direction))
        }

        return Collisions.isOverlapPointVertices(pointProjection, vertexProjections)
    }

    static isOverlap(point, vertices){
        for(let i = 0; vertices.length; i++){
            const one = vertices[i]
            const two = vertices[(i + 1) % vertices.length]

            const direction = one.minus(two).normalized().orthogonal()

            const result = Collisions.isOverlapPointVerticesDirection(point, vertices, direction)
            if(!result) return false
        }

        return true
    }

    static isCollision(point, gameObject){
        const polygon = gameObject.getComponent(Polygon)
        const transformedPoints = []
        for(const point of polygon.points){
            transformedPoints.push(point.add(gameObject.transform.position))
        }

        return Collisions.isOverlap(point, transformedPoints)
    }
}